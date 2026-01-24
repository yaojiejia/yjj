export default function RecommendedWebsites() {
  const websites = [
    {
      title: 'Conventional Commits',
      description: 'A specification for adding human and machine readable meaning to commit messages',
      url: 'https://www.conventionalcommits.org/en/v1.0.0/',
    },
    {
      title: 'Git Internals PDF',
      description: 'A comprehensive PDF explaining the internal workings of the Git source code control system',
      url: 'https://github.com/pluralsight/git-internals-pdf',
    },
  ]

  return (
    <div className="space-y-4">
      <h2>&gt;Check Out These Websites</h2>
      <div className="space-y-3">
        {websites.map((website, index) => (
          <div key={index} className="p-6 border-border border rounded-2xl bg-background/40 hover:bg-background/60 transition-colors">
            <a
              href={website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block space-y-2 group"
            >
              <h3 className="text-lg font-semibold group-hover:underline">
                {website.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {website.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                <span className="truncate">{website.url}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4 flex-shrink-0"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <path d="m15 3 6 6"></path>
                  <path d="M10 14 21 3"></path>
                </svg>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

