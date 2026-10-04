import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Dashboard() {
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) redirect("/login");

  const {data:profile}=await supabase.from("profiles").select("credits,plan").eq("id",user.id).single();
  const {data:ads}=await supabase.from("ads").select("*").eq("user_id",user.id).order("created_at",{ascending:false}).limit(10);

  return <main className="container section">
    <div className="nav">
      <div className="brand">TradeMind AI</div>
      <form action="/api/logout" method="post"><button className="btn btn-secondary">Logout</button></form>
    </div>
    <h1>Dashboard</h1>
    <p className="muted">Signed in as {user.email}</p>
    <div className="grid grid-3">
      <div className="card"><h3>Credits</h3><h2>{profile?.credits ?? 10}</h2></div>
      <div className="card"><h3>Plan</h3><h2>{profile?.plan ?? "free"}</h2></div>
      <div className="card"><h3>Actions</h3><Link className="btn btn-primary" href="/create-ad">+ Create Ad</Link></div>
    </div>
    <section className="section">
      <h2>Recent Ads</h2>
      <div className="grid">
        {(ads ?? []).map((ad:any)=><div className="card" key={ad.id}>
          <span className="badge">{ad.platform}</span>
          <h3>{ad.campaign_name}</h3>
          <p>{ad.headline}</p>
          <p className="muted">{new Date(ad.created_at).toLocaleString()}</p>
        </div>)}
        {!ads?.length && <p className="muted">No ads yet. Create your first one.</p>}
      </div>
    </section>
  </main>;
}