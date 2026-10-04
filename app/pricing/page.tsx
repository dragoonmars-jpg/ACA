import Link from "next/link";

const plans = [
  ["Free", "$0", "10 starter credits"],
  ["Pro", "$9.99/mo", "100 credits/month"],
  ["Business", "$29.99/mo", "500 credits/month"]
];

export default function Pricing() {
  return (
    <main className="container section">
      <Link href="/">← Home</Link>
      <h1>Pricing</h1>
      <p className="muted">These are placeholder prices for the MVP.</p>
      <div className="grid grid-3">
        {plans.map(([name, price, detail]) => (
          <div className="card" key={name}>
            <h2>{name}</h2><h3>{price}</h3><p>{detail}</p>
            <Link className="btn btn-primary" href="/signup">Start</Link>
          </div>
        ))}
      </div>
    </main>
  );
}