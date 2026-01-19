import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function BlogPost() {
  return (
    <main>
      <Navbar />
      <div className="flex-1 container">
        <div className="max-w-4xl mx-auto py-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
            Back to Blog
          </Link>

          <article className="space-y-8">
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <h1 className="text-4xl font-bold mb-4">
                Getting Started with Open Source Contributions Through GSoC
              </h1>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs transition-colors border-transparent bg-secondary text-secondary-foreground">
                  Open Source
                </span>
                <span className="inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs transition-colors border-transparent bg-secondary text-secondary-foreground">
                  Career Development
                </span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none space-y-6 text-foreground/90 leading-relaxed">
              <p>
                Last summer, I had the opportunity to participate in a real-world open source project through Google Summer of Code (GSoC). It was one of the best programs for getting comfortable with large-scale, production-ready codebases and collaborating with experienced maintainers. In this blog, I'll share how I got into the program and the key takeaways from my experience.
              </p>

              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4">Understanding the GSoC Timeline</h2>
                <p>
                  Each year, GSoC follows a fairly consistent timeline. In my opinion, the most important factor in getting accepted is finding one or two mentoring organizations that genuinely align with your interests and passions.
                </p>
                <p className="mt-4">
                  As soon as the list of accepted mentoring organizations is published (usually around February 19), I recommend browsing the official GSoC website and shortlisting organizations that feel like a good fit. If the list hasn't been published yet, you can still explore organizations that were accepted in previous years. Many of them return, so this research is rarely wasted.
                </p>
              </div>

              <div>
                <div className="my-8">
                  <img 
                    src="/blog-images/gsoc_timeline.png" 
                    alt="GSoC Timeline" 
                    className="w-full rounded-lg"
                  />
                </div>
                <h2 className="text-2xl font-bold mt-8 mb-4">Engaging with the Organization</h2>
                <p>
                  Once you've identified your target organizations, the next step is to engage with their community. This might include Slack, GitHub, mailing lists, or other communication channels. In my case, the organization used Slack, so I found their workspace through a simple Google search.
                </p>
                <p className="mt-4">
                  After joining, I introduced myself—sharing my background, interests, and why I thought I could be a good fit. Communication is extremely important at this stage. I also explored their GitHub repository and worked on a few "good first issues" before submitting my application. This helped demonstrate both my technical skills and my ability to collaborate.
                </p>
                <p className="mt-4">
                  I personally raised a few pull requests during this stage, and I believe having 1–3 accepted PRs is a great starting point.
                </p>
              </div>

              <div>
                <div className="my-8 space-y-4">
                  <img 
                    src="/blog-images/gsoc_org.png" 
                    alt="GSoC Organizations" 
                    className="w-full rounded-lg"
                  />
                  <img 
                    src="/blog-images/gsoc_pr.png" 
                    alt="GSoC Pull Requests" 
                    className="w-full rounded-lg"
                  />
                </div>
                <h2 className="text-2xl font-bold mt-8 mb-4">Using Archived GSoC Organizations to Prepare Early</h2>
                <p>
                  If the list of accepted mentoring organizations hasn't been published yet, a good strategy is to look at organizations that participated in previous GSoC editions. Google maintains an archive of past organizations, and many of them return each year.
                </p>
                <p className="mt-4">
                  Although there is no guarantee that a past organization will be accepted again, contributing early still has clear benefits. You gain experience working with mature open source codebases, learn the organization's workflow, and build skills that are useful for any GSoC project.
                </p>
                <p className="mt-4">
                  In some cases, organizations that do return may already recognize contributors who were active before the application period. Even if the organization doesn't return, the experience and public contributions are still valuable.
                </p>
                <p className="mt-4">
                  For these reasons, I recommend starting with archived organizations if you want to prepare early. Here is the link to the archive:{' '}
                  <a 
                    href="https://summerofcode.withgoogle.com/archive/2025/organizations" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    https://summerofcode.withgoogle.com/archive/2025/organizations
                  </a>
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4">Writing a Strong Proposal</h2>
                <p>
                  Once applications open, it's time to write the official proposal. When I was applying, I found this repository of previously accepted proposals very helpful:
                </p>
                <p className="mt-4">
                  <a 
                    href="https://github.com/saketkc/fos-proposals" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    https://github.com/saketkc/fos-proposals
                  </a>
                </p>
                <p className="mt-4">
                  You should also closely follow Google's official proposal-writing guide:
                </p>
                <p className="mt-4">
                  <a 
                    href="https://google.github.io/gsocguides/student/writing-a-proposal" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    https://google.github.io/gsocguides/student/writing-a-proposal
                  </a>
                </p>
                <p className="mt-4">
                  The format I used included:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Personal information</li>
                  <li>About me and education</li>
                  <li>Abstract</li>
                  <li>Benefits to the community</li>
                  <li>Deliverables</li>
                  <li>Timeline and milestones</li>
                  <li>Commitment</li>
                  <li>Post-GSoC plans</li>
                  <li>PRs raised and issues opened</li>
                </ul>
                <p className="mt-4">
                  The most important section is deliverables. I strongly recommend investing most of your time here. Break the project into realistic milestones and research each one thoroughly. For example, if your project involves implementing a neural network, you might start with foundational components like matrix multiplication, activation functions, softmax, and logistic regression before moving on to wiring the full network together.
                </p>
                <p className="mt-4">
                  Having a clear roadmap significantly increases your chances of getting accepted. Including small code snippets or references to working implementations can also strengthen your proposal. Listing PRs you've raised and issues you've opened further demonstrates your commitment and readiness.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4">Final Advice</h2>
                <p>
                  If you follow the steps above, you'll be in a very strong position. One final observation: I noticed that some applicants spammed Slack channels with unnecessary messages or repeatedly begged maintainers for attention. This is unprofessional and often counterproductive. Be respectful, thoughtful, and intentional in your communication.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </main>
  )
}

