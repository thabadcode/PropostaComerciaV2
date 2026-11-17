import Button from '../button/Button';
import Checkbox from '../checkbox/Checkbox';
import Input from '../input/Input';
import Select from '../select/Select';
import style from './ProductForm.module.css';
import { PackagePlus, Plus } from 'lucide-react';
import { PRODUCT_SUGGESTIONS } from '../../core/constants/productSuggestions';

interface ProductFormProps {
    description: string;
    onDescriptionChange: (value: string) => void;
    isDescriptionValid: boolean;

    freightType: string;
    onFreightTypeChange: (value: string) => void;
    isFreightTypeValid: boolean;

    isClientCap: boolean;
    onClientCapChange: (value: boolean) => void;

    asphaltBinderContent: string;
    onAsphaltBinderContentChange: (value: string) => void;
    disabledAsphaltBinderContent: boolean;
    isAsphaltBinderContent: boolean;

    unit: string;
    onUnitChange: (value: string) => void;
    isUnitValid: boolean;

    amount: string;
    onAmountChange: (value: string) => void;
    isAmountValid: boolean;

    price: string;
    onPriceChange: (value: string) => void;
    isPriceValid: boolean;

    onAddClick: () => void;
}

export default function ProductForm({
    description,
    onDescriptionChange,
    isDescriptionValid,

    freightType,
    onFreightTypeChange,
    isFreightTypeValid,

    isClientCap,
    onClientCapChange,

    asphaltBinderContent,
    onAsphaltBinderContentChange,
    disabledAsphaltBinderContent,
    isAsphaltBinderContent,

    unit,
    onUnitChange,
    isUnitValid,

    amount,
    onAmountChange,
    isAmountValid,

    price,
    onPriceChange,
    isPriceValid,

    onAddClick
}: ProductFormProps) {
    return (
        <div className={style.Form}>
            <h2>
                <PackagePlus/>
                Dados produto/serviço
            </h2>

            <Input
                label="Descrição"
                type="text"
                value={description}
                list={"product-suggestions"}
                onChange={(e) => onDescriptionChange(e.target.value)}
                isValid={isDescriptionValid}
                supportingText="Campo obrigatório"
            />
            <datalist id="product-suggestions">
                {PRODUCT_SUGGESTIONS.map((o) => (
                    <option key={o} value={o}/>
                ))}
            </datalist>

            <div className={style.RowInputs}>
                <Select
                    label="Tipo de frete"
                    options={["FOB", "CIF"]}
                    value={freightType}
                    onSelected={(e) => onFreightTypeChange(e.target.value)}
                    isValid={isFreightTypeValid}
                    supportingText="Selecione uma opção"
                />

                <Checkbox
                    label="Cap do cliente"
                    checked={isClientCap}
                    onCheck={(e) => onClientCapChange(e.target.checked)}
                />

                <Input
                    label="Teor de CAP (%)"
                    type="number"
                    value={asphaltBinderContent}
                    onChange={(e) => onAsphaltBinderContentChange(e.target.value)}
                    disabled={disabledAsphaltBinderContent}
                    isValid={isAsphaltBinderContent}
                    supportingText="Informe um valor entre 4,0 e 9,0"
                />
            </div>

            <div className={style.RowInputs}>
                <Select
                    label="Unidade"
                    options={["Ton", "Un"]}
                    value={unit}
                    onSelected={(e) => onUnitChange(e.target.value)}
                    isValid={isUnitValid}
                    supportingText="Selecione uma opção"
                />

                <Input
                    label="Quantidade"
                    type="number"
                    value={amount}
                    onChange={(e) => onAmountChange(e.target.value)}
                    isValid={isAmountValid}
                    supportingText="Valor maior que 0"
                />

                <Input
                    label="Valor unitário"
                    type="number"
                    value={price}
                    onChange={(e) => onPriceChange(e.target.value)}
                    isValid={isPriceValid}
                    supportingText="Valor maior que 0"
                />
            </div>

            <Button
                icon={Plus}
                text="Adicionar produto/serviço"
                onClick={onAddClick}
            />
        </div>
    );
}