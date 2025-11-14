import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'

type AnalysisResponse = {
  analysis_score: number
  labels: string[]
  explanation: string
  recommended_action: string
}

type ErrorResponse = {
  error: string
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AnalysisResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const mockAnalysis = generateMockAnalysis()

    const userId = req.headers['x-user-id'] as string | null

    if (userId) {
      await supabase.from('analysis_results').insert({
        user_id: userId,
        image_url: null,
        analysis_score: mockAnalysis.analysis_score,
        labels: mockAnalysis.labels,
        explanation: mockAnalysis.explanation,
        recommended_action: mockAnalysis.recommended_action,
        consented: true,
      })
    }

    res.status(200).json(mockAnalysis)
  } catch (error: any) {
    console.error('Analysis error:', error)
    res.status(500).json({ error: 'Failed to analyze screenshot' })
  }
}

function generateMockAnalysis(): AnalysisResponse {
  const scenarios = [
    {
      analysis_score: 85,
      labels: ['phishing', 'urgent-language', 'suspicious-link'],
      explanation:
        'This message contains multiple red flags commonly found in phishing scams. It uses urgent language to pressure you into acting quickly, includes a suspicious link, and asks for personal information. The sender is likely not who they claim to be.',
      recommended_action:
        'Do not click any links or respond to this message. Delete it immediately and block the sender. If this claims to be from your bank or a company you use, contact them directly using the phone number on their official website.',
    },
    {
      analysis_score: 25,
      labels: ['legitimate', 'known-sender'],
      explanation:
        'This message appears to be legitimate. It comes from a known sender with no suspicious patterns or requests. The language is professional and doesn\'t pressure you into immediate action.',
      recommended_action:
        'This message appears safe. If you\'re still uncertain, verify the sender by contacting them through a known phone number or email address.',
    },
    {
      analysis_score: 65,
      labels: ['suspicious-request', 'urgency', 'prize-claim'],
      explanation:
        'This message claims you\'ve won a prize or need to claim something urgently. Legitimate prizes don\'t require personal information or payment upfront. The pressure to act quickly is a common scam tactic.',
      recommended_action:
        'Be very cautious. Do not provide any personal information or payment. If this is supposedly from a legitimate company, contact them directly through their official website or phone number to verify.',
    },
  ]

  const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)]
  return randomScenario
}
