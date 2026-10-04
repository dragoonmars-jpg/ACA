import Link from "next/link";

export default function Home() {
  return (
    <>
      <nav className="container nav">
        <div className="brand">TradeMind AI</div>
        <div className="navlinks">
          <Link href="/pricing">Pricing</Link>
          <Link href="/login">Login</Link>
          <Link className="btn btn-primary" href="/signup">Get Started</Link>
        </div>
      </nav>

      <main>
        <section className="hero container">
          <span className="badge">AI MARKETING MVP</span>
          <h1>Create professional ads with AI.</h1>
          <p>
            Describe your business, product, audience and goal. TradeMind AI
            generates ad copy, calls to action, social captions and creative
            directions in seconds.
          </p>
          <Link className="btn btn-primary" href="/signup">Create Your First Ad</Link>
        </section>

        <section className="section container">
          <div className="grid grid-3">
            {[
              ["🤖 AI Ad Generator", "Generate headlines, ad copy, CTAs and social captions."],
              ["🗂️ Save Your Ads", "Keep your generated campaigns in one dashboard."],
              ["💳 Credit Model", "Start with credits and later add subscriptions and paid AI usage."]
            ].map(([title, body]) => (
              <div className="card" key={title}>
                <h3>{title}</h3><p className="muted">{body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">TradeMind AI MVP • Educational/demo software.</div>
      </footer>
    </>
  );
}