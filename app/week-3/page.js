
// /app/week-3/page.js

import GroceryItemList from "./GroceryItemList";

export default function Page() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Shopping List</h1>
      <GroceryItemList />
    </main>
  );
}
