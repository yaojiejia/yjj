export interface BlogPost {
  id: number
  date: string
  title: string
  description: string
  tags: string[]
  slug: string
}

export const blogPosts: BlogPost[] = [
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
  {
    id: 3,
    date: new Date().toISOString().split('T')[0],
    title: 'Viewstamped Replication Revisited: A Deep Dive into Distributed Consensus',
    description: 'An exploration of the Viewstamped Replication protocol, covering crash fault tolerance, view changes, recovery mechanisms, and practical optimizations for building reliable distributed systems.',
    tags: ['Distributed Systems', 'Backend Development'],
    slug: 'viewstamped-replication-revisited',
  },
  {
    id: 4,
    date: new Date().toISOString().split('T')[0],
    title: 'Ionia: High-Performance Distributed Write-Optimized Key-Value Stores',
    description: 'Exploring the Ionia protocol that achieves high throughput and low latency in distributed WO-KV stores by decoupling scalability from locality, enabling parallel execution and scalable reads.',
    tags: ['Distributed Systems', 'Backend Development', 'Storage Systems'],
    slug: 'ionia-distributed-wo-kv',
  },
  {
    id: 5,
    date: new Date().toISOString().split('T')[0],
    title: 'Paxos Made Simple: Understanding the Minimal Consensus Algorithm',
    description: 'A deep dive into Leslie Lamport\'s Paxos algorithm, exploring why it exists, how it achieves consensus in asynchronous networks, and how it scales to implement replicated state machines.',
    tags: ['Distributed Systems', 'Backend Development'],
    slug: 'paxos-made-simple',
  },
]

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
  const dayName = days[date.getDay()]
  const monthName = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()
  
  return `${dayName}, ${monthName} ${day}, ${year}`
}

