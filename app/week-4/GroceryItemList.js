
// /app/week-4/GroceryItemList.js

import Item from "./GroceryItem";
import items from "./items.json";


export default function GroceryItemList() {

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {items.map((item) => (
        <Item
          key={item.id}
          name={item.name}
          quantity={item.quantity}
          category={item.category}
        />
      ))}
    </ul>
  );
}