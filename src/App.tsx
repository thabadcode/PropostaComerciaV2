import { useState } from "react";
import Modal from "./components/modal/Modal";
import Header from "./components/header/Header";
import MainForm from "./components/main-form/MainForm";
import ProductForm from "./components/product-form/ProductForm";

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

  const [description, setDescription] = useState("");
  const [freightType, setFreightType] = useState("");
  const [isClientCap, setIsClientCap] = useState(false);
  const [asphaltBinderContent, setAsphaltBinderContent] = useState("");
  const [unit, setUnit] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  const showClearMsg = () => {
    alert("Tudo foi limpo");
  };

  const tryAddProduct = () => {
    // Todo: implementar validação e adição de produtos
  }

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

          <ProductForm
            description={description}
            onDescriptionChange={setDescription}
            isDescriptionValid={true}

            freightType={freightType}
            onFreightTypeChange={setFreightType}
            isFreightTypeValid={true}

            isClientCap={isClientCap}
            onClientCapChange={setIsClientCap}

            asphaltBinderContent={asphaltBinderContent}
            onAsphaltBinderContentChange={setAsphaltBinderContent}
            disabledAsphaltBinderContent={!isClientCap}
            isAsphaltBinderContent={true}

            unit={unit}
            onUnitChange={setUnit}
            isUnitValid={true}

            amount={amount}
            onAmountChange={setAmount}
            isAmountValid={true}

            price={price}
            onPriceChange={setPrice}
            isPriceValid={true}

            onAddClick={tryAddProduct}
          />
        </form>
      </main>
    </>
  );
}