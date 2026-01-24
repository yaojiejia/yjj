export default function Experience() {
  const experiences = [
    {
      title: 'Incoming Software Engineer Intern',
      company: 'TikTok',
      location: 'Bellevue, WA',
      date: 'May 2026 — Aug 2026',
      description: [
        'Design and implement real-time and offline data architecture for large-scale recommendation systems',
        'Build scalable and high-performance streaming Lakehouse systems that power feature pipelines, model training, and real-time inference',
        'Collaborate with ML platform teams to support PyTorch-based model training workflows and design efficient data formats and access patterns for large-scale samples and features',
      ],
      technologies: [],
    },
    {
      title: 'Data Engineer Intern',
      company: 'Trepp',
      location: 'New York, NY',
      date: 'May 2025 — Aug 2025',
      description: [
        'Implemented Python-based system to handle AWS SQS messages and process 100K+ address records daily, containerized by ECS',
        'Optimized Kinesis stream ingestion by integrating Hudi with Apache Spark to write to S3, reducing batch sizes by 40%',
        'Decommissioned dependency on third-party ESRI resolution service by prioritizing in-house Property Search API, resulting in ~70% match rate and $120K/year cost savings on a 15M record backlog',
        'Setup 20+ AWS Step Functions orchestrating Glue Crawlers and Table creation, enabling Athena queries and QuickSight dashboards on new S3 datasets',
      ],
      technologies: ['Python', 'AWS', 'SQS', 'ECS', 'Kinesis', 'Apache Spark', 'Hudi', 'S3', 'Step Functions', 'Glue', 'Athena', 'QuickSight'],
    },
    {
      title: 'Open Source Software Engineer',
      company: 'Google Summer of Code - SQLancer',
      location: 'Remote',
      date: 'June 2025 — Sept 2025',
      description: [
        'Improved enterprise database reliability across 5,000+ systems through PostgreSQL v12-v18 testing framework upgrade',
        'Contributed 20+ JSON features in Java and Scala, improving test coverage for common PostgreSQL database JSON operations',
        'Architected CI/CD pipelines with GitHub Actions to automate multi-database test workflows (PostgreSQL, ClickHouse, etc.)',
        'Collaborated with 15+ global open-source contributors via GitHub code reviews, discussions, and documentation updates',
      ],
      technologies: ['Java', 'Scala', 'PostgreSQL', 'GitHub Actions', 'CI/CD', 'ClickHouse'],
    },
    {
      title: 'Software Engineer Intern',
      company: 'Flowlytics',
      location: 'New York, NY',
      date: 'Dec 2024 — May 2025',
      description: [
        'Built an assessment platform using Python, NGINX, and Docker to auto-scale (1–5 nodes) for 1,000+ concurrent users',
        'Developed OAuth2 in Python for JWT validation, token refresh, and custom claims mapping across providers',
        'Delivered a set of RESTful API with Python Flask to provide search functionality for assessment and audit data integrated with the internal search engine, utilizing PostgreSQL as relational storage, and improved efficiency by 25% using database indexing',
      ],
      technologies: ['Python', 'NGINX', 'Docker', 'OAuth2', 'JWT', 'Flask', 'REST API', 'PostgreSQL'],
    },
    {
      title: 'Data Engineer Intern',
      company: 'NYU Berkley Center For Entrepreneurship',
      location: 'New York, NY',
      date: 'Sept 2024 — May 2025',
      description: [
        'Migrated legacy systems to a modern AWS S3 data lake, achieving 15K cost savings with automated testing',
        'Built a real-time PySpark & Python ETL pipeline handling 1000+ events/sec using batch intervals and watermarking',
        'Optimized 2 TB+ relational and document data using Parquet + Snappy compression, reduced query latency by 30s',
        'Connected to Tableau dashboards reflecting business metrics such as monthly revenue statistics and investor contributions',
      ],
      technologies: ['Python', 'PySpark', 'AWS', 'S3', 'ETL', 'Parquet', 'Tableau'],
    },
  ]

  return (
    <div className="relative">
      <h2 className="mb-5">&gt;Experience</h2>
      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-x-1 flex-wrap">
                <h3 className="text-lg font-semibold">{exp.title}</h3>
                <span className="text-lg font-semibold mx-1">at</span>
                <p className="text-lg font-semibold">{exp.company}</p>
              </div>
              <p className="text-sm flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin size-3" aria-hidden="true">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {exp.location}
              </p>
              <p className="text-sm text-muted-foreground">{exp.date}</p>
            </div>
            <div className="flex flex-col gap-4">
              <ul className="list-disc pl-5 space-y-1">
                {exp.description.map((item, i) => (
                  <li key={i} className="text-sm leading-relaxed">{item}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <div key={tech} className="inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
