export default function ProfileSection() {
  return (
    <div className="flex items-start gap-8">
      <div className="relative shrink-0">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-0.5">
          <div className="w-full h-full bg-background rounded-full"></div>
        </div>
        <div className="relative size-24 rounded-full ring-[3px] ring-background overflow-hidden">
          <img 
            src="/pfp.jpg" 
            alt="Alex Jia" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1.5">
          <h1 className="text-foreground text-xl font-semibold">Alex Jia</h1>
        </div>
        <p className="text-foreground/90 text-sm leading-relaxed">
          Software Engineer & Data Engineer | Computer Science & Data Science at NYU
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-3.5 h-3.5" aria-hidden="true">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>New York, NY</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-link w-3.5 h-3.5" aria-hidden="true">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            <a href="https://github.com/yaojiejia" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              github.com/yaojiejia
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar w-3.5 h-3.5" aria-hidden="true">
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
            </svg>
            <span>Since 2022</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {['Python', 'Java', 'TypeScript', 'AWS', 'Data Engineering'].map((tech) => (
            <span key={tech} className="px-3 py-1 bg-muted/50 hover:bg-muted text-foreground/80 text-xs rounded-full transition-colors">
              #{tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

