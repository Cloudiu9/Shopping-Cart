// https://flowbite.com/blocks/e-commerce/product-overview/

import Header from "../components/Header";
import Product from "../components/Product";

export default function ProductPage() {
  return (
    <div className="overflow-y-auto no-scrollbar">
      <Header />

      <Product />
    </div>
  );
}
