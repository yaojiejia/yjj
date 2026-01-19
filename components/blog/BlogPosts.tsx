import Link from 'next/link'

interface BlogPost {
  id: number
  date: string
  title: string
  description: string
  tags: string[]
  slug: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    date: '2025-01-15',
    title: 'Building Enterprise Data Pipelines: The Medallion Architecture in Fintech',
    description: 'Exploring how Trepp implements the Medallion Architecture (Bronze, Silver, Gold) using AWS Step Functions, Lambda, Apache Spark, and Apache Hudi to process commercial real estate data.',
    tags: ['Data Engineering', 'Backend Development'],
    slug: 'medallion-architecture-fintech',
  },
  {
    id: 2,
    date: new Date().toISOString().split('T')[0],
    title: 'Getting Started with Open Source Contributions Through GSoC',
    description: 'A guide to participating in Google Summer of Code, including timeline insights, community engagement strategies, and tips for writing a strong proposal that gets accepted.',
    tags: ['Open Source', 'Career Development'],
    slug: 'getting-started-with-gsoc',
  },
]

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
  const dayName = days[date.getDay()]
  const monthName = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()
  
  return `${dayName}, ${monthName} ${day}, ${year}`
}

interface BlogPostsProps {
  selectedCategory: string
}

export default function BlogPosts({ selectedCategory }: BlogPostsProps) {
  const filteredPosts =
    selectedCategory === 'All categories'
      ? blogPosts
      : blogPosts.filter((post) => post.tags.includes(selectedCategory))

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No posts found in this category.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {filteredPosts.map((post) => (
        <article
          key={post.id}
          className="border border-border rounded-2xl p-6 bg-background/40 hover:bg-background/60 transition-colors"
        >
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {formatDate(post.date)}
            </p>
            <div>
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-xl font-semibold hover:underline mb-2">
                  {post.title}
                </h2>
              </Link>
              <p className="text-muted-foreground leading-relaxed">
                {post.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="pt-2">
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-sm hover:underline"
              >
                Read More
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
                  className="size-4"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

