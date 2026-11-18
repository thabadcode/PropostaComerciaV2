import type { ProductsState } from '../../core/hooks/useProducts';
import type { ElementType } from 'react';
import style from './Table.module.css';
import { ChevronDown, ChevronUp, Sheet, SquarePen, Trash } from 'lucide-react';

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

interface TableProps {
    products: ProductsState;
    onMoveUp: (index: number) => void;
    onMoveDown: (index: number) => void;
    onEdit: (index: number) => void;
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
            <tr key={index}>
                <td>
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
                        onClick={() => onEdit(index)}
                    />

                    <ActionButton
                        icon={Trash}
                        label="Excluir"
                        onClick={() => onDelete(index)}
                    />
                </td>
                <td>{p.description}</td>
                <td>{p.unit}</td>
                <td>{p.quantity}</td>
                <td className={style.RightAlign}>{brl.format(p.price)}</td>
                <td className={style.RightAlign}>{brl.format(p.quantity * p.price)}</td>
            </tr>
        ));
    };

    return(
        <div id="products-table" className={style.CardTable}>
            <h2><Sheet/>Tabela de produtos/serviços</h2>
            <hr className={style.Divider}/>
            
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
                        <td>{brl.format(getTotal())}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
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
            className={style.ActionButton}
        >
            <Icon size={20}/>
        </button>
    );
}