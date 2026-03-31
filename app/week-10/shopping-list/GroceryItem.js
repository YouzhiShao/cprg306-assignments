"use client";

export default function Item({ item, isActive, onClick }) {
  const capitalize = (str = "") => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <li
      onClick={onClick}
      className={`cursor-pointer p-2 border rounded mb-2 ${
        isActive ? "bg-blue-100" : ""
      }`}
    >
      <p className="font-semibold">{item.name}</p>
      <p>Quantity: {item.quantity}</p>
      <p>Category: {capitalize(item.category)}</p>
    </li>
  );
}
