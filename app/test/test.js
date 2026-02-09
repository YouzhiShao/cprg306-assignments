"use client";

import { useState } from "react";

// Sample data for filtering exercise
const products = [
  { id: 1, name: "Laptop", category: "electronics", price: 999 },
  { id: 2, name: "Desk Chair", category: "furniture", price: 199 },
  { id: 3, name: "Notebook", category: "stationery", price: 5 },
  { id: 4, name: "Headphones", category: "electronics", price: 149 },
  { id: 5, name: "Desk Lamp", category: "furniture", price: 45 },
  { id: 6, name: "Pen Set", category: "stationery", price: 12 },
];

export default function StateEventsLab() {
  // PROBLEM 1: counter state
  const [count, setCount] = useState(0);

  // PROBLEM 2: disabled state for counter buttons
  const [isDisabled, setIsDisabled] = useState(false);

  // PROBLEM 3: theme toggle state (light/dark)
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // PROBLEM 4: filtered products state (start with all)
  const [displayedProducts, setDisplayedProducts] = useState(products);

  // PROBLEM 5: show/hide content state
  const [showDetails, setShowDetails] = useState(false);

  // PROBLEM 4: filter function
  const filterByCategory = (category) => {
    if (category === "all") {
      setDisplayedProducts(products);
      return;
    }
    setDisplayedProducts(products.filter((p) => p.category === category));
  };

  return (
    <div className="p-8 space-y-12">
      <h1 className="text-3xl font-bold mb-8">State and Events Lab</h1>

      {/* PROBLEM 1 & 2: Counter with Increase/Decrease + Disabled State */}
      <section className="border p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          Problems 1 &amp; 2: Counter with Disable
        </h2>
        <p className="text-gray-600 mb-2">
          <strong>Problem 1:</strong> Create a counter that displays a number and
          has buttons to increase and decrease it.
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Problem 2:</strong> Add a checkbox that disables/enables the
          counter buttons.
        </p>

        {/* Problem 2: checkbox controls disabled status */}
        <div className="mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isDisabled}
              onChange={(e) => setIsDisabled(e.target.checked)}
            />
            <span>Disable counter buttons</span>
          </label>
        </div>

        {/* Problem 1: display counter */}
        <div className="text-2xl mb-4">Count: {count}</div>

        {/* Problem 1: onClick handlers + Problem 2: disabled */}
        <div className="space-x-2">
          <button
            type="button"
            disabled={isDisabled}
            onClick={() => setCount((prev) => prev + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Increase
          </button>
          <button
            type="button"
            disabled={isDisabled}
            onClick={() => setCount((prev) => prev - 1)}
            className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Decrease
          </button>
        </div>
      </section>

      {/* PROBLEM 3: Theme Toggle on Card */}
      <section className="border p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Problem 3: Theme Toggle</h2>
        <p className="text-gray-600 mb-4">
          Toggle between two different color themes for the card below.
        </p>

        {/* Conditionally apply classes based on theme */}
        <div
          className={[
            "p-6 rounded-lg transition-colors",
            isDarkTheme
              ? "bg-slate-900 text-slate-100"
              : "bg-slate-100 text-slate-900",
          ].join(" ")}
        >
          <h3 className="text-lg font-semibold mb-2">Sample Card</h3>
          <p>This card should change colors when you click the button.</p>
        </div>

        {/* Toggle theme */}
        <button
          type="button"
          onClick={() => setIsDarkTheme((prev) => !prev)}
          className="mt-4 px-4 py-2 bg-purple-500 text-white rounded"
        >
          Toggle Theme
        </button>
      </section>

      {/* PROBLEM 4: Filter Array by Category */}
      <section className="border p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Problem 4: Filter Products</h2>
        <p className="text-gray-600 mb-4">
          When a category button is clicked, display only products from that
          category. The "All" button should display all products.
        </p>

        <div className="space-x-2 mb-4">
          <button
            type="button"
            onClick={() => filterByCategory("all")}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => filterByCategory("electronics")}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Electronics
          </button>
          <button
            type="button"
            onClick={() => filterByCategory("furniture")}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Furniture
          </button>
          <button
            type="button"
            onClick={() => filterByCategory("stationery")}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Stationery
          </button>
        </div>

        {/* Map over state variable and display products */}
        <div className="space-y-2">
          {displayedProducts.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            displayedProducts.map((product) => (
              <div key={product.id} className="p-3 bg-gray-50 rounded">
                <span className="font-semibold">{product.name}</span> -{" "}
                <span className="text-gray-600">{product.category}</span> -{" "}
                <span className="text-green-600">${product.price}</span>
              </div>
            ))
          )}
        </div>
      </section>

      {/* PROBLEM 5: Show/Hide Content Toggle */}
      <section className="border p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          Problem 5: Show/Hide Toggle
        </h2>
        <p className="text-gray-600 mb-4">
          Create a button that shows and hides the content below. The button text
          should change based on whether content is visible.
        </p>

        <button
          type="button"
          onClick={() => setShowDetails((prev) => !prev)}
          className="px-4 py-2 bg-indigo-500 text-white rounded mb-4"
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </button>

        {/* Conditional rendering */}
        {showDetails && (
          <div className="p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded">
            <h3 className="font-semibold mb-2">Hidden Content</h3>
            <p>
              This content should toggle on and off when you click the button
              above.
            </p>
            <p className="text-sm text-gray-600 mt-2">
              This pattern is commonly used for FAQs, expandable sections, and
              accordions.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}