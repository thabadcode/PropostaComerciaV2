import type { MainFormState } from '../../core/hooks/useMainForm';
import type { ProductsState } from '../../core/hooks/useProducts';
import { PROVIDER_INFO } from '../../core/constants/providerInfo';
import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import bg_pdf from '../../assets/bg_pdf.jpg';
import style from './Preview.module.css';
import { formatter } from '../../core/utils/formatter';

export function Preview(
    {mainForm, products} : {mainForm: MainFormState, products: ProductsState}
) {
    const parsed = new Date(`${mainForm.date.value}T00:00`);
    const date = Number.isNaN(parsed.getTime()) ? new Date() : parsed;

    return (
        <div className={style.Preview}>
            <div id="preview-pdf" className={style.PreviewPdf}>
                <HeaderPdf date={date}/>
                
                <div className={style.BodyPdf}>
                        <div className={style.Infos}>
                        <div className={style.ClientInfo}>
                            <h3>CLIENTE</h3>
                            <div>
                                <h2>{mainForm.companyName.value || "Nome da empresa"}</h2>
                                {mainForm.cnpj.value && (
                                    <p><b>CNPJ.:</b>{formatter.cnpj(mainForm.cnpj.value)}</p>
                                )}
                                {mainForm.representative.value && (
                                    <p><b>A/C.:</b>{mainForm.representative.value}</p>
                                )}
                                {mainForm.observations.value && (
                                    <p><b>Obs.:</b>{mainForm.observations.value}</p>
                                )}
                            </div>
                        </div>

                        <div className={style.ProposalInfo}>
                            <h3>CONDIÇÕES DA PROPOSTA</h3>
                            <div>
                                <p><b>Data:</b>{formatter.shortDate(date)}</p>
                                <p><b>Validade:</b>{PROVIDER_INFO.proposal.validityDays} dias</p>
                                <p><b>Pagamento:</b>{mainForm.paymentCondition.value}</p>
                                {mainForm.showPS.value &&
                                    <p><b>Ps:</b>Produto retirado "in loco"</p>
                                }
                            </div>
                        </div>
                    </div>

                    <p className={style.Instruction}>{PROVIDER_INFO.proposal.instruction}</p>

                    <TablePdf mainForm={mainForm} products={products}/>
                </div>

                <FooterPDF/>
            </div>
        </div>
    );
}

function HeaderPdf({date} : {date: Date}) {
    return (
        <div className={style.PdfHeader}>
            <img src='/logo-t-oliver.webp' alt={PROVIDER_INFO.company.name}/>
            <div className={style.ProviderInfo}>
                <h2>{PROVIDER_INFO.company.name}</h2>
                <h3>{PROVIDER_INFO.company.slogan}</h3>
                <span>CNPJ: {PROVIDER_INFO.company.cnpj} • I.E: {PROVIDER_INFO.company.ie}</span>
            </div>
            <div className={style.LocalDate}>
                <h3>PROPOSTA COMERCIAL</h3>
                <h2>001/{date.getFullYear()}</h2>
                <span>{PROVIDER_INFO.company.address.city}, {formatter.longDate(date)}</span>
            </div>
        </div>
    );
}

function TablePdf({mainForm, products} : {mainForm: MainFormState,products: ProductsState}) {
    const { products: items, getTotal } = products;
    const renderProducts = () => {
        const length = items.length;
        if (length === 0) return <tr><td colSpan={6}>Nenhum produto adicionado</td></tr>;
        return items.map((p, index) => (
            <tr key={index}>
                <td>1.{index + 1}</td>
                <td>{p.description}</td>
                <td>{p.unit}</td>
                <td>{formatter.quantity(p.quantity)}</td>
                <td>{formatter.money(p.price)}</td>
                <td>{formatter.money(p.quantity * p.price)}</td>
            </tr>
        ));
    };

    return (
        <div className={style.TablePdf}>
            <table>
                <thead>
                    <tr>
                        <th>ITEM</th>
                        <th>DESCRIÇÃO</th>
                        <th>UNID.</th>
                        <th>QUANT.</th>
                        <th>VALOR UNIT.</th>
                        <th>SUBTOTAL</th>
                    </tr>
                </thead>

                <tbody>
                    {renderProducts()}
                </tbody>
            </table>
            {mainForm.showTotal.value &&
                <div className={style.TableTotal}>
                    <span>VALOR TOTAL DA PROPOSTA</span>
                    <b>{formatter.money(getTotal())}</b>
                </div>
            }
            
        </div>
    );
}

function FooterPDF() {
    const representative = PROVIDER_INFO.representative;
    const address = PROVIDER_INFO.company.address;
    const companyAddress = (`${address.landmark} - ${address.street}, ${address.kilometer} - ${address.city} - ${address.state}`);
    return (
        <div className={style.FooterPdf}>
            <div className={style.Representative}>
                <div className={style.RepresentativeInfo}>
                    <h3>Atenciosamente,</h3>
                    <div className={style.Subscriptionline}/>

                    <b>{representative.name}</b>
                    <span>{representative.creaNumber}</span>
                    <span>{representative.department}</span>
                </div>

                <div className={style.RepresentativeContact}>
                    <h3>Contato</h3>

                    <span>
                        <Phone/>
                        {representative.tel.number} ({representative.tel.operator})
                    </span>
                    <span>
                        <Mail/>
                        {representative.email}
                    </span>
                </div>
            </div>

            <img src={bg_pdf} alt="Vista aérea da usina"/>
            
            <div className={style.MarginFooter}>
                <div>
                    <span>
                        <MapPin/>
                        {companyAddress}
                    </span>

                    <span>
                        <Globe/>
                        {PROVIDER_INFO.company.urlSite}
                    </span>
                </div>
            </div>
        </div>
    );
}