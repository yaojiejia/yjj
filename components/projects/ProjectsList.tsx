import ProjectCard from './ProjectCard'

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

const projects: Project[] = [
  {
    id: 1,
    title: 'Go Load Balancer',
    subtitle: 'Lightweight Load Balancer with Multiple Algorithms',
    description: 'A lightweight and efficient load balancer written in Go, supporting multiple load balancing algorithms including Round Robin, Weighted Round Robin, Sticky Round Robin, and IP Hashing. Features Docker support and YAML-based configuration.',
    technologies: ['Go', 'Docker', 'HTTP', 'Load Balancing', 'YAML'],
    links: {
      github: 'https://github.com/yaojiejia/loadBalancer',
    },
  },
  {
    id: 2,
    title: 'FastAWS',
    subtitle: 'AI-Powered Cloud Deployment Agents (Work in Progress)',
    description: 'AI agents that automatically deploy your repository to any cloud platform (AWS, Azure, GCP) with intelligent infrastructure provisioning and configuration.',
    technologies: ['Python', 'LLM', 'RAG', 'Terraform', 'Docker', 'LangGraph', 'FAISS', 'OpenAI'],
    links: {
      github: 'https://github.com/yaojiejia/fastaws',
    },
  },
]

export default function ProjectsList() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">&gt; Featured projects</h2>
      <div className="space-y-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

