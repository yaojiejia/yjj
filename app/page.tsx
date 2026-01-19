import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Experience from '@/components/Experience'
import Blog from '@/components/Blog'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="flex-1 container">
        <div className="space-y-5">
          <Hero />
          <Experience />
          <Blog />
        </div>
      </div>
      <Footer />
    </main>
  )
}
