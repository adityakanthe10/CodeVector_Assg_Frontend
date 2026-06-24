"use client";

import CategoryFilter from "../components/CategoryFilter";
import ProductList from "../components/ProductList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl/[1.2] font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Product Catalog
          </h1>
          <p className="mt-3 text-lg/7 text-gray-600 dark:text-gray-400">
            Browse our collection of products with infinite scroll pagination
          </p>
        </div>

        <CategoryFilter />
        <ProductList />
      </div>
    </main>
  );
}
