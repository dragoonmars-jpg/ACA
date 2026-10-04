import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) return NextResponse.json({error:"Unauthorized"},{status:401});

  const body=await req.json();
  const {error}=await supabase.from("ads").insert({
    user_id:user.id,
    business_name:body.business_name,
    product:body.product,
    description:body.description,
    target_customer:body.target_customer,
    platform:body.platform,
    goal:body.goal,
    tone:body.tone,
    campaign_name:body.campaign_name,
    headline:body.headline,
    primary_text:body.primary_text,
    call_to_action:body.call_to_action,
    social_caption:body.social_caption,
    image_prompt:body.image_prompt,
    video_script:body.video_script
  });
  if(error) return NextResponse.json({error:error.message},{status:400});
  return NextResponse.json({ok:true});
}