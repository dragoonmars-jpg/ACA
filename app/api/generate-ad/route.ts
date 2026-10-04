import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/lib/supabase/server";

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured. Add it to your .env.local file.");
  }

  return new OpenAI({ apiKey });
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({error:"You must be logged in."},{status:401});

    const body = await req.json();
    const required = ["business_name","product","description","target_customer","platform","goal","tone"];
    for (const field of required) {
      if (!body[field] || typeof body[field] !== "string") {
        return NextResponse.json({error:`Missing field: ${field}`},{status:400});
      }
    }

    const {data:profile}=await supabase.from("profiles").select("credits").eq("id",user.id).single();
    if ((profile?.credits ?? 0) < 1) return NextResponse.json({error:"Not enough credits."},{status:402});

    const prompt = `
You are an advertising copywriter. Create a truthful, persuasive advertisement.
Do not invent prices, guarantees, certifications, testimonials, medical outcomes,
financial returns, or other facts not supplied by the user. If a claim is not
supported, omit it. Return ONLY valid JSON with these exact keys:
campaign_name, headline, primary_text, call_to_action, social_caption,
image_prompt, video_script.

Business: ${body.business_name}
Product/service: ${body.product}
Description: ${body.description}
Target customer: ${body.target_customer}
Platform: ${body.platform}
Goal: ${body.goal}
Tone: ${body.tone}
`;

    const client = getOpenAIClient();
    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: prompt
    });

    const text = response.output_text.trim().replace(/^```json\s*/,"").replace(/```$/,"").trim();
    const ad = JSON.parse(text);

    await supabase.from("profiles").update({credits:(profile?.credits ?? 1)-1}).eq("id",user.id);
    await supabase.from("ai_usage").insert({user_id:user.id,action:"generate_ad",credits_used:1});

    return NextResponse.json({ad});
  } catch (e:any) {
    return NextResponse.json({error:e.message || "AI generation failed."},{status:500});
  }
}