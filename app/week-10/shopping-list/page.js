"use client";

import { useEffect, useState } from "react";
import { useUserAuth } from "../../contexts/AuthContext";
import { getItems, addItem } from "../services/shopping-list-service";

import NewItem from "./NewItem";
import GroceryItemList from "./GroceryItemList";
import MealIdeas from "./MealIdeas";

export default function Page() {
  const { user, loading } = useUserAuth();

  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);

  // Load shopping list items from Firestore
  async function loadItems() {
    if (!user) return;

    const firestoreItems = await getItems(user.uid);
    setItems(firestoreItems);
  }

  // Load items once authentication state is ready
  useEffect(() => {
    if (!loading && user) {
      loadItems();
    }
  }, [user, loading]);

  // Add a new item to Firestore
  async function handleAddItem(newItem) {
    if (!user) return;

    const newId = await addItem(user.uid, newItem);

    if (newId) {
      setItems([...items, { id: newId, ...newItem }]);
    }
  }

  // Authentication states
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Please sign in to view your shopping list.</p>;
  }

  const selectedItem = items.find((item) => item.id === selectedItemId);

  const selectedItemName = selectedItem
    ? selectedItem.name
        .split(",")[0]
        .replace(/\p{Emoji_Presentation}|\p{Extended_Pictographic}/gu, "")
        .trim()
    : "";

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping List + Meal Ideas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section
          aria-label="Shopping list column"
          className="p-4 border rounded"
        >
          <NewItem onAddItem={handleAddItem} />

          <GroceryItemList
            items={items}
            selectedId={selectedItemId}
            onSelectItem={(id) => setSelectedItemId(id)}
          />
        </section>

        <section aria-label="Meal ideas column" className="p-4 border rounded">
          {selectedItemName && <MealIdeas ingredient={selectedItemName} />}
        </section>
      </div>
    </main>
  );
}
