import SiteNavigation from "../site-navigation";
import ProductShowcase from "./product-showcase";
import { products } from "@/src/data/products";

export default function ProductsPage() {
  return (
    <main>
      <SiteNavigation />
      <section className="products-page" aria-labelledby="products-title">
        <header className="products-intro">
          <div className="eyebrow"><span className="eyebrow-line" /> Thoughtful security, made clear</div>
          <h1 id="products-title">Explore the SequrePlus range</h1>
          <p>Get to know the devices and configurations designed to help protect the spaces that matter.</p>
        </header>
        <div className="products-list">
          {products.map((product, index) => <ProductShowcase key={product.id} product={product} index={index} />)}
        </div>
      </section>
    </main>
  );
}
