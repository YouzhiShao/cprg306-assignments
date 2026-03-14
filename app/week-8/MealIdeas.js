"use client";
import { useEffect, useMemo, useState } from "react";

/** Extract a simple ingredient keyword from a raw item name. */
function normalizeIngredient(raw) {
  if (!raw) return "";

  // Lowercase
  const lower = raw.toLowerCase();

  // Keep only letters & spaces (remove punctuation, digits, emoji)
  const lettersOnly = lower.replace(/[^\p{L}\s]/gu, " ");

  // Tokenize
  const tokens = lettersOnly.split(/\s+/).filter(Boolean);

  // Stop words that TERMINATE the phrase when encountered
  // (Units / packaging / quantities, etc.)
  // NOTE: 'breasts' has been REMOVED per your requirement.
  const stopWords = new Set([
    "kg",
    "g",
    "l",
    "ml",
    "dozen",
    "pack",
    "packs",
    "packet",
    "packets",
    "bottle",
    "bottles",
    "jar",
    "jars",
    "can",
    "cans",
    "box",
    "boxes",
    "lb",
    "lbs",
    "oz",
    "ounce",
    "ounces",
    "grams",
    "gram",
    "litre",
    "liter",
    "liters",
    "litres",
    // optional descriptors you still want to STOP on:
    // "fillet", "fillets", "frozen", "fresh", "large", "small", "medium", "sliced", "boneless", "thighs"
    // If you prefer to KEEP these, remove them from the set.
  ]);

  const result = [];
  for (const t of tokens) {
    // If token is a unit/quantity/packaging word -> stop collecting
    if (stopWords.has(t)) break;

    // If token is numeric (safety) -> stop collecting
    if (/^\d+$/.test(t)) break;

    // Otherwise collect as an ingredient word
    result.push(t);

    // Keep at most TWO tokens (e.g., "chicken breasts")
    if (result.length === 2) break;
  }

  // Fallback: if nothing collected, return the first token (or empty)
  return result.length > 0 ? result.join(" ") : tokens[0] || "";
}

/** Fetch meals by ingredient (TheMealDB) */
async function fetchMealIdeas(ingredient) {
  if (!ingredient) return [];
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
    ingredient,
  )}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch meals: ${res.status}`);
  const data = await res.json();
  return Array.isArray(data.meals) ? data.meals : [];
}

/** (Optional) fetch detail to list ingredients */
async function fetchMealDetail(idMeal) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(
    idMeal,
  )}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch meal detail: ${res.status}`);
  const data = await res.json();
  return data?.meals?.[0] ?? null;
}

export default function MealIdeas({ ingredient }) {
  const normalized = useMemo(
    () => normalizeIngredient(ingredient),
    [ingredient],
  );

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [openId, setOpenId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      setMeals([]);
      setOpenId(null);
      setDetail(null);
      try {
        const list = await fetchMealIdeas(normalized);
        if (!cancelled) setMeals(list);
      } catch (e) {
        if (!cancelled) setError(e.message || "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [normalized]);

  async function toggleDetail(id) {
    if (openId === id) {
      setOpenId(null);
      setDetail(null);
      setDetailError("");
      return;
    }
    setOpenId(id);
    setDetail(null);
    setDetailError("");
    setDetailLoading(true);
    try {
      const d = await fetchMealDetail(id);
      setDetail(d);
    } catch (e) {
      setDetailError(e.message || "Unknown error");
    } finally {
      setDetailLoading(false);
    }
  }

  return (
    <aside aria-label="Meal ideas panel" className="p-4">
      <h2 className="text-lg font-semibold mb-3">
        Meal ideas{normalized ? ` for “${normalized}”` : ""}
      </h2>

      {!normalized && (
        <p className="text-gray-500">Select an item on the left.</p>
      )}
      {loading && <p>Loading meals...</p>}
      {error && <p className="text-red-600">Failed to load: {error}</p>}
      {!loading && !error && normalized && meals.length === 0 && (
        <p>No meals found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {meals.map((m) => (
          <button
            key={m.idMeal}
            type="button"
            onClick={() => toggleDetail(m.idMeal)}
            className="text-left px-3 py-2 border rounded hover:bg-gray-50"
            title="Click to toggle ingredients"
          >
            {m.strMeal}
            {openId === m.idMeal && (
              <div className="mt-2 text-sm">
                {detailLoading && <p>Loading ingredients…</p>}
                {detailError && <p className="text-red-600">{detailError}</p>}
                {detail && (
                  <ul className="list-disc ml-5">
                    {Array.from({ length: 20 })
                      .map((_, i) => i + 1)
                      .map((i) => {
                        const ing = detail[`strIngredient${i}`];
                        const mea = detail[`strMeasure${i}`];
                        return ing ? (
                          <li key={i}>
                            {ing} {mea ? `— ${mea}` : ""}
                          </li>
                        ) : null;
                      })}
                  </ul>
                )}
              </div>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
}
