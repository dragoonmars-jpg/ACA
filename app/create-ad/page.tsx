 "use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAd(){
  const router=useRouter();
  const [form,setForm]=useState({business_name:"",product:"",description:"",target_customer:"",platform:"Instagram",goal:"Get more customers",tone:"Professional"});
  const [result,setResult]=useState<any>(null);
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);

  function update(k:string,v:string){setForm({...form,[k]:v});}

  async function generate(e:React.FormEvent){
    e.preventDefault(); setLoading(true); setError(""); setResult(null);
    try{
      const res=await fetch("/api/generate-ad",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
      const data=await res.json();
      if(!res.ok) throw new Error(data.error || "Generation failed");
      setResult(data.ad);
    }catch(err:any){setError(err.message)}
    finally{setLoading(false)}
  }

  async function save(){
    if(!result) return;
    const res=await fetch("/api/save-ad",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,...result})});
    const data=await res.json();
    if(!res.ok) return setError(data.error||"Could not save");
    router.push("/dashboard");
  }

  return <main className="container section">
    <h1>Create an AI Ad</h1>
    <div className="grid grid-2">
      <form className="card form" onSubmit={generate}>
        <div><label>Business name</label><input value={form.business_name} onChange={e=>update("business_name",e.target.value)} required /></div>
        <div><label>Product / service</label><input value={form.product} onChange={e=>update("product",e.target.value)} required /></div>
        <div><label>Description</label><textarea value={form.description} onChange={e=>update("description",e.target.value)} required /></div>
        <div><label>Target customer</label><input value={form.target_customer} onChange={e=>update("target_customer",e.target.value)} required /></div>
        <div><label>Platform</label><select value={form.platform} onChange={e=>update("platform",e.target.value)}>{["Facebook","Instagram","Google","YouTube","TikTok","Website"].map(x=><option key={x}>{x}</option>)}</select></div>
        <div><label>Goal</label><select value={form.goal} onChange={e=>update("goal",e.target.value)}>{["Get more customers","Sell a product","Generate leads","Promote an event","Build brand awareness"].map(x=><option key={x}>{x}</option>)}</select></div>
        <div><label>Tone</label><select value={form.tone} onChange={e=>update("tone",e.target.value)}>{["Professional","Friendly","Exciting","Luxury","Funny","Simple"].map(x=><option key={x}>{x}</option>)}</select></div>
        {error&&<div className="error">{error}</div>}
        <button className="btn btn-primary" disabled={loading}>{loading?"Generating...":"✨ Generate Ad"}</button>
      </form>

      <div className="card ad-result">
        <h2>Ad Preview</h2>
        {!result ? <p className="muted">Your generated advertisement will appear here.</p> :
          <>
            <span className="badge">{form.platform}</span>
            <h3>{result.campaign_name}</h3>
            <h2>{result.headline}</h2>
            <p>{result.primary_text}</p>
            <p><strong>CTA:</strong> {result.call_to_action}</p>
            <p><strong>Social caption:</strong><br/>{result.social_caption}</p>
            <p><strong>Image direction:</strong><br/>{result.image_prompt}</p>
            <p><strong>Video script:</strong><br/>{result.video_script}</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <button className="btn btn-primary" onClick={save}>Save Ad</button>
              <button className="btn btn-secondary" onClick={()=>navigator.clipboard.writeText(JSON.stringify(result,null,2))}>Copy</button>
              <button className="btn btn-secondary" onClick={()=>{const blob=new Blob([JSON.stringify(result,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="trademind-ad.json";a.click()}}>Download</button>
            </div>
          </>
        }
      </div>
    </div>
  </main>;
}