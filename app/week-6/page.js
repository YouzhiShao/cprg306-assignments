import NewItem from "./NewItem";

export default function page() {
  return (
    <main
      style={{
        padding: "2rem",
        fontFamily: "system-ui, Arial, sans-serif",
        maxWidth: 720,
      }}
    >
      <h1 className="font-bold ">Week 6 Assignment</h1>
      <section className="card p-5">
        <NewItem />
      </section>
    </main>
  );
}
