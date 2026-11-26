import type { MainFormState } from "../../core/hooks/useMainForm";
import type { ProductsState } from "../../core/hooks/useProducts";
import { PROVIDER_INFO } from "../../core/constants/providerInfo";
import {
    FileText,
    Hand,
    Mail,
    MapPin,
    MousePointer,
    Phone,
    ZoomIn,
    ZoomOut,
} from "lucide-react";
import bg_pdf from "../../assets/bg_pdf.jpg";
import style from "./Preview.module.css";
import pdf from "./PdfDocument.module.css";
import { formatter } from "../../core/utils/formatter";
import Button from "../ui/Button/Button";
import { Card } from "../ui/Card/Card";
import { usePanZoom } from "../../core/hooks/usePanZoom";
import type { Product } from "../../core/utils/types";

export function Preview({
    mainForm,
    products,
    pdfRef
}: {
    mainForm: MainFormState;
    products: ProductsState;
    pdfRef: React.RefObject<HTMLDivElement | null>;
}) {
    const parsed = new Date(`${mainForm.date.value}T00:00`);
    const date = Number.isNaN(parsed.getTime()) ? new Date() : parsed;
    const panZoom = usePanZoom(pdfRef);

    return (
        <Card icon={FileText} title="Pré-visualização">
            <div className={style.Controller}>
                <Button
                    icon={ZoomIn}
                    onClick={panZoom.zoomIn}
                    disabled={panZoom.disabledZoomIn}
                />
                <Button text={`${panZoom.zoom}%`} onClick={panZoom.resetZoom} />
                <Button
                    icon={ZoomOut}
                    onClick={panZoom.zoomOut}
                    disabled={panZoom.disabledZoomOut}
                />
                {panZoom.hasMouse && (
                    <Button
                        icon={panZoom.panMode ? Hand : MousePointer}
                        text={
                            panZoom.panMode
                                ? "Modo arrastar"
                                : "Modo selecionar"
                        }
                        onClick={panZoom.togglePanMode}
                    />
                )}
            </div>

            <div
                className={`${style.Limiter} ${panZoom.panMode ? style.Pan : ""} ${panZoom.dragging ? style.Dragging : ""}`}
                {...panZoom.limiterHandlers}
            >
                <div className={style.Sizer} style={panZoom.sizerStyle}>
                    <div
                        id="preview-pdf"
                        ref={pdfRef}
                        style={panZoom.pdfStyle}
                        className={pdf.Document}
                    >
                        <Page
                            proposalNumber={mainForm.proposalNumber.value}
                            date={date}
                        >
                            <InfoRow date={date} mainForm={mainForm} />

                            <Table mainForm={mainForm} products={products} />

                            <SignatureArea />
                        </Page>
                    </div>
                </div>
            </div>
        </Card>
    );
}

function Page({
    proposalNumber,
    date,
    children,
}: {
    proposalNumber: string;
    date: Date;
    children: React.ReactNode;
}) {
    return (
        <div className={pdf.Page}>
            <Header proposalNumber={proposalNumber} date={date} />
            <div className={pdf.Body}>{children}</div>
            <Footer />
        </div>
    );
}

function Header({
    proposalNumber,
    date,
}: {
    proposalNumber: string;
    date: Date;
}) {
    return (
        <div className={pdf.Header}>
            <img
                className={pdf.Logo}
                src={`${import.meta.env.BASE_URL}logo-t-oliver.webp`}
                alt={PROVIDER_INFO.company.name}
            />
            <div>
                <h2 className={pdf.CompanyName}>
                    {PROVIDER_INFO.company.name}
                </h2>
                <h3 className={pdf.CompanySlogan}>
                    {PROVIDER_INFO.company.slogan}
                </h3>
                <span className={pdf.CompanyDocs}>
                    CNPJ: {PROVIDER_INFO.company.cnpj} • I.E:{" "}
                    {PROVIDER_INFO.company.ie}
                </span>
            </div>
            <div className={pdf.ProposalHeading}>
                <h3 className={pdf.ProposalLabel}>PROPOSTA COMERCIAL</h3>
                <b className={pdf.ProposalNumber}>
                    {formatter.proposalNumber(proposalNumber)}/
                    {date.getFullYear()}
                </b>
                <span className={pdf.ProposalPlace}>
                    {PROVIDER_INFO.company.address.city},{" "}
                    {formatter.longDate(date)}
                </span>
            </div>
        </div>
    );
}

function Footer() {
    const address = PROVIDER_INFO.company.address;
    const companyAddress = `${address.landmark} - ${address.street}, ${address.kilometer} - ${address.city} - ${address.state}`;
    return (
        <div className={pdf.Footer}>
            <span>
                <MapPin />
                {companyAddress}
            </span>

            <span>
                <img
                    src={`${import.meta.env.BASE_URL}logo-t-oliver.webp`}
                    alt={PROVIDER_INFO.company.name}
                />
                {PROVIDER_INFO.company.urlSite}
            </span>
        </div>
    );
}

