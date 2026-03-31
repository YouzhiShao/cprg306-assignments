// shopping-list-service.js
// Service layer for interacting with Firestore shopping list data

import { db } from "../../utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

/**
 * Get all shopping list items for a specific user
 * @param {string} userId - Firebase Authentication user uid
 * @returns {Promise<Array>} - Array of shopping list items
 */
export async function getItems(userId) {
  if (!userId) {
    return [];
  }

  try {
    // Reference: users/{userId}/items
    const itemsRef = collection(db, "users", userId, "items");

    const q = query(itemsRef);
    const querySnapshot = await getDocs(q);

    const items = [];

    querySnapshot.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return items;
  } catch (error) {
    console.error("Error getting items:", error);
    return [];
  }
}

/**
 * Add a new shopping list item for a specific user
 * @param {string} userId - Firebase Authentication user uid
 * @param {Object} item - Shopping list item data
 * @returns {Promise<string|null>} - The newly created document ID
 */
export async function addItem(userId, item) {
  if (!userId) {
    return null;
  }

  try {
    // Reference: users/{userId}/items
    const itemsRef = collection(db, "users", userId, "items");

    const docRef = await addDoc(itemsRef, item);

    return docRef.id;
  } catch (error) {
    console.error("Error adding item:", error);
    return null;
  }
}
