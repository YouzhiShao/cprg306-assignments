"use client";
import { useState } from "react";

import itemsData from "./items.json";
import NewItem from "./NewItem";
import ItemList from "./GroceryItemList";

export default function Page() {
  const [items, setItems] = useState(itemsData);

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shopping List</h1>

      <section className="p-4 border rounded-md">
        <NewItem onAddItem={handleAddItem} />
      </section>

      <section className="p-4 border rounded-md">
        <ItemList items={items} />
      </section>
    </main>
  );
}
