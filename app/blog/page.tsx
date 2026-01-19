'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BlogHeader from '@/components/blog/BlogHeader'
import BlogPosts from '@/components/blog/BlogPosts'

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All categories')

  return (
    <main>
      <Navbar />
      <div className="flex-1 container">
        <div className="space-y-8 py-8">
          <BlogHeader selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
          <BlogPosts selectedCategory={selectedCategory} />
        </div>
      </div>
      <Footer />
    </main>
  )
}

