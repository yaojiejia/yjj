'use client'

import { useState } from 'react'

interface BlogHeaderProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function BlogHeader({ selectedCategory, onCategoryChange }: BlogHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const categories = [
    'All categories',
    'Artificial Intelligence',
    'Frontend Development',
    'Backend Development',
    'Data Engineering',
    'Tools & Frameworks',
    'Opinions',
    'Open Source',
    'Career Development',
  ]

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category)
    setIsOpen(false)
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold mb-2">Blog</h1>
        <p className="text-muted-foreground">
          Discover my posts about tech, programming, AI, opinions, etc.
        </p>
      </div>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-background/40 hover:bg-background/60 transition-colors"
        >
          <span>{selectedCategory}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-56 border border-border rounded-lg bg-background shadow-lg z-10">
            <ul className="py-2">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => handleCategorySelect(category)}
                    className={`w-full text-left px-4 py-2 hover:bg-muted transition-colors text-sm ${
                      selectedCategory === category ? 'bg-muted' : ''
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

