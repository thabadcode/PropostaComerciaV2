import { Card, FormRow } from '../ui/Card/Card';
import Button from '../ui/Button/Button';
import Checkbox from '../ui/Checkbox/Checkbox';
import Input from '../ui/Input/Input';
import Select from '../ui/Select/Select';
import { Edit, PackagePlus, Plus, X } from 'lucide-react';
import { FREIGHT_TYPES, PRODUCT_SUGGESTIONS, UNIT_OPTIONS } from '../../core/constants/formOptions';
import type { ProductFormState } from '../../core/hooks/useProductForm';
import style from './ProductForm.module.css';

export default function ProductForm(
    {form, onClick}: {form: ProductFormState, onClick: () => void}
) {
    return (
        <Card icon={PackagePlus} title="Dados produto/serviço">
            <Input
                label="Descrição"
                value={form.description.value}
                list={"product-suggestions"}
                onChange={(e) => form.description.setValue(e.target.value)}
                onBlur={form.description.onBlur}
                onFocus={form.description.onFocus}
                isValid={!form.description.showError}
                supportingText={form.description.errorMsg ?? ""}
            />
            <datalist id="product-suggestions">
                {PRODUCT_SUGGESTIONS.map((o) => (
                    <option key={o} value={o}/>
                ))}
            </datalist>

            <FormRow>
                <Select
                    label="Tipo de frete"
                    options={FREIGHT_TYPES}
                    value={form.freightType.value}
                    onSelected={(e) => form.freightType.setValue(e.target.value)}
                    onBlur={form.freightType.onBlur}
                    onFocus={form.freightType.onFocus}
                    isValid={!form.freightType.showError}
                    supportingText={form.freightType.errorMsg ?? ""}
                />

                <Checkbox
                    label="Cap do cliente"
                    checked={form.isClientCap.value}
                    onCheck={(e) => {
                        form.asphaltBinderContent.reset();
                        form.isClientCap.setValue(e.target.checked);
                    }}
                />

                <Input
                    label="Teor de CAP (%)"
                    inputMode="decimal"
                    value={form.asphaltBinderContent.value}
                    onChange={(e) => form.asphaltBinderContent.setValue(e.target.value)}
                    onBlur={form.asphaltBinderContent.onBlur}
                    onFocus={form.asphaltBinderContent.onFocus}
                    disabled={!form.isClientCap.value}
                    isValid={!form.asphaltBinderContent.showError}
                    supportingText={form.asphaltBinderContent.errorMsg ?? ""}
                />
            </FormRow>

            <FormRow>
                <Select
                    label="Unidade"
                    options={UNIT_OPTIONS}
                    value={form.unit.value}
                    onSelected={(e) => form.unit.setValue(e.target.value)}
                    onBlur={form.unit.onBlur}
                    onFocus={form.unit.onFocus}
                    isValid={!form.unit.showError}
                    supportingText={form.unit.errorMsg ?? ""}
                />

                <Input
                    label="Quantidade"
                    inputMode="decimal"
                    value={form.amount.value}
                    onChange={(e) => form.amount.setValue(e.target.value)}
                    onBlur={form.amount.onBlur}
                    onFocus={form.amount.onFocus}
                    isValid={!form.amount.showError}
                    supportingText={form.amount.errorMsg ?? ""}
                />

                <Input
                    label="Valor unitário"
                    inputMode="decimal"
                    prefix="R$"
                    value={form.price.value}
                    onChange={(e) => form.price.setValue(e.target.value)}
                    onBlur={form.price.onBlur}
                    onFocus={form.price.onFocus}
                    isValid={!form.price.showError}
                    supportingText={form.price.errorMsg ?? ""}
                />
            </FormRow>

            <div className={style.Action}>
                {form.isEditing ? (
                    <>
                        <Button
                            icon={Edit}
                            text="Editar produto/serviço"
                            onClick={onClick}
                        />
                        <Button
                            icon={X}
                            text="Cancelar edição"
                            onClick={() => form.reset()}
                        />
                    </>
                ) : (
                    <Button
                        icon={Plus}
                        text="Adicionar produto/serviço"
                        onClick={onClick}
                    />
                )}
            </div>
        </Card>
    );
}