import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProjectsHeader from '@/components/projects/ProjectsHeader'
import ProjectsList from '@/components/projects/ProjectsList'

export default function ProjectsPage() {
  return (
    <main>
      <Navbar />
      <div className="flex-1 container">
        <div className="space-y-8 py-8">
          <ProjectsHeader />
          <ProjectsList />
        </div>
      </div>
      <Footer />
    </main>
  )
}

