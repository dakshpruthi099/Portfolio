import { processDocument } from '@/utils/documentProcessor'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    await processDocument()
    res.status(200).json({ message: 'Resume processed successfully' })
  } catch (error) {
    console.error('Processing error:', error)
    res.status(500).json({ error: 'Failed to process resume' })
  }
}