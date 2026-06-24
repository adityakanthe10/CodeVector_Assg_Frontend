"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setCategory } from "../store/productSlice";

const CATEGORIES = ["", "Electronics", "Clothing", "Books", "Home", "Sports"];

export default function CategoryFilter() {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCategory = useSelector(
    (state: RootState) => state.products.selectedCategory,
  );

  return (
    <div className="mb-8">
      <label
        htmlFor="category"
        className="mb-2 block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
      >
        Filter by Category
      </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => dispatch(setCategory(e.target.value))}
        className="block w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-base/6 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400 md:w-64"
      >
        <option value="">All Categories</option>
        {CATEGORIES.filter(Boolean).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
