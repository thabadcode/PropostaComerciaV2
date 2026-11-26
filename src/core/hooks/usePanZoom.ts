import {
    useEffect,
    useRef,
    useState,
    useSyncExternalStore,
    type DragEvent,
    type PointerEvent,
    type RefObject,
} from "react";

const query = "(pointer: fine)";

const MIN_ZOOM = 50;
const MAX_ZOOM = 200;
const STEP = 10;
const MM_TO_PX = 96 / 25.4;
const PDF_WIDTH_PX = 210 * MM_TO_PX;

function subscribe(callback: () => void) {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
}

const getSnapshot = () => window.matchMedia(query).matches;

export function usePanZoom(pdfRef: RefObject<HTMLDivElement | null>) {
    const limiterRef = useRef<HTMLDivElement>(null);
    const [zoom, setZoom] = useState(100);
    const [containerWidth, setContainerWidth] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [pdfHeight, setPdfHeight] = useState(297 * MM_TO_PX);
    const [panMode, setPanMode] = useState(true);
    const drag = useRef<{ x: number; y: number; left: number } | null>(null);
    const hasMouse = useSyncExternalStore(subscribe, getSnapshot, () => true);

    const fitScale = containerWidth > 0
        ? Math.min(1, containerWidth / PDF_WIDTH_PX)
        : 1;
    const scale = fitScale * (zoom / 100);

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
        zoom, panMode, dragging, pdfRef, limiterRef, hasMouse,
        disabledZoomIn: zoom >= MAX_ZOOM,
        disabledZoomOut: zoom <= MIN_ZOOM,
        sizerStyle: { width: PDF_WIDTH_PX * scale, height: pdfHeight * scale },
        pdfStyle: { transform: `scale(${scale})` },
        resetZoom: () => setZoom(100),
        zoomIn: () => setZoom((v) => Math.min(MAX_ZOOM, v + STEP)),
        zoomOut: () => setZoom((v) => Math.max(MIN_ZOOM, v - STEP)),
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