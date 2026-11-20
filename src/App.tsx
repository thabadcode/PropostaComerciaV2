import Modal from "./components/ui/Modal/Modal";
import Header from "./components/Header/Header";
import MainForm from "./components/Forms/MainForm";
import ProductForm from "./components/Forms/ProductForm";
import { useMainForm } from "./core/hooks/useMainForm";
import { useProductForm } from "./core/hooks/useProductForm";
import { useProducts } from "./core/hooks/useProducts";
import { useModal } from "./core/hooks/useModal";
import { Table } from "./components/ui/Table/Table";
import { Preview } from "./components/Preview/Preview";
import { useDocumentTitle } from "./core/hooks/useDocumentTitle";
import { loadSnapshot } from "./core/utils/snapshot";
import { useAutoSave } from "./core/hooks/useAutoSave";
import { useState } from "react";

export default function App() {
  const [snapshot] = useState(loadSnapshot);

  const modal = useModal();
  const mainForm = useMainForm(snapshot?.mainForm);
  const productForm = useProductForm();
  const products = useProducts(snapshot?.products);
  const companyName = mainForm.companyName.value.trim().toUpperCase();

  useAutoSave(mainForm, products.products, modal.showModal);

  useDocumentTitle(companyName ? `Proposta Comercial - ${companyName}` : "Proposta Comercial");

  const clearAll = () => {
    modal.showModal(
      "Limpar tudo",
      "Isso apaga todas as informações e todos os produtos. Deseja continuar?",
      {
        confirmText: "Limpar",
        dismissText: "Cancelar",
        onConfirm: () => {
          mainForm.reset();
          productForm.reset();
          products.reset();
        }
      }
    )
  };

  const tryAddProduct = () => {
    if (!productForm.isValid) {
      productForm.touchAll();
      modal.showModal(
        "Campos inválidos",
        "Confira os dados do produto antes de adicioná-lo."
      );
      return;
    }

    products.insertProduct(productForm.toProduct());
    productForm.reset();
  };

  const tryGeneratePdf = () => {
    if (!mainForm.isValid) {
      mainForm.touchAll();
      modal.showModal(
        "Campos inválidos",
        "Preencha corretamente os dados do cabeçalho antes de gerar o documento."
      );
      return;
    }

    if (products.products.length === 0) {
      modal.showModal(
        "Nenhum produto adicionado",
        "Adicione ao menos um produto para gerar o documento."
      );
      return;
    }

    window.print();
  };

  return (
    <>
      <Header clearAll={clearAll} generatePDF={tryGeneratePdf} />
      <Modal
        show={modal.state.show}
        title={modal.state.title}
        message={modal.state.message}
        confirmText={modal.state.confirmText ?? "Ok"}
        dismissText={modal.state.dismissText}
        onConfirm={modal.confirm}
        onDismiss={modal.dismiss}
      />

      <main>
        <div className="forms">
          <MainForm form={mainForm} onShowModal={modal.showModal}/>
          <ProductForm form={productForm} onAddClick={tryAddProduct}/>
        </div>

        <div className="previews">
          <Table
            products={products}
            onMoveUp={(index) => products.reorderProducts(index, -1)}
            onMoveDown={(index) => products.reorderProducts(index, 1)}
            onEdit={(index) => alert("Todo: Implementar lógica de edição")}
            onDelete={(index) => products.removeProduct(index)}
          />

          <Preview mainForm={mainForm} products={products}/>
        </div>
      </main>
    </>
  );
}