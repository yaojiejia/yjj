export default function AboutPosts() {
  const posts = [
    {
      content: (
        <>
          <b>Computer Science & Data Science student at New York University</b> with a passion for building scalable systems and optimizing data pipelines. I'm involved as <b>Lead Dev of BUGS Open Source Club</b> and <b>VP of Machine Learning Club</b>, with <b>4x Hackathon Wins</b>. I enjoy designing solid <b>architectures</b> and applying <b>best practices</b> to keep projects organized and scalable.
        </>
      ),
    },
    {
      content: (
        <>
          I've worked on <b>data engineering</b> projects at companies like Trepp and NYU Berkley Center, processing millions of records and optimizing ETL pipelines. My experience includes building real-time PySpark pipelines, optimizing AWS infrastructure, and contributing to open-source projects like SQLancer through <b>Google Summer of Code</b>.
        </>
      ),
    },
    {
      content: (
        <>
          I'm currently diving into <b>infrastructure automation</b> and <b>AI-powered systems</b>, building tools like FastAWS that leverage RAG and LangGraph for intelligent infrastructure planning. I'm always looking to <b>improve</b>, discover new tools, and grow through every project I build, whether it's optimizing data pipelines or contributing to open-source.
        </>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <div key={index} className="border border-border rounded-2xl p-4 bg-background/40">
          <div className="flex items-start gap-3 mb-3">
            <div className="relative">
              <div className="size-10 rounded-full overflow-hidden ring-2 ring-background">
                <img 
                  src="/pfp.jpg" 
                  alt="Alex Jia" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-background"></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <p className="text-sm font-semibold">alexjia</p>
                  <p className="text-xs text-muted-foreground">Software Engineer & Data Engineer</p>
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                  <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4">
                    <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed mb-4">
            {post.content}
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-4">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"></path>
                </svg>
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                  <path d="m22 2-7 20-4-9-9-4Z"></path>
                  <path d="M22 2 11 13"></path>
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">2 hours ago</span>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

