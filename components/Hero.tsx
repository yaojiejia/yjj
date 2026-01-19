'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) {
      setGreeting('Good morning ☀️ What are we doing today?')
    } else if (hour >= 12 && hour < 17) {
      setGreeting('Good afternoon 🌤️')
    } else if (hour >= 17 && hour < 22) {
      setGreeting('Good evening 🌙')
    } else {
      setGreeting('Hey night owl 🦉')
    }
  }, [])

  return (
    <div className="space-y-3">
      <h1 className="text-2xl">{greeting}</h1>
      <p className="text-muted-foreground">
        Software Engineer & Data Engineer passionate about building scalable systems, optimizing data pipelines, 
        and contributing to open-source projects. Currently pursuing Computer Science and Data Science at NYU.
      </p>
    </div>
  )
}
