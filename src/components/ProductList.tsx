"use client";

import { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { loadProducts } from "../store/productSlice";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error, hasMore, selectedCategory } = useSelector(
    (state: RootState) => state.products,
  );

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(loadProducts({ reset: true }));
  }, [dispatch, selectedCategory]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !loading) {
        dispatch(loadProducts({ reset: false }));
      }
    },
    [dispatch, hasMore, loading],
  );

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [handleObserver]);

  return (
    <div className="space-y-8">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 dark:border-red-800/50 dark:bg-red-950/20 dark:text-red-400">
          <p className="text-sm/6 font-medium">{error}</p>
        </div>
      )}

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="spinner mb-3" />
          <p className="text-sm/6 text-gray-600 dark:text-gray-400">
            Loading more products...
          </p>
        </div>
      )}

      {!hasMore && products.length > 0 && (
        <div className="py-8 text-center">
          <p className="text-sm/6 text-gray-500 dark:text-gray-400">
            🎉 You&apos;ve reached the end of the catalog
          </p>
        </div>
      )}

      {!loading && products.length === 0 && !error && (
        <div className="py-12 text-center">
          <p className="text-lg/7 text-gray-500 dark:text-gray-400">
            No products found for this category
          </p>
        </div>
      )}

      <div ref={loadMoreRef} className="h-4" />
    </div>
  );
}
