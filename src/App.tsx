import { useState } from "react";
import Modal from "./components/modal/Modal";
import Header from "./components/header/Header";
import MainForm from "./components/main-form/MainForm";
import ProductForm from "./components/product-form/ProductForm";
import { useMainForm } from "./core/hooks/useMainForm";
import { useProductForm } from "./core/hooks/useProductForm";
import { useProducts, type Product } from "./core/hooks/useProducts";

export default function App() {
  const mainForm = useMainForm();
  const productForm = useProductForm();
  const products = useProducts();

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMsg, setModalMsg] = useState("");

  const clearAll = () => {
    // Todo: Implementar confirmação com modal

    mainForm.reset();
    productForm.reset();
    products.reset();
  };

  const buildFinalDescription = () => {
    let finalDescription = `${productForm.description.value} - ${productForm.freightType.value}`;
    if (productForm.isClientCap) {
      finalDescription += ` - CAP por conta do cliente - Teor ${productForm.asphaltBinderContent.value}%`;
    }
    return finalDescription;
  };

  const tryAddProduct = () => {
    if (!productForm.isValid) {
      productForm.touchAll();
      return;
    }

    const newProduct: Product = {
      description: buildFinalDescription(),
      unit: productForm.unit.value,
      quantity: Number(productForm.amount.value),
      price: Number(productForm.price.value)
    };

    products.insertProduct(newProduct);
    productForm.reset();
  };

  const tryGeneratePdf = () => {
    if (!mainForm.isValid) {
      mainForm.touchAll();
      productForm.touchAll();
      return;
    }

    if (products.products.length === 0) {
      // Todo: avisar com o modal que falta adicionar produtos
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