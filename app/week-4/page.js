
// /app/week-4/page.js

import GroceryItemList from "./GroceryItemList";
import  CategoryGroup from "./CategoryGroup";

export default function Page() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Shopping List</h1>
      <GroceryItemList />
      <CategoryGroup />
    </main>
  );
}
