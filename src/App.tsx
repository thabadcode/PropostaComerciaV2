import { useState } from "react";
import Modal from "./components/modal/Modal";
import Header from "./components/header/Header";
import MainForm from "./components/main-form/MainForm";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMsg, setModalMsg] = useState("");

  const [date, setDate] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [representative, setRepresentative] = useState("");
  const [paymentConditionSelected, setPaymentConditionSelected] = useState("");
  const [observations, setObservations] = useState("");
  const [showTotal, setShowTotal] = useState(true);
  const [showPS, setShowPS] = useState(true);

  const showClearMsg = () => {
    alert("Tudo foi limpo");
  };

  return (
    <>
      <Header clearAll={showClearMsg} generatePDF={window.print} />
      <Modal
        show={showModal}
        title={modalTitle}
        message={modalMsg}
        confirmText="Ok"
        onConfirm={() => setShowModal(false)}
      />

      <main>
        <form>
          <MainForm
            showModal={(value) => setShowModal(value)}
            setModalTitle={(value) => setModalTitle(value)}
            setModalMsg={(value) => setModalMsg(value)}

            dateValue={date}
            onDateChange={(value) => setDate(value)}
            isDateValid={true}
            dateSupportingText="Campo obrigatório"

            companyName={companyName}
            onCompanyNameChenge={(value) => setCompanyName(value)}
            isCompanyNameValid={true}
            companyNameSupportingText="Campo obrigatório"

            representative={representative}
            onRepresentativeChange={(value) => setRepresentative(value)}

            paymentConditionSelected={paymentConditionSelected}
            onPaymentConditionChange={(value) => setPaymentConditionSelected(value)}

            observations={observations}
            onObservationsChange={(value) => setObservations(value)}

            showTotal={showTotal}
            onShowTotalChenage={(value) => setShowTotal(value)}

            showPS={showPS}
            onShowPSChange={(value) => setShowPS(value)}
          />
        </form>
      </main>
    </>
  );
}