function InfoRow({ date, mainForm }: { date: Date; mainForm: MainFormState }) {
    return (
        <div className={pdf.InfoRow}>
            <div className={`${pdf.InfoCard} ${pdf.ClientInfo}`}>
                <h3 className={pdf.InfoTitle}>CLIENTE</h3>
                <div className={pdf.InfoList}>
                    <h2 className={pdf.ClientName}>
                        {mainForm.companyName.value || "Nome da empresa"}
                    </h2>
                    {mainForm.cnpj.value && (
                        <p className={pdf.InfoItem}>
                            <b className={pdf.InfoLabel}>CNPJ.:</b>
                            {formatter.cnpj(mainForm.cnpj.value)}
                        </p>
                    )}
                    {mainForm.representative.value && (
                        <p className={pdf.InfoItem}>
                            <b className={pdf.InfoLabel}>A/C.:</b>
                            {mainForm.representative.value}
                        </p>
                    )}
                    {mainForm.observations.value && (
                        <p className={pdf.InfoItem}>
                            <b className={pdf.InfoLabel}>Obs.:</b>
                            {mainForm.observations.value}
                        </p>
                    )}
                </div>
            </div>

            <div className={`${pdf.InfoCard} ${pdf.ProposalInfo}`}>
                <h3 className={pdf.InfoTitle}>CONDIÇÕES DA PROPOSTA</h3>
                <div className={pdf.InfoList}>
                    <p className={pdf.InfoItem}>
                        <b className={pdf.InfoLabel}>Data:</b>
                        {formatter.shortDate(date)}
                    </p>
                    <p className={pdf.InfoItem}>
                        <b className={pdf.InfoLabel}>Validade:</b>
                        {PROVIDER_INFO.proposal.validityDays} dias
                    </p>
                    <p className={pdf.InfoItem}>
                        <b className={pdf.InfoLabel}>Pagamento:</b>
                        {mainForm.paymentCondition.value}
                    </p>
                    {mainForm.showPS.value && (
                        <p className={pdf.InfoItem}>
                            <b className={pdf.InfoLabel}>Ps:</b>
                            Produto retirado "in loco"
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

function Table({
    mainForm,
    products,
}: {
    mainForm: MainFormState;
    products: ProductsState;
}) {
    const { products: items, getTotal } = products;
    const columns = [
        {
            label: "ITEM",
            align: pdf.Center,
            col: pdf.ColItem,
            value: (_p: Product, i: number) => `1.${i + 1}`,
        },
        {
            label: "DESCRIÇÃO",
            align: pdf.Left,
            col: pdf.ColText,
            value: (p: Product) => products.getFormated(p),
        },
        {
            label: "UNID.",
            align: pdf.Center,
            col: pdf.ColUnit,
            value: (p: Product) => p.unit,
        },
        {
            label: "QUANT.",
            align: pdf.Right,
            col: pdf.ColQty,
            value: (p: Product) => formatter.quantity(p.quantity),
        },
        {
            label: "VALOR UNIT.",
            align: pdf.Right,
            col: pdf.ColPrice,
            value: (p: Product) => formatter.money(p.price),
        },
        {
            label: "SUBTOTAL",
            align: pdf.Right,
            col: pdf.ColSubtotal,
            value: (p: Product) => formatter.money(products.getSubtotal(p)),
        },
    ];

    return (
        <div className={pdf.Table}>
            <p className={pdf.TableIntro}>
                {PROVIDER_INFO.proposal.instruction}
            </p>
            <table>
                <colgroup>
                    {columns.map((c) => (
                        <col key={c.label} className={c.col} />
                    ))}
                </colgroup>

                <thead>
                    <tr>
                        {columns.map((c) => (
                            <th key={c.label} className={c.align}>
                                {c.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {items.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                style={{ textAlign: "center" }}
                            >
                                Nenhum produto adicionado
                            </td>
                        </tr>
                    ) : (
                        items.map((p, i) => (
                            <tr key={p.id}>
                                {columns.map((c) => (
                                    <td key={c.label} className={c.align}>
                                        {c.value(p, i)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {mainForm.showTotal.value && (
                <div className={pdf.TableTotal}>
                    <span>VALOR TOTAL DA PROPOSTA</span>
                    <b>{formatter.money(getTotal())}</b>
                </div>
            )}
        </div>
    );
}

function SignatureArea() {
    const representative = PROVIDER_INFO.representative;
    return (
        <div className={pdf.SignatureArea}>
            <div className={pdf.Representative}>
                <div className={pdf.RepresentativeInfo}>
                    <h3 className={pdf.SignatureTitle}>Atenciosamente,</h3>
                    <div className={pdf.SignatureLine} />

                    <b>{representative.name}</b>
                    <span>{representative.creaNumber}</span>
                    <span>{representative.department}</span>
                </div>

                <div className={pdf.RepresentativeContact}>
                    <h3 className={pdf.SignatureTitle}>Contato</h3>

                    <span>
                        <Phone />
                        {representative.tel.number} (
                        {representative.tel.operator})
                    </span>
                    <span>
                        <Mail />
                        {representative.email}
                    </span>
                </div>
            </div>

            <img src={bg_pdf} alt="Vista aérea da usina" />
        </div>
    );
}
