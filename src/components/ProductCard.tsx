import { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-3 text-lg/6 font-semibold text-gray-900 dark:text-gray-100">
        {product.name}
      </h3>
      <div className="mb-3 flex items-center justify-between">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
          {product.category}
        </span>
        <span className="text-lg/7 font-bold text-green-600 dark:text-green-400">
          ${product.price.toFixed(2)}
        </span>
      </div>
      <div className="text-xs/5 text-gray-500 dark:text-gray-400">
        Created: {new Date(product.created_at).toLocaleDateString()}
      </div>
    </div>
  );
}
