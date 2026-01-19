'use client'

const getIconUrl = (name: string) => {
  // Skill-icons.dev mappings - prioritize colored icons from skill-icons.dev
  const skillIconsMap: Record<string, string> = {
    'React': 'react',
    'HTML': 'html',
    'CSS': 'css',
    'JavaScript': 'js',
    'TypeScript': 'typescript',
    'Next.js': 'nextjs',
    'Markdown': 'markdown',
    'Java': 'java',
    'Go': 'go',
    'Python': 'python',
    'Spring Boot': 'spring',
    'Node.js': 'nodejs',
    'PostgreSQL': 'postgresql',
    'MongoDB': 'mongodb',
    'Apache Spark': 'apachespark',
    'Apache Kafka': 'apachekafka',
    'Git': 'git',
    'Docker': 'docker',
    'Kubernetes': 'kubernetes',
    'Redis': 'redis',
    'OpenAI': 'openai',
    'Claude / Anthropic': 'anthropic',
    'Gemini': 'google',
    'Cursor': 'cursor',
    'OpenRouter': 'openrouter',
    'AWS': 'aws',
    'GCP': 'gcp',
    'Pandas': 'pandas',
    'NumPy': 'numpy',
    'Scikit-learn': 'scikitlearn',
    'PyTorch': 'pytorch',
  }
  
  // Always try skill-icons.dev first (colored icons)
  const iconName = skillIconsMap[name] || name.toLowerCase().replace(/\s+/g, '').replace('.', '').replace('/', '')
  return `https://skillicons.dev/icons?i=${iconName}`
}

const getIconStyle = (name: string) => {
  // Brand colors for technologies that might use simple-icons (monochrome)
  const brandColors: Record<string, string> = {
    'Apache Spark': '#E25A1C',
    'Apache Kafka': '#231F20',
    'OpenAI': '#412991',
    'Claude / Anthropic': '#D97757',
    'Gemini': '#4285F4',
    'Cursor': '#000000',
    'OpenRouter': '#000000',
    'Pandas': '#150458',
    'NumPy': '#013243',
    'Scikit-learn': '#F7931E',
  }
  
  const color = brandColors[name]
  if (color) {
    return {
      filter: 'none',
      backgroundColor: 'transparent',
      objectFit: 'contain' as const,
      // Apply brand color using CSS filter (approximate)
      ...(color === '#E25A1C' && { filter: 'brightness(0) saturate(100%) invert(48%) sepia(95%) saturate(1352%) hue-rotate(350deg) brightness(99%) contrast(89%)' }), // Apache Spark orange
      ...(color === '#412991' && { filter: 'brightness(0) saturate(100%) invert(20%) sepia(95%) saturate(2000%) hue-rotate(250deg) brightness(90%) contrast(120%)' }), // OpenAI purple
      ...(color === '#4285F4' && { filter: 'brightness(0) saturate(100%) invert(45%) sepia(95%) saturate(2000%) hue-rotate(200deg) brightness(100%) contrast(100%)' }), // Google blue
      ...(color === '#F7931E' && { filter: 'brightness(0) saturate(100%) invert(65%) sepia(95%) saturate(2000%) hue-rotate(350deg) brightness(105%) contrast(100%)' }), // Scikit-learn orange
    }
  }
  
  return {
    filter: 'none',
    backgroundColor: 'transparent',
    objectFit: 'contain' as const,
  }
}

