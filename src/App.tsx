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
  const [products, setProducts] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMsg, setModalMsg] = useState("");

  const clearAll = () => {
    setProducts([]);
    mainForm.reset();
    productForm.reset();
  };

  const tryAddProduct = () => {
    if (!productForm.isValid) {
      productForm.touchAll();
      return;
    }

    const newProduct = {
      // Todo: implementar atributos do objeto product
    };

    setProducts([...products, newProduct])
    productForm.reset();
  }

  const tryGeneratePdf = () => {
    if (!mainForm.isValid || !productForm.isValid) {
      mainForm.touchAll();
      productForm.touchAll();
      return;
    }

    window.print();
  };

  return (
    <>
      <Header clearAll={clearAll} generatePDF={tryGeneratePdf} />
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