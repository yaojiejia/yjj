import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProfileSection from '@/components/about/ProfileSection'
import AboutPosts from '@/components/about/AboutPosts'
import TechStack from '@/components/about/TechStack'

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <div className="flex-1 container">
        <div className="space-y-8 py-8">
          <ProfileSection />
          <AboutPosts />
          <TechStack />
        </div>
      </div>
      <Footer />
    </main>
  )
}