export default function TechStack() {

  const frontend = [
    { name: 'React' },
    { name: 'HTML' },
    { name: 'CSS' },
    { name: 'JavaScript' },
    { name: 'TypeScript' },
    { name: 'Next.js' },
    { name: 'Markdown' },
  ]

  const backend = [
    { name: 'Java' },
    { name: 'Go' },
    { name: 'Python' },
    { name: 'Spring Boot' },
    { name: 'Node.js' },
    { name: 'PostgreSQL' },
    { name: 'MongoDB' },
    { name: 'Apache Spark' },
    { name: 'Apache Kafka' },
    { name: 'Git' },
    { name: 'Docker' },
    { name: 'Kubernetes' },
    { name: 'Redis' },
  ]

  const ai = [
    { name: 'OpenAI' },
    { name: 'Claude / Anthropic' },
    { name: 'Gemini' },
    { name: 'Python' },
    { name: 'Cursor' },
    { name: 'OpenRouter' },
    { name: 'AWS' },
    { name: 'GCP' },
  ]

  const ml = [
    { name: 'Pandas' },
    { name: 'NumPy' },
    { name: 'Scikit-learn' },
    { name: 'PyTorch' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">&gt; Stack</h2>
        <p className="text-muted-foreground">Technologies I work with and focus on the most.</p>
      </div>

      <div className="space-y-8">
        {/* Frontend */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Frontend</h3>
          <div className="flex flex-wrap gap-3">
            {frontend.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2 px-4 py-2 bg-background/40 border border-border rounded-lg hover:bg-background/60 transition-colors"
              >
                <img 
                  src={getIconUrl(tech.name)} 
                  alt={tech.name}
                  className="w-5 h-5 flex-shrink-0"
                  style={getIconStyle(tech.name)}
                  onError={(e) => {
                    // Try fallback to simple-icons if skill-icons fails
                    const fallbackName = tech.name.toLowerCase().replace(/\s+/g, '').replace('.', '').replace('/', '')
                    const fallbackUrl = `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${fallbackName}.svg`
                    if (e.currentTarget.src !== fallbackUrl) {
                      e.currentTarget.src = fallbackUrl
                      e.currentTarget.style.cssText = Object.entries(getIconStyle(tech.name)).map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}:${v}`).join(';')
                    } else {
                      e.currentTarget.style.display = 'none'
                    }
                  }}
                />
                <span className="text-sm">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Backend & Infrastructure */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Backend & Infrastructure</h3>
          <div className="flex flex-wrap gap-3">
            {backend.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2 px-4 py-2 bg-background/40 border border-border rounded-lg hover:bg-background/60 transition-colors"
              >
                <img 
                  src={getIconUrl(tech.name)} 
                  alt={tech.name}
                  className="w-5 h-5 flex-shrink-0"
                  style={getIconStyle(tech.name)}
                  onError={(e) => {
                    // Try fallback to simple-icons if skill-icons fails
                    const fallbackName = tech.name.toLowerCase().replace(/\s+/g, '').replace('.', '').replace('/', '')
                    const fallbackUrl = `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${fallbackName}.svg`
                    if (e.currentTarget.src !== fallbackUrl) {
                      e.currentTarget.src = fallbackUrl
                      e.currentTarget.style.cssText = Object.entries(getIconStyle(tech.name)).map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}:${v}`).join(';')
                    } else {
                      e.currentTarget.style.display = 'none'
                    }
                  }}
                />
                <span className="text-sm">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI & SDK */}
        <div>
          <h3 className="text-lg font-semibold mb-4">AI & SDK</h3>
          <div className="flex flex-wrap gap-3">
            {ai.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2 px-4 py-2 bg-background/40 border border-border rounded-lg hover:bg-background/60 transition-colors"
              >
                <img 
                  src={getIconUrl(tech.name)} 
                  alt={tech.name}
                  className="w-5 h-5 flex-shrink-0"
                  style={getIconStyle(tech.name)}
                  onError={(e) => {
                    // Try fallback to simple-icons if skill-icons fails
                    const fallbackName = tech.name.toLowerCase().replace(/\s+/g, '').replace('.', '').replace('/', '')
                    const fallbackUrl = `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${fallbackName}.svg`
                    if (e.currentTarget.src !== fallbackUrl) {
                      e.currentTarget.src = fallbackUrl
                      e.currentTarget.style.cssText = Object.entries(getIconStyle(tech.name)).map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}:${v}`).join(';')
                    } else {
                      e.currentTarget.style.display = 'none'
                    }
                  }}
                />
                <span className="text-sm">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ML & DS */}
        <div>
          <h3 className="text-lg font-semibold mb-4">ML & DS</h3>
          <div className="flex flex-wrap gap-3">
            {ml.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2 px-4 py-2 bg-background/40 border border-border rounded-lg hover:bg-background/60 transition-colors"
              >
                <img 
                  src={getIconUrl(tech.name)} 
                  alt={tech.name}
                  className="w-5 h-5 flex-shrink-0"
                  style={getIconStyle(tech.name)}
                  onError={(e) => {
                    // Try fallback to simple-icons if skill-icons fails
                    const fallbackName = tech.name.toLowerCase().replace(/\s+/g, '').replace('.', '').replace('/', '')
                    const fallbackUrl = `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${fallbackName}.svg`
                    if (e.currentTarget.src !== fallbackUrl) {
                      e.currentTarget.src = fallbackUrl
                      e.currentTarget.style.cssText = Object.entries(getIconStyle(tech.name)).map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}:${v}`).join(';')
                    } else {
                      e.currentTarget.style.display = 'none'
                    }
                  }}
                />
                <span className="text-sm">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

