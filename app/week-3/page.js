// /app/week-3/page.js

import GroceryItemList from "./GroceryItemList";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-semibold">Shopping List</h1>
        <GroceryItemList />
      </div>
    </main>
  );
}
