import { useState } from "react";
import { type MainFormState } from "../../core/hooks/useMainForm";
import { Info, Search, CalendarCheck } from "lucide-react";
import { Card, FormRow } from "../ui/Card/Card";
import Input from "../ui/Input/Input";
import Button from "../ui/Button/Button";
import Checkbox from "../ui/Checkbox/Checkbox";
import Loading from "../ui/Loading/Loading";
import Select from "../ui/Select/Select";
import Textarea from "../ui/Textarea/Textarea";
import { PAYMENT_CONDITIONS } from "../../core/constants/formOptions"; 
import { searchCnpj } from "../../core/utils/searchCnpj";
import { formatter } from "../../core/utils/formatter";

export default function MainForm(
    {form, onShowModal}:
    {form: MainFormState, onShowModal: (title: string, message: string) => void}
) {
    const [isLoading, setIsLoading] = useState(false);
    const setToday = () => {
        const today = new Date().toLocaleDateString("en-CA");
        form.date.setValue(today);
    };

    const handleSearchCnpj  = async () => {
        if (isLoading || !form.cnpj.isValid) return;
        setIsLoading(true);
        const result = await searchCnpj(form.cnpj.value);
        setIsLoading(false);
        if ((result).hasError) {
            onShowModal(
                "Erro ao pesquisar CNPJ",
                result.errorMsg ?? "Não foi possível pesquisar pelo CNPJ. Tente novamente mais tarde."
            );
            return;
        }
        if (!result.isActive) {
            onShowModal(
                "CNPJ baixado",
                "Este CNPJ está baixado (inativo) na base da Receita Federal. Você pode gerar a proposta mesmo assim, mas recomenda-se confirmar com o cliente os dados de faturamento antes de fechar negócio."
            );
        }
        form.companyName.setValue(result.companyName);
    };

    return (
        <Card icon={Info} title="Informações gerais">
            <FormRow>
                <Input
                    label="Data"
                    type="date"
                    value={form.date.value}
                    onChange={(e) => form.date.setValue(e.target.value)}
                    onBlur={form.date.onBlur}
                    onFocus={form.date.onFocus}
                    isValid={!form.date.showError}
                    supportingText={form.date.errorMsg ?? ""}
                    action={
                        <Button
                            icon={CalendarCheck}
                            text="Hoje"
                            onClick={setToday}
                        />
                    }
                />

                <Input
                    label="Número da Proposta"
                    inputMode="numeric"
                    value={form.proposalNumber.value}
                    onChange={(e) => form.proposalNumber.setValue(e.target.value)}
                    onBlur={form.proposalNumber.onBlur}
                    onFocus={form.proposalNumber.onFocus}
                    isValid={form.proposalNumber.isValid}
                    supportingText={form.proposalNumber.errorMsg ?? ""}
                />
            </FormRow>

            <Input
                label="Pesquisar pelo CNPJ (opcional)"
                value={formatter.cnpj(form.cnpj.value)}
                onChange={(e) => form.cnpj.setValue(e.target.value.replace(/\D/g, "").slice(0, 14))}
                onBlur={form.cnpj.onBlur}
                onFocus={form.cnpj.onFocus}
                isValid={!form.cnpj.showError}
                disabled={isLoading}
                supportingText={form.cnpj.errorMsg ?? ""}
                action={isLoading ? (
                    <Loading text="Pesquisando"/>
                ) : (
                    <Button
                        icon={Search}
                        text="Pesquisar"
                        onClick={handleSearchCnpj}
                    />
                )}
            />

            <Input
                label="Razão social"
                value={form.companyName.value}
                onChange={(e) => form.companyName.setValue(e.target.value.toUpperCase())}
                onBlur={form.companyName.onBlur}
                onFocus={form.companyName.onFocus}
                isValid={!form.companyName.showError}
                supportingText={form.companyName.errorMsg ?? ""}
            />

            <FormRow>
                <Input
                    label="Representante (opcional)"
                    value={form.representative.value}
                    onChange={(e) => form.representative.setValue(e.target.value)}
                    isValid={true}
                />

                <Select
                    label="Condições de pagamento"
                    value={form.paymentCondition.value}
                    options={PAYMENT_CONDITIONS}
                    onSelected={(e) => form.paymentCondition.setValue(e.target.value)}
                    onBlur={form.paymentCondition.onBlur}
                    onFocus={form.paymentCondition.onFocus}
                    supportingText={form.paymentCondition.errorMsg ?? ""}
                    isValid={!form.paymentCondition.showError}
                />
            </FormRow>

            <Textarea
                label="Observações (opcional)"
                value={form.observations.value}
                onChange={(e) => form.observations.setValue(e.target.value)}
            />

            <FormRow>
                <Checkbox
                    label="Exibir valor total"
                    checked={form.showTotal.value}
                    onCheck={(e) => form.showTotal.setValue(e.target.checked)}
                />

                <Checkbox
                    label="Exibir PS de frete"
                    checked={form.showPS.value}
                    onCheck={(e) => form.showPS.setValue(e.target.checked)}
                />
            </FormRow>
        </Card>
    );
}
