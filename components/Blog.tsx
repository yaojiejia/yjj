import Link from 'next/link'

export default function Blog() {
  const posts = [
    {
      title: 'Building Enterprise Data Pipelines: The Medallion Architecture in Fintech',
      excerpt: 'Exploring how Trepp implements the Medallion Architecture (Bronze, Silver, Gold) using AWS Step Functions, Lambda, Apache Spark, and Apache Hudi to process commercial real estate data.',
      date: 'Wednesday, January 15, 2025',
      category: 'Data Engineering',
      href: '/blog/medallion-architecture-fintech',
    },
  ]

  return (
    <>
      <div className="flex justify-between items-center flex-wrap">
        <h2>&gt;Recent Posts</h2>
        <Link href="/blog" className="underline text-muted-foreground hover:text-foreground text-xs flex items-center gap-x-3">
          All Posts
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right size-3" aria-hidden="true">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </Link>
      </div>
      <ul className="space-y-3">
        {posts.map((post, index) => (
          <div key={index} className="space-y-5">
            <div className="space-y-6 p-6 border-border border rounded-2xl bg-background/40">
              <p className="text-sm text-muted-foreground">{post.date}</p>
              <Link href={post.href}>
                <h2 className="text-lg hover:underline">{post.title}</h2>
              </Link>
              <div className="flex flex-col gap-3 mt-5">
                <p className="text-muted-foreground">{post.excerpt}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  {post.category}
                </div>
              </div>
              <div className="flex justify-self-end">
                <Link href={post.href} className="hover:underline w-fit flex items-center gap-x-2">
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right size-4" aria-hidden="true">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </>
  )
}
