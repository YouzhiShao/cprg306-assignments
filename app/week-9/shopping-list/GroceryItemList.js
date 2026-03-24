// /app/week-8/GroceryItemList.js
"use client";
import { useState } from "react";
import Item from "./GroceryItem";

export default function GroceryItemList({ items, onSelectItem, selectedName }) {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "category") return a.category.localeCompare(b.category);
    return 0;
  });

  return (
    <section className="mt-8">
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setSortBy("name")}
          className={`px-3 py-1 rounded ${
            sortBy === "name"
              ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 dark:text-slate-900"
              : "bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
          }`}
        >
          Sort by Name
        </button>

        <button
          onClick={() => setSortBy("category")}
          className={`px-3 py-1 rounded ${
            sortBy === "category"
              ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 dark:text-slate-900"
              : "bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
          }`}
        >
          Sort by Category
        </button>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {sortedItems.map((item) => {
          const isActive = selectedName && item.name === selectedName;
          return (
            <div
              key={item.id}
              className={`p-3 border rounded cursor-pointer ${
                isActive
                  ? "ring-2 ring-blue-500 bg-blue-50 dark:ring-blue-400 dark:bg-slate-700"
                  : ""
              }`}
              onClick={() => onSelectItem?.(item.name)}
              title="Click to view meal ideas"
            >
              <Item
                name={item.name}
                quantity={item.quantity}
                category={item.category}
              />
            </div>
          );
        })}
      </ul>
    </section>
  );
}
