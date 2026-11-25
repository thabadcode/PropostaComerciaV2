import { ArrowBigLeftDash, ArrowBigRightDash, ChevronLeft, ChevronRight, GalleryHorizontal, SquarePen, Trash } from 'lucide-react';
import type { ProductsState } from '../../core/hooks/useProducts';
import type { Product } from '../../core/utils/types';
import { Card } from '../ui/Card/Card';
import style from './ProductCard.module.css';
import { useLayoutEffect, useRef, useState } from 'react';
import { formatter } from '../../core/utils/formatter';

interface ProductCardProps {
    products: ProductsState;
    onMoveLeft: (index: number) => void;
    onMoveRight: (index: number) => void;
    onEdit: (p: Product) => void;
    onDelete: (index: number) => void;
}

export function Carousel({
    products,
    onMoveLeft,
    onMoveRight,
    onEdit,
    onDelete
}: ProductCardProps) {
    const [index, setIndex] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);
    const pendingIndex = useRef<number | null>(null);
    const length = products.products.length;
    const currentIndex = Math.max(0, Math.min(index, length - 1));

    const goTo = (i: number, behavior: ScrollBehavior = 'smooth') => {
        const track = trackRef.current;
        if (!track) return;
        track.scrollTo({ left: i * track.clientWidth, behavior });
    };

    const handleScroll = () => {
        const track = trackRef.current;
        if (!track || track.clientWidth === 0) return;
        setIndex(Math.round(track.scrollLeft / track.clientWidth));
    };

    useLayoutEffect(() => {
        if (pendingIndex.current === null) return;
        goTo(pendingIndex.current, 'instant');
        setIndex(pendingIndex.current);
        pendingIndex.current = null;
    }, [products.products]);

    return (
        <Card id="products-table" icon={GalleryHorizontal} title="Produtos/Serviços">
            {length === 0 ? (
                <span className={style.Pagination}>Nenhum produto/serviço adicionado</span>
            ) : (
                <>
                    <span className={style.Pagination}>Exibindo {currentIndex + 1} de {length}</span>
                    <div className={style.Carousel}>
                        <button
                            type="button"
                            aria-label="Item anterior"
                            onClick={() => goTo(currentIndex - 1)}
                            disabled={currentIndex === 0}
                            className={`${style.NavButton} ${style.Prev}`}
                        ><ChevronLeft/></button>

                        <div ref={trackRef} className={style.Track} onScroll={handleScroll}>
                            {products.products.map((p, i) => (
                                <div key={p.id} className={style.Slide}>
                                    <div className={style.ProductCard}>
                                        <h3 className={style.ProductDescription}>{products.getFormated(p)}</h3>
                                        <hr/>
                                        <div className={style.InfoList}>
                                            <p className={style.InfoItem}>
                                                <b className={style.InfoLabel}>Unidade:</b>
                                                {p.unit}
                                            </p>
                                            <hr/>
                                            <p className={style.InfoItem}>
                                                <b className={style.InfoLabel}>Quantidade:</b>
                                                {p.quantity}
                                            </p>
                                            <hr/>
                                            <p className={style.InfoItem}>
                                                <b className={style.InfoLabel}>Valor unitário:</b>
                                                {formatter.money(p.price)}
                                            </p>
                                            <hr/>
                                            <p className={style.InfoItem}>
                                                <b className={style.InfoLabel}>Subtotal:</b>
                                                {formatter.money(products.getSubtotal(p))}
                                            </p>
                                        </div>

                                        <div className={style.Actions}>
                                            <button
                                                type="button"
                                                aria-label="Mover para a esquerda"
                                                onClick={() => {
                                                    pendingIndex.current = i - 1;
                                                    onMoveLeft(i);
                                                }}
                                                disabled={i === 0}
                                                className={style.ActionButton}
                                            ><ArrowBigLeftDash/></button>
                                            <button
                                                type="button"
                                                aria-label="Mover para a direita"
                                                onClick={() => {
                                                    pendingIndex.current = i + 1;
                                                    onMoveRight(i);
                                                }}
                                                disabled={i === length - 1}
                                                className={style.ActionButton}
                                            ><ArrowBigRightDash/></button>
                                            <button
                                                type="button"
                                                aria-label="Editar"
                                                onClick={() => onEdit(p)}
                                                className={style.ActionButton}
                                            ><SquarePen/></button>
                                            <button
                                                type="button"
                                                aria-label="Excluir"
                                                onClick={() => onDelete(i)}
                                                className={style.ActionButton}
                                            ><Trash/></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            arial-label="Próximo item"
                            onClick={() => goTo(currentIndex + 1)}
                            disabled={currentIndex === length - 1}
                            className={`${style.NavButton} ${style.Next}`}
                        ><ChevronRight/></button>
                    </div>
                </>
            )}
        </Card>
    ); 
}