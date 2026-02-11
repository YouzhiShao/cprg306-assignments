"use client";
import { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  const handleSubmit = (e) => {
    e.preventDefault();

    const item = {
      name: name.trim(),
      quantity: Number(quantity),
      category,
    };

    console.log("Submitting item:", item);

    alert(
      `Item added:\n- Name: ${item.name}\n- Quantity: ${item.quantity}\n- Category: ${item.category}`,
    );

    // Reset all fields to their initial values
    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
      {/* Name */}
      <div style={{ display: "grid", gap: 6 }}>
        <label htmlFor="name" style={{ fontWeight: 600 }}>
          Item Name <span style={{ color: "#d00" }}>*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="e.g., Apple"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: "0.6rem 0.75rem",
            border: "1px solid #d1d5db",
            borderRadius: 6,
            outline: "none",
          }}
        />
      </div>

      {/* Quantity */}
      <div style={{ display: "grid", gap: 6 }}>
        <label htmlFor="quantity" style={{ fontWeight: 600 }}>
          Quantity
        </label>
        <input
          id="quantity"
          type="number"
          min={1}
          max={99}
          value={quantity}
          onChange={(e) => {
            const v = e.target.value;
            // Ensure quantity stays between 1 and 99
            const n = Math.max(1, Math.min(99, Number(v)));
            setQuantity(n);
          }}
          style={{
            padding: "0.6rem 0.75rem",
            border: "1px solid #d1d5db",
            borderRadius: 6,
            outline: "none",
            width: 160,
          }}
        />
      </div>

      {/* Category */}
      <div style={{ display: "grid", gap: 6 }}>
        <label htmlFor="category" style={{ fontWeight: 600 }}>
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "0.6rem 0.75rem",
            border: "1px solid #d1d5db",
            borderRadius: 6,
            outline: "none",
            width: 220,
            backgroundColor: "var(--foreground)",
            color: "var(--background)",
          }}
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen">Frozen</option>
          <option value="pantry">Pantry</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          style={{
            padding: "0.6rem 1rem",
            background: "var(--foreground)",
            color: "var(--background)",
            border: 0,
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Add Item
        </button>
      </div>
    </form>
  );
}
