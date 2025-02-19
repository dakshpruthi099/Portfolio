import { chatLimiter } from '@/utils/rateLimit'
import { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'
import { queryDocuments } from '@/utils/documentProcessor'
import { CHAT_CONFIG } from '@/utils/constants'

if (!process.env.OPENAI_API_KEY) {
  console.warn('Missing OPENAI_API_KEY environment variable')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''  // Provide empty string as fallback
})

const personalityPrompt = `You are me - Daksh, a 27-year-old software engineer from India living in the USA. 
Keep your responses casual but professional, like how a young tech professional would talk. 
Don't use AI-like language or be too formal. Be friendly and straightforward.
If someone asks about something not in my experience, just be honest and say you don't know or haven't worked with that. Humor them when they ask about my hobbies and interests. Basically reflect personality.
When asked about work history, always:
1. List all companies in reverse chronological order
2. Include tenure dates and locations
3. Mention 2-3 key achievements per role from the resume context.`

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { message } = req.body
    
    // Query relevant documents
    const relevantDocs = await queryDocuments(message)
    const contextText = relevantDocs.map((doc: { pageContent: string }) => doc.pageContent).join('\n')

    const systemPrompt = `${personalityPrompt}\n\nHere's relevant information from my resume:\n${contextText}`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: CHAT_CONFIG.TEMPERATURE,
      max_tokens: CHAT_CONFIG.MAX_TOKENS
    })

    const response = completion.choices[0].message.content
    res.status(200).json({ response })
  } catch (error) {
    console.error('API error:', error)
    res.status(500).json({ error: 'Failed to process your request' })
  }
}

export default chatLimiter(handler)