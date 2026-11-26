import {
    useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore,
    type DragEvent, type PointerEvent, type RefObject,
} from "react";

const query = "(pointer: fine)";

const MIN_ZOOM = 100;
const MAX_ZOOM = 300;
const STEP = 10;
const MM_TO_PX = 96 / 25.4;
const PDF_WIDTH_PX = 210 * MM_TO_PX;

type Point = { x: number; y: number };
type Anchor = Point & { rx: number; ry: number };

function subscribe(callback: () => void) {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
}

const getSnapshot = () => window.matchMedia(query).matches;

function getPinch([a, b]: TouchList) {
    return {
        distance: Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY),
        x: (a.clientX + b.clientX) / 2,
        y: (a.clientY + b.clientY) / 2,
    };
}

export function usePanZoom(pdfRef: RefObject<HTMLDivElement | null>) {
    const limiterRef = useRef<HTMLDivElement>(null);
    const [zoom, setZoom] = useState(100);
    const [containerWidth, setContainerWidth] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [pdfHeight, setPdfHeight] = useState(297 * MM_TO_PX);
    const [panMode, setPanMode] = useState(true);
    const drag = useRef<{ x: number; y: number; left: number } | null>(null);
    const zoomRef = useRef(100);
    const anchor = useRef<Anchor | null>(null);
    const hasMouse = useSyncExternalStore(subscribe, getSnapshot, () => true);

    const fitScale = containerWidth > 0
        ? Math.min(1, containerWidth / PDF_WIDTH_PX)
        : 1;
    const scale = fitScale * (zoom / 100);

    const applyZoom = useCallback((value: number, from?: Point, to = from) => {
        const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
        if (next === zoomRef.current) return;

        const rect = limiterRef.current?.firstElementChild?.getBoundingClientRect();
        anchor.current = rect && from && to
            ? {
                rx: (from.x - rect.left) / rect.width,
                ry: (from.y - rect.top) / rect.height,
                x: to.x,
                y: to.y,
            }
            : null;

        zoomRef.current = next;
        setZoom(next);
    }, []);

    useLayoutEffect(() => {
        const limiter = limiterRef.current;
        const point = anchor.current;
        const rect = limiter?.firstElementChild?.getBoundingClientRect();
        if (!limiter || !point || !rect) return;

        limiter.scrollLeft += rect.left + point.rx * rect.width - point.x;
        window.scrollBy(0, rect.top + point.ry * rect.height - point.y);
        anchor.current = null;
    }, [zoom]);

    useEffect(() => {
        const limiter = limiterRef.current;
        if (!limiter) return;
        let last: ReturnType<typeof getPinch> | null = null;

        const onWheel = (e: WheelEvent) => {
            if (!e.ctrlKey) return;
            e.preventDefault();
            const delta = Math.max(-10, Math.min(10, e.deltaY));
            applyZoom(zoomRef.current * Math.exp(-delta * 0.01), { x: e.clientX, y: e.clientY });
        };

        const onTouchStart = (e: TouchEvent) => {
            last = e.touches.length === 2 ? getPinch(e.touches) : null;
        };

        const onTouchMove = (e: TouchEvent) => {
            if (!last || e.touches.length !== 2) return;
            if (e.cancelable) e.preventDefault();
            const current = getPinch(e.touches);
            applyZoom(zoomRef.current * (current.distance / last.distance), last, current);
            last = current;
        };

        const onTouchEnd = () => {
            last = null;
        };

        limiter.addEventListener("wheel", onWheel, { passive: false });
        limiter.addEventListener("touchstart", onTouchStart, { passive: true });
        limiter.addEventListener("touchmove", onTouchMove, { passive: false });
        limiter.addEventListener("touchend", onTouchEnd);
        limiter.addEventListener("touchcancel", onTouchEnd);

        return () => {
            limiter.removeEventListener("wheel", onWheel);
            limiter.removeEventListener("touchstart", onTouchStart);
            limiter.removeEventListener("touchmove", onTouchMove);
            limiter.removeEventListener("touchend", onTouchEnd);
            limiter.removeEventListener("touchcancel", onTouchEnd);
        };
    }, [applyZoom]);

    useEffect(() => {
        const pdf = pdfRef.current;
        const limiter = limiterRef.current;
        if (!pdf || !limiter) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.target === limiter) setContainerWidth(entry.contentRect.width);
                else setPdfHeight(pdf.offsetHeight);
            }
        });
        observer.observe(pdf);
        observer.observe(limiter);
        return () => observer.disconnect();
    }, [pdfRef]);

    const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
        if (!panMode || e.pointerType !== "mouse" || e.button !== 0) return;
        drag.current = { x: e.clientX, y: e.clientY, left: e.currentTarget.scrollLeft };
        e.currentTarget.setPointerCapture(e.pointerId);
        setDragging(true);
    };

    const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
        if (!drag.current) return;
        e.currentTarget.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
        window.scrollBy(0, drag.current.y - e.clientY);
        drag.current.y = e.clientY;
    };

    const endDrag = (e: PointerEvent<HTMLDivElement>) => {
        if (!drag.current) return;
        drag.current = null;
        e.currentTarget.releasePointerCapture(e.pointerId);
        setDragging(false);
    };

    const togglePanMode = () => {
        drag.current = null;
        setDragging(false);
        setPanMode((v) => !v);
    };

    return {
        zoom: Math.round(zoom), panMode, dragging, pdfRef, limiterRef, hasMouse,
        disabledZoomIn: zoom >= MAX_ZOOM,
        disabledZoomOut: zoom <= MIN_ZOOM,
        sizerStyle: { width: PDF_WIDTH_PX * scale, height: pdfHeight * scale },
        pdfStyle: { transform: `scale(${scale})` },
        resetZoom: () => applyZoom(100),
        zoomIn: () => applyZoom(zoomRef.current + STEP),
        zoomOut: () => applyZoom(zoomRef.current - STEP),
        togglePanMode,
        limiterHandlers: {
            onPointerDown,
            onPointerMove,
            onPointerUp: endDrag,
            onPointerCancel: endDrag,
            onDragStart: (e: DragEvent) => panMode && e.preventDefault(),
        },
    };
}