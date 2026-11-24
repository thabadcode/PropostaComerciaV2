import { Card } from '../Card/Card';
import type { ProductsState } from '../../../core/hooks/useProducts';
import type { ElementType } from 'react';
import style from './Table.module.css';
import { ChevronDown, ChevronUp, Sheet, SquarePen, Trash } from 'lucide-react';
import { formatter } from '../../../core/utils/formatter';
import type { Product } from '../../../core/utils/types';

interface TableProps {
    products: ProductsState;
    onMoveUp: (index: number) => void;
    onMoveDown: (index: number) => void;
    onEdit: (p: Product) => void;
    onDelete: (index: number) => void;
}

export function Table({
    products,
    onMoveUp,
    onMoveDown,
    onEdit,
    onDelete
}: TableProps) {
    const { products: items, getTotal } = products;
    const renderProducts = () => {
        const length = items.length;
        if (length === 0) return <tr><td colSpan={6}>Nenhum produto adicionado</td></tr>;
        return items.map((p, index) => (
            <tr key={p.id}>
                <td>
                    <div className={style.Actions}>
                        <ActionButton
                            icon={ChevronUp}
                            label="Mover para cima"
                            disabled={index === 0}
                            onClick={() => onMoveUp(index)}
                        />

                        <ActionButton
                            icon={ChevronDown}
                            label="Mover para baixo"
                            disabled={index === length - 1}
                            onClick={() => onMoveDown(index)}
                        />

                        <ActionButton
                            icon={SquarePen}
                            label="Editar"
                            onClick={() => onEdit(p)}
                        />

                        <ActionButton
                            icon={Trash}
                            label="Excluir"
                            onClick={() => onDelete(index)}
                        />
                    </div>
                </td>
                <td>{p.description}</td>
                <td>{p.unit}</td>
                <td>{p.quantity}</td>
                <td>{formatter.money(p.price)}</td>
                <td>{formatter.money(products.getSubtotal(p))}</td>
            </tr>
        ));
    };

    return(
        <Card id="products-table" icon={Sheet} title="Tabela de produtos/serviços">
            <table className={style.Table}>
                <thead>
                    <tr>
                        <th>Ações</th>
                        <th>Descrição</th>
                        <th>Unid.</th>
                        <th>Quant.</th>
                        <th>Valor unit.</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>

                <tbody>{renderProducts()}</tbody>

                <tfoot>
                    <tr>
                        <th colSpan={5}>Total</th>
                        <td>{formatter.money(getTotal())}</td>
                    </tr>
                </tfoot>
            </table>
        </Card>
    );
}

function ActionButton({
    icon: Icon,
    label,
    disabled,
    onClick
}: {
    icon: ElementType,
    label: string,
    disabled?: boolean,
    onClick: () => void
}) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            aria-label={label}
            className={disabled ? style.DisabledActionButton : style.ActionButton}
        >
            <Icon size={20}/>
        </button>
    );
}