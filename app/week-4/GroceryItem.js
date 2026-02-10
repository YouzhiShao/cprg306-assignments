// /app/week-4/GroceryItem.js

export default function Item({ name, quantity, category }) {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <li
      className="border border-gray-400 rounded-md p-4 mb-4 bg-slate-200
    dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
    >
      <p className="font-medium">{name}</p>
      <p>Quantity: {quantity}</p>
      <p>Category: {capitalize(category)}</p>
    </li>
  );
}
