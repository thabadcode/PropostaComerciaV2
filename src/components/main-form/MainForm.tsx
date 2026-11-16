import { useState } from "react";
import style from "./MainForm.module.css";
import { Info, Search } from "lucide-react";
import Input from "../input/Input";
import Button from "../button/Button";
import Checkbox from "../checkbox/Checkbox";
import Loading from "../loading/Loading";
import Select from "../select/Select";
import Textarea from "../textarea/Textarea";

interface MainFormProps {
    dateValue: string;
    onDateChange: (value: string) => void;
    isDateValid: boolean;
    dateSupportingText: string;

    companyName: string;
    onCompanyNameChenge: (value: string) => void;
    isCompanyNameValid: boolean;
    companyNameSupportingText: string;

    representative: string;
    onRepresentativeChange: (value: string) => void;

    paymentConditionSelected: string;
    onPaymentConditionChange: (value: string) => void;

    observations: string;
    onObservationsChange: (value: string) => void;

    showTotal: boolean;
    onShowTotalChenage: (value: boolean) => void;

    showPS: boolean;
    onShowPSChange: (value: boolean) => void;
}

export default function MainForm({
    dateValue,
    onDateChange,
    isDateValid,
    dateSupportingText,

    companyName,
    onCompanyNameChenge,
    isCompanyNameValid,
    companyNameSupportingText,

    representative,
    onRepresentativeChange,

    paymentConditionSelected,
    onPaymentConditionChange,

    observations,
    onObservationsChange,

    showTotal,
    onShowTotalChenage,

    showPS,
    onShowPSChange
}: MainFormProps) {
    const [cnpj, setCnpj] = useState("");
    const [isCnpjValid, setIsCnpjValid] = useState(true);
    const [cnpjsupportingText, setCnpjSupportingText] = useState(
        "Digite um CNPJ válido",
    );
    const [cnpjDisabled, setCnpjDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const setToday = () => {
        const today = new Date().toISOString().split("T")[0];
        onDateChange(today);
    };

    const searchCNPJ = () => {
        setIsLoading(true);
        setCnpjDisabled(true);
    };

    return (
        <div className={style.Form}>
            <h2>
                <Info/>
                Informações gerais
            </h2>

            <div className={style.RowInputs}>
                <Input
                    label="Data"
                    type="date"
                    value={dateValue}
                    onChange={(e) => onDateChange(e.target.value)}
                    isValid={isDateValid}
                    supportingText={dateSupportingText}
                    action={<Button text="Hoje" onClick={setToday}/>}
                />

                <Input
                    label="Pesquisar pelo CNPJ"
                    type="text"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    isValid={isCnpjValid}
                    disabled={cnpjDisabled}
                    supportingText={cnpjsupportingText}
                    action={isLoading ? (
                        <Loading text="Pesquisando"/>
                    ) : (
                        <Button
                            icon={Search}
                            text="Pesquisar"
                            onClick={searchCNPJ}
                        />
                    )}
                />
            </div>

            <Input
                label="Razão social"
                type="text"
                value={companyName}
                onChange={(e) => onCompanyNameChenge(e.target.value)}
                isValid={isCompanyNameValid}
                supportingText={companyNameSupportingText}
            />

            <div className={style.RowInputs}>
                <Input
                    label="Representante (opicional)"
                    type="text"
                    value={representative}
                    onChange={(e) => onRepresentativeChange(e.target.value)}
                    isValid={true}
                />

                <Select
                    label="Condições de pagamento"
                    value={paymentConditionSelected}
                    options={paymentConditions}
                    onSelected={(e) => onPaymentConditionChange(e.target.value)}
                    supportingText="Campo obrigatório" 
                    isValid={true}
                />
            </div>

            <Textarea
                label="Observações (opcional)"
                value={observations}
                onChange={(e) => onObservationsChange(e.target.value)}
            />

            <div className={style.Checks}>
                <Checkbox
                    label="Exibir valor total"
                    checked={showTotal}
                    onCheck={(e) => onShowTotalChenage(e.target.checked)}
                />

                <Checkbox
                    label="Exivir PS de frete"
                    checked={showPS}
                    onCheck={(e) => onShowPSChange(e.target.checked)}
                />
            </div>
        </div>
    );
}
