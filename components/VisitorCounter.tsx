'use client'

import { useEffect, useState } from 'react'

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Generate a unique session ID for this visit
        let sessionId = localStorage.getItem('visitorSessionId')
        if (!sessionId) {
          sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
          localStorage.setItem('visitorSessionId', sessionId)
        }

        // Check if this session has already been counted today
        const lastCounted = localStorage.getItem('lastCountedDate')
        const today = new Date().toDateString()
        
        if (lastCounted !== today) {
          // Increment visitor count
          const response = await fetch('/api/visitors', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionId }),
          })
          
          if (response.ok) {
            const data = await response.json()
            setCount(data.count)
            localStorage.setItem('lastCountedDate', today)
          }
        } else {
          // Just fetch the current count
          const response = await fetch('/api/visitors')
          if (response.ok) {
            const data = await response.json()
            setCount(data.count)
          }
        }
      } catch (error) {
        console.error('Error tracking visitor:', error)
      } finally {
        setIsLoading(false)
      }
    }

    trackVisitor()
  }, [])

  if (isLoading) {
    return (
      <div className="text-sm text-muted-foreground">
        <span className="animate-pulse">Loading visitors...</span>
      </div>
    )
  }

  return (
    <div className="text-sm text-muted-foreground">
      <span className="font-medium text-foreground">{count?.toLocaleString() || '0'}</span> visitors
    </div>
  )
}

