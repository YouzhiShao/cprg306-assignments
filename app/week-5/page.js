import NewItem from "./NewItem";

export const metadata = {
  title: "Week 5 – Interactivity with Forms",
  description: "React controlled form with name, quantity, and category.",
};

export default function page() {
  return (
    <main
      style={{
        padding: "2rem",
        fontFamily: "system-ui, Arial, sans-serif",
        maxWidth: 720,
      }}
    >
      <h1 style={{ marginBottom: "1rem" }}>Week 5 Assignment</h1>
      <p style={{ color: "#444", marginBottom: "2rem" }}>
        Complete the <code>NewItem</code> component using React{" "}
        <code>useState</code> and a controlled form.
      </p>

      <section className="card p-5">
        <NewItem />
      </section>
    </main>
  );
}
