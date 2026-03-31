"use client";
import { useState } from "react";

import { useUserAuth } from "../../contexts/AuthContext";
import itemsData from "./items.json";
import NewItem from "./NewItem";
import ItemList from "./GroceryItemList";
import MealIdeas from "./MealIdeas";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const { user, loading } = useUserAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Please sign in to view this page.</p>;
  }

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping List + Meal Ideas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section
          aria-label="Shopping list column"
          className="p-4 border rounded"
        >
          <NewItem onAddItem={handleAddItem} />
          <ItemList
            items={items}
            selectedName={selectedItemName}
            onSelectItem={(name) => setSelectedItemName(name)}
          />
        </section>

        <section aria-label="Meal ideas column" className="p-4 border rounded">
          <MealIdeas ingredient={selectedItemName} />
        </section>
      </div>
    </main>
  );
}
