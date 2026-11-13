import { BRAND_NAME } from "@/src/config/brand";
import type { Product } from "@/src/data/products";
import ProductImage from "./product-image";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");

function inquiryHref(productName: string) {
  if (!whatsappNumber) return "/contact";
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi ${BRAND_NAME}, I'd like to enquire about ${productName}.`)}`;
}

export default function ProductShowcase({ product, index }: { product: Product; index: number }) {
  const headingId = `${product.id}-title`;

  return (
    <article className={`product-showcase${index % 2 ? " product-showcase-alt" : ""}`} aria-labelledby={headingId}>
      <div className="product-showcase-inner">
        <ProductImage product={product} priority={index === 0} />
        <div className="product-details">
          <div className="product-kicker">SequrePlus security system</div>
          <h2 id={headingId}>{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price-label">Indicative price</p>
          <p className="product-price">{product.price}</p>
          <a className="button button-teal product-inquiry" href={inquiryHref(product.name)} target={whatsappNumber ? "_blank" : undefined} rel={whatsappNumber ? "noreferrer" : undefined}>
            {whatsappNumber ? "Enquire on WhatsApp" : "Get Protected"}<span className="arrow" aria-hidden="true">↗</span>
          </a>
          <section className="product-info-block" aria-labelledby={`${product.id}-features`}>
            <h3 id={`${product.id}-features`}>Key features</h3>
            <ul className="product-feature-list">{product.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
          </section>
          <section className="product-info-block product-specifications" aria-labelledby={`${product.id}-specifications`}>
            <h3 id={`${product.id}-specifications`}>Technical specifications</h3>
            <dl>{product.specifications.map((specification, specIndex) => <div key={`${specification.label}-${specIndex}`}><dt>{specification.label}</dt><dd>{specification.value}</dd></div>)}</dl>
          </section>
        </div>
      </div>
    </article>
  );
}
