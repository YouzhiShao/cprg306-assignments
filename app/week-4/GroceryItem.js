
// /app/week-4/GroceryItem.js

export default function Item({ name, quantity, category }) {
  return (
    <li className="border border-gray-400 rounded-md p-4 mb-4 bg-slate-200">
      <p className="font-medium">{name}</p>
      <p>Quantity: {quantity}</p>
      <p>Category: {category.charAt(0).toUpperCase() + category.slice(1)}</p>
    </li>
  );
}
