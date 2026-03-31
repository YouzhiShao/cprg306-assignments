"use client";
import { useState } from "react";
const CATEGORY_OPTIONS = [
  "produce",
  "dairy",
  "bakery",
  "meat",
  "frozen",
  "pantry",
  "beverages",
  "snacks",
  "other",
];

export default function NewItem({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  const handleSubmit = (e) => {
    e.preventDefault();

    const item = {
      // id: crypto.randomUUID(),
      name: name.trim(),
      quantity: Number(quantity) || 1,
      category,
    };

    // console.log("Submitting item:", item);
    onAddItem?.(item);

    // Reset all fields to their initial values
    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {/* Name */}
      <div className="grid gap-1.5">
        <label htmlFor="name" className="font-semibold">
          Item Name <span className="text-red-600">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="e.g., Apple"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="px-3 py-2 border border-gray-300 rounded-md outline-none"
        />
      </div>

      {/* Quantity */}
      <div className="grid gap-1.5">
        <label htmlFor="quantity" className="font-semibold">
          Quantity
        </label>
        <input
          id="quantity"
          type="number"
          min={1}
          max={99}
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
          className="px-3 py-2 border border-gray-300 rounded-md outline-none w-40"
        />
      </div>

      {/* Category */}
      <div className="grid gap-1.5">
        <label htmlFor="category" className="font-semibold">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md outline-none w-56 bg-[var(--foreground)] text-[var(--background)]"
        >
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          className="px-4 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-md cursor-pointer"
        >
          Add Item
        </button>
      </div>
    </form>
  );
}
