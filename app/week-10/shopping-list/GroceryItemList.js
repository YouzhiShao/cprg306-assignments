"use client";

import { useState } from "react";
import Item from "./GroceryItem";

export default function GroceryItemList({ items, onSelectItem, selectedId }) {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "category") return a.category.localeCompare(b.category);
    return 0;
  });

  return (
    <>
      <div className="flex gap-2 mb-4">
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

      <ul>
        {sortedItems.map((item) => {
          const isActive = selectedId && item.id === selectedId;

          return (
            <Item
              key={item.id}
              item={item}
              isActive={isActive}
              onClick={() => onSelectItem?.(item.id)}
              title="Click to view meal ideas"
            />
          );
        })}
      </ul>
    </>
  );
}
