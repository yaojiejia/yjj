import { NextResponse } from 'next/server'

// Fallback in-memory storage (will reset on serverless cold starts)
// For production persistence, set up Vercel KV or a database
let fallbackCount = 0
const fallbackSessions = new Set<string>()

async function getVisitorCount(): Promise<number> {
  try {
    // Try to use Vercel KV if available
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const { kv } = await import('@vercel/kv')
      const count = await kv.get<number>('visitor_count')
      return count || 0
    }
  } catch (error) {
    console.error('KV error:', error)
  }
  // Fallback to in-memory for local development
  return fallbackCount
}

async function incrementVisitorCount(sessionId: string): Promise<number> {
  try {
    // Try to use Vercel KV if available
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const { kv } = await import('@vercel/kv')
      const exists = await kv.sismember('visitor_sessions', sessionId)
      if (!exists) {
        await kv.sadd('visitor_sessions', sessionId)
        const newCount = await kv.incr('visitor_count')
        return newCount
      }
      return await getVisitorCount()
    }
  } catch (error) {
    console.error('KV error:', error)
  }
  
  // Fallback to in-memory for local development
  if (!fallbackSessions.has(sessionId)) {
    fallbackSessions.add(sessionId)
    fallbackCount++
  }
  return fallbackCount
}

export async function GET() {
  try {
    const count = await getVisitorCount()
    return NextResponse.json({ count })
  } catch (error) {
    console.error('Error getting visitor count:', error)
    return NextResponse.json({ count: 0 }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json()
    
    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }
    
    const count = await incrementVisitorCount(sessionId)
    
    return NextResponse.json({ count, success: true })
  } catch (error) {
    console.error('Error updating visitor count:', error)
    return NextResponse.json({ error: 'Failed to update visitor count' }, { status: 500 })
  }
}

