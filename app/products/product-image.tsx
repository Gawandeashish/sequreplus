"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Product } from "@/src/data/products";

export default function ProductImage({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => setHasError(false), [product.imagePath]);

  return (
    <div className="product-image-frame">
      {hasError ? (
        <div className="product-image-fallback" role="img" aria-label={`${product.name} product image placeholder`}>
          <svg viewBox="0 0 120 120" aria-hidden="true"><path d="M60 11 99 27v27c0 26-16 43-39 54C37 97 21 80 21 54V27z"/><path d="m43 59 12 12 23-26"/></svg>
          <span>Product image coming soon</span>
        </div>
      ) : (
        <Image
          src={product.imagePath}
          alt={`${product.name} security device`}
          fill
          sizes="(max-width: 680px) 92vw, (max-width: 900px) 42vw, 40vw"
          className="product-image"
          onError={() => setHasError(true)}
          unoptimized
          priority={priority}
        />
      )}
    </div>
  );
}
