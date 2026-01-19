import Link from 'next/link'

interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  technologies: string[]
  links: {
    github?: string
    demo?: string
    details?: string
  }
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="border border-border rounded-2xl p-6 bg-background/40 hover:bg-background/60 transition-colors">
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
          <p className="text-muted-foreground mb-3">{project.subtitle}</p>
          <p className="text-foreground/90 leading-relaxed">{project.description}</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-2">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:underline"
            >
              GitHub
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
                className="size-4"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <path d="m15 3 6 6"></path>
                <path d="M10 14 21 3"></path>
              </svg>
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:underline"
            >
              Demo
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
                className="size-4"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <path d="m15 3 6 6"></path>
                <path d="M10 14 21 3"></path>
              </svg>
            </a>
          )}
          {project.links.details && (
            <Link
              href={project.links.details}
              className="inline-flex items-center gap-2 text-sm hover:underline"
            >
              Details
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
                className="size-4"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

