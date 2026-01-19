import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Alex Jia - Software Engineer & Data Engineer',
  description: 'Software Engineer & Data Engineer passionate about building scalable systems, optimizing data pipelines, and contributing to open-source projects.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-screen relative">
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="blob1 absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full blur-3xl" style={{background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)'}}></div>
          <div className="blob2 absolute top-[60%] right-[10%] w-[650px] h-[650px] rounded-full blur-3xl" style={{background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)'}}></div>
          <div className="blob3 absolute bottom-[15%] left-[25%] w-[550px] h-[550px] rounded-full blur-3xl" style={{background: 'radial-gradient(circle, rgba(255, 255, 255, 0.09) 0%, transparent 70%)'}}></div>
          <div className="blob4 absolute top-[40%] right-[30%] w-[700px] h-[700px] rounded-full blur-3xl" style={{background: 'radial-gradient(circle, rgba(255, 255, 255, 0.07) 0%, transparent 70%)'}}></div>
        </div>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}

