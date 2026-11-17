import { useState } from "react";
import Modal from "./components/modal/Modal";
import Header from "./components/header/Header";
import MainForm from "./components/main-form/MainForm";
import ProductForm from "./components/product-form/ProductForm";
import { useMainForm } from "./core/hooks/useMainForm";

export default function App() {
  const mainForm = useMainForm();
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMsg, setModalMsg] = useState("");

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
          <MainForm form={mainForm}/>

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