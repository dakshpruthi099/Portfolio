import { NextApiResponse } from 'next'
import { NextApiRequest } from 'next'

type LimitRecord = {
  count: number
  lastReset: number
}

const rateLimit = new Map<string, LimitRecord>()
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const MAX_REQUESTS = 100

export function chatLimiter(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
  return async function withRateLimit(req: NextApiRequest, res: NextApiResponse) {
    // Get IP from various possible headers
    const ip = 
      req.headers['x-forwarded-for'] as string || 
      req.socket.remoteAddress || 
      'unknown'
    
    const now = Date.now()
    const record = rateLimit.get(ip) || { count: 0, lastReset: now }

    // Reset count if window has passed
    if (now - record.lastReset > WINDOW_MS) {
      record.count = 0
      record.lastReset = now
    }

    // Increment count
    record.count++
    rateLimit.set(ip, record)

    // Check if over limit
    if (record.count > MAX_REQUESTS) {
      return res.status(429).json({ 
        error: 'Too many requests, please try again later.' 
      })
    }

    // Call the actual handler
    return handler(req, res)
  }
} 