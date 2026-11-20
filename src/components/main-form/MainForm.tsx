import { useState } from "react";
import { type MainFormState } from "../../core/hooks/useMainForm";
import { Info, Search, CalendarCheck } from "lucide-react";
import { Card, FormRow } from "../card/Card";
import Input from "../input/Input";
import Button from "../button/Button";
import Checkbox from "../checkbox/Checkbox";
import Loading from "../loading/Loading";
import Select from "../select/Select";
import Textarea from "../textarea/Textarea";
import { PAYMENT_CONDITIONS } from "../../core/constants/formOptions"; 
import { searchCnpj } from "../../core/utils/searchCnpj";
import { formatter } from "../../core/utils/formatter";

export default function MainForm({form}: {form: MainFormState}) {
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
            // Todo: implementar aviso modal
            return;
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
                    label="Pesquisar pelo CNPJ"
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
            </FormRow>

            <Input
                label="Razão social"
                value={form.companyName.value}
                onChange={(e) => form.companyName.setValue(e.target.value)}
                onBlur={form.companyName.onBlur}
                onFocus={form.companyName.onFocus}
                isValid={!form.companyName.showError}
                supportingText={form.companyName.errorMsg ?? ""}
            />

            <FormRow>
                <Input
                    label="Representante (opicional)"
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
