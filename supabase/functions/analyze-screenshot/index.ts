import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface AnalysisResponse {
  analysis_score: number;
  labels: string[];
  explanation: string;
  recommended_action: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authorization header required" }),
        {
          status: 401,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid authentication" }),
        {
          status: 401,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const mockAnalysis = generateMockAnalysis();

    await supabase.from("analysis_results").insert({
      user_id: user.id,
      image_url: null,
      analysis_score: mockAnalysis.analysis_score,
      labels: mockAnalysis.labels,
      explanation: mockAnalysis.explanation,
      recommended_action: mockAnalysis.recommended_action,
      consented: true,
    });

    return new Response(JSON.stringify(mockAnalysis), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error("Analysis error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to analyze screenshot" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});

function generateMockAnalysis(): AnalysisResponse {
  const scenarios = [
    {
      analysis_score: 85,
      labels: ["phishing", "urgent-language", "suspicious-link"],
      explanation:
        "This message contains multiple red flags commonly found in phishing scams. It uses urgent language to pressure you into acting quickly, includes a suspicious link, and asks for personal information. The sender is likely not who they claim to be.",
      recommended_action:
        "Do not click any links or respond to this message. Delete it immediately and block the sender. If this claims to be from your bank or a company you use, contact them directly using the phone number on their official website.",
    },
    {
      analysis_score: 25,
      labels: ["legitimate", "known-sender"],
      explanation:
        "This message appears to be legitimate. It comes from a known sender with no suspicious patterns or requests. The language is professional and doesn't pressure you into immediate action.",
      recommended_action:
        "This message appears safe. If you're still uncertain, verify the sender by contacting them through a known phone number or email address.",
    },
    {
      analysis_score: 65,
      labels: ["suspicious-request", "urgency", "prize-claim"],
      explanation:
        "This message claims you've won a prize or need to claim something urgently. Legitimate prizes don't require personal information or payment upfront. The pressure to act quickly is a common scam tactic.",
      recommended_action:
        "Be very cautious. Do not provide any personal information or payment. If this is supposedly from a legitimate company, contact them directly through their official website or phone number to verify.",
    },
  ];

  const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
  return randomScenario;
}
