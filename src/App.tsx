import { useState } from "react";
import Modal from "./components/modal/Modal";
import Header from "./components/header/Header";
import MainForm from "./components/main-form/MainForm";
import ProductForm from "./components/product-form/ProductForm";
import { useMainForm } from "./core/hooks/useMainForm";
import { useProductForm } from "./core/hooks/useProductForm";

export default function App() {
  const mainForm = useMainForm();
  const productForm = useProductForm();
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMsg, setModalMsg] = useState("");

  const showClearMsg = () => {
    // Todo: implementar limpeza da lista de produtos;
    mainForm.reset();
    productForm.reset();
  };

  const tryAddProduct = () => {
    // Todo: implementar validação e adição de produtos
    productForm.reset();
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
          <ProductForm form={productForm} onAddClick={tryAddProduct}/>
        </form>
      </main>
    </>
  );
}