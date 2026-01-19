import Link from 'next/link'

export default function About() {
  return (
    <div className="space-y-4 my-12">
      <div>
        <h2 className="font-bold">Want to learn more about my professional profile?</h2>
        <p className="text-muted-foreground">Feel free to check out my CV.</p>
      </div>
      <Link 
        href="/resume.pdf" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="underline"
      >
        View Resume
      </Link>
    </div>
  )
}
