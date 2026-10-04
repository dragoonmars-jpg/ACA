 "use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/browser";

export default function Login() {
  const router = useRouter();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setError("");
    const supabase=createClient();
    const {error}=await supabase.auth.signInWithPassword({email,password});
    if(error) return setError(error.message);
    router.push("/dashboard");
    router.refresh();
  }

  return <main className="container section">
    <Link href="/">← Home</Link>
    <div className="card" style={{maxWidth:520,margin:"35px auto"}}>
      <h1>Log in</h1>
      <form className="form" onSubmit={submit}>
        <div><label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></div>
        <div><label>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></div>
        {error && <div className="error">{error}</div>}
        <button className="btn btn-primary">Log in</button>
      </form>
      <p>Don't have an account? <Link href="/signup">Sign up</Link></p>
    </div>
  </main>;
}