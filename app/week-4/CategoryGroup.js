// /app/week-4/categorygroup.js
import items from "./items.json";

function titleCaseCategory(category) {
  // "canned goods" -> "Canned Goods"
  return category
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function CategoryGroup() {
    
  const grouped = items.reduce((acc, item) => {
    const cat = item.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

 
  const categories = Object.keys(grouped).sort((a, b) => a.localeCompare(b));

  
  for (const cat of categories) {
    grouped[cat].sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="border border-slate-700 rounded-lg p-4 space-y-8">
      {categories.map((cat) => (
        <section key={cat}>
          <h2 className="text-xl font-semibold mb-2">
            {titleCaseCategory(cat)}
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            {grouped[cat].map((item) => (
              <li key={item.id} className="text-base">
                {item.name}
                <span className="text-sm text-slate-400">
                  {" "}
                  (qty: {item.quantity})
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}