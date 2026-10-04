 "use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/browser";

export default function Signup() {
  const router=useRouter();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [message,setMessage]=useState("");

  async function submit(e:React.FormEvent){
    e.preventDefault(); setError(""); setMessage("");
    const supabase=createClient();
    const {data,error}=await supabase.auth.signUp({email,password});
    if(error) return setError(error.message);
    if(data.session) router.push("/dashboard");
    else setMessage("Account created. Check your email if email confirmation is enabled, then log in.");
  }

  return <main className="container section">
    <Link href="/">← Home</Link>
    <div className="card" style={{maxWidth:520,margin:"35px auto"}}>
      <h1>Create account</h1>
      <form className="form" onSubmit={submit}>
        <div><label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></div>
        <div><label>Password</label><input type="password" minLength={8} value={password} onChange={e=>setPassword(e.target.value)} required /></div>
        {error && <div className="error">{error}</div>}
        {message && <div className="success">{message}</div>}
        <button className="btn btn-primary">Create account</button>
      </form>
      <p>Already registered? <Link href="/login">Log in</Link></p>
    </div>
  </main>;
}