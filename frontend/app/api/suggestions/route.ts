import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { scores } = await req.json()

    const prompt = `
You're an AI consultant. Based on the following audit scores, suggest clear, professional, client-friendly improvements.

Only list recommendations for categories scoring below 90%. Use bullet points. Be concise and easy to understand.

Scores:
- Performance: ${Math.round(scores.performance * 100)}%
- SEO: ${Math.round(scores.seo * 100)}%
- Accessibility: ${Math.round(scores.accessibility * 100)}%
- Best Practices: ${Math.round(scores.bestPractices * 100)}%

Respond in bullet format only. Example: 
- Improve load speed by compressing images.
- Add meta descriptions for SEO.
    `

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
    })

    const message = completion.choices[0].message.content
    return NextResponse.json({ message })
  } catch (err) {
    console.error('AI Error:', err)
    return NextResponse.json({ error: 'AI suggestion failed.' }, { status: 500 })
  }
}
