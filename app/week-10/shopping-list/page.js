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
  const [selectedItemName, setSelectedItemName] = useState("");

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

  return (
    <main>
      <h1>Shopping List</h1>

      <NewItem onAddItem={handleAddItem} />

      <GroceryItemList
        items={items}
        onItemSelect={(item) => {
          const cleanedName = item.name
            .split(",")[0]
            .replace(/\p{Emoji_Presentation}|\p{Extended_Pictographic}/gu, "")
            .trim();

          setSelectedItemName(cleanedName);
        }}
      />

      {selectedItemName && <MealIdeas ingredient={selectedItemName} />}
    </main>
  );
}
