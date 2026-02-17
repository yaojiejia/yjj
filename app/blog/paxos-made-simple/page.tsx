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
                Paxos Made Simple: Understanding the Minimal Consensus Algorithm
              </h1>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs transition-colors border-transparent bg-secondary text-secondary-foreground">
                  Distributed Systems
                </span>
                <span className="inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs transition-colors border-transparent bg-secondary text-secondary-foreground">
                  Backend Development
                </span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none space-y-6 text-foreground/90 leading-relaxed">
              <p>
                Leslie Lamport's "Paxos Made Simple" demystifies one of the most fundamental algorithms in distributed systems. This paper argues that Paxos is not complex—it is the minimal algorithm required to solve consensus in an asynchronous, failure-prone network. This article breaks down the key concepts and insights from this foundational work.
              </p>

              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction — Why Paxos Exists</h2>
                <p>
                  Lamport's goal is to demystify Paxos. The paper argues that Paxos is not complex—it is the minimal algorithm required to solve consensus in an asynchronous, failure-prone network.
                </p>
                <p className="mt-4"><strong>Key framing:</strong></p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Paxos is fundamentally a consensus algorithm</li>
                  <li>Replication and state machines come later</li>
                  <li>Complexity comes from weak assumptions, not poor design</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4">2. The Consensus Algorithm</h2>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">2.1 The Problem</h3>
                  <p className="mb-3"><strong>Goal:</strong></p>
                  <p className="mb-4">Processes propose values; exactly one value is chosen.</p>
                  
                  <p className="mb-3"><strong>Safety requirements:</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Only proposed values may be chosen</li>
                    <li>Only one value is chosen</li>
                    <li>No process learns a value was chosen unless it actually was</li>
                  </ul>

                  <p className="mt-4 mb-3"><strong>Model assumptions:</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Processes may crash and restart</li>
                    <li>Messages may be delayed, lost, duplicated</li>
                    <li>No Byzantine failures</li>
                    <li>No timing guarantees</li>
                  </ul>
                  <p className="mt-3">
                    This is the strongest adversarial model Paxos must tolerate.
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">2.2 Choosing a Value — Why Paxos Needs Proposals, Numbers, and Promises</h3>
                  
                  <div className="mb-4">
                    <p className="mb-2"><strong>Initial idea: majority voting</strong></p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>If a majority accepts a value → chosen</li>
                      <li>But multiple values can split votes → no majority</li>
                    </ul>
                  </div>

                  <div className="mb-4">
                    <p className="mb-2"><strong>Core insight</strong></p>
                    <p className="mb-2">Acceptors must be allowed to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>accept multiple proposals</li>
                      <li>but ensure only one value can ever be chosen</li>
                    </ul>
                    <p className="mt-2">This leads to proposal numbers.</p>
                  </div>

                  <div className="mb-4">
                    <p className="mb-2"><strong>Proposal numbers</strong></p>
                    <p className="mb-2">Each proposal is: <code className="bg-muted px-1 rounded">(number, value)</code></p>
                    <p className="mb-2"><strong>Properties:</strong></p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Numbers are totally ordered</li>
                      <li>Higher number = later attempt</li>
                    </ul>
                    <p className="mt-3 mb-2"><strong>The key safety condition (P2)</strong></p>
                    <p>
                      If a value <code className="bg-muted px-1 rounded">v</code> is chosen, every higher-numbered chosen proposal must also have value <code className="bg-muted px-1 rounded">v</code>.
                    </p>
                    <p className="mt-2">This prevents divergence.</p>
                  </div>

                  <div className="mb-4">
                    <p className="mb-2"><strong>Why promises are needed</strong></p>
                    <p className="mb-2">If acceptors freely accept lower-numbered proposals:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>old proposals can resurface</li>
                      <li>conflicting majorities become possible</li>
                    </ul>
                    <p className="mt-2">So Paxos introduces promises.</p>
                  </div>

                  <div className="mb-4">
                    <p className="mb-2"><strong>Phase 1 — Prepare (Promise Phase)</strong></p>
                    <p className="mb-2">A proposer:</p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Chooses proposal number <code className="bg-muted px-1 rounded">n</code></li>
                      <li>Sends <code className="bg-muted px-1 rounded">Prepare(n)</code> to acceptors</li>
                    </ol>
                    <p className="mt-3 mb-2">An acceptor replies if <code className="bg-muted px-1 rounded">n</code> is higher than any it has seen:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>promises not to accept proposals <code className="bg-muted px-1 rounded">&lt; n</code></li>
                      <li>returns the highest proposal it has already accepted (if any)</li>
                    </ul>
                    <p className="mt-3">This:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>locks out the past</li>
                      <li>forces future proposals to respect already-accepted values</li>
                    </ul>
                  </div>

                  <div className="mb-4">
                    <p className="mb-2"><strong>Phase 2 — Accept</strong></p>
                    <p className="mb-2">If a proposer receives promises from a majority:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>it must propose:
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          <li>the value from the highest-numbered accepted proposal, if any</li>
                          <li>otherwise, any value</li>
                        </ul>
                      </li>
                      <li>It sends <code className="bg-muted px-1 rounded">Accept(n, v)</code>.</li>
                    </ul>
                    <p className="mt-3">Acceptors accept if they have not promised a higher number.</p>
                  </div>

                  <div className="mb-4">
                    <p className="mb-2"><strong>Why this works (core invariant)</strong></p>
                    <p className="mb-2">Because:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>majorities intersect</li>
                      <li>at least one acceptor remembers the chosen value</li>
                      <li>higher-numbered proposals must reuse it</li>
                    </ul>
                    <p className="mt-2">→ only one value can ever be chosen</p>
                  </div>

                  <div>
                    <p className="mb-2"><strong>Optimization</strong></p>
                    <p className="mb-2">Acceptors:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>ignore prepares for lower numbers</li>
                      <li>remember only:
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          <li>highest promised number</li>
                          <li>highest accepted proposal</li>
                        </ul>
                      </li>
                    </ul>
                    <p className="mt-3">This is the final Paxos algorithm.</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">2.3 Learning a Chosen Value</h3>
                  <p className="mb-3">Once a proposal is accepted by a majority, it is chosen.</p>
                  <p className="mb-3">Learners can find out by:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>acceptors notifying them</li>
                    <li>or querying acceptors later</li>
                  </ul>
                  <p className="mt-3"><strong>Important:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Learning is separate from choosing.</li>
                    <li>A value may be chosen even if no learner knows yet</li>
                    <li>Learning is eventually consistent</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">2.4 Progress — Why Paxos Can Stall</h3>
                  <p className="mb-3">Paxos guarantees safety, not liveness.</p>
                  
                  <div className="mb-4">
                    <p className="mb-2"><strong>Problem:</strong></p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Two proposers keep issuing higher-numbered proposals</li>
                      <li>They invalidate each other forever</li>
                    </ul>
                  </div>

                  <div>
                    <p className="mb-2"><strong>Solution:</strong></p>
                    <p className="mb-2">Elect a distinguished proposer (leader)</p>
                    <p className="mb-2">If:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>the leader can talk to a majority</li>
                      <li>it uses increasing proposal numbers</li>
                    </ul>
                    <p className="mt-2">→ progress is guaranteed</p>
                    <p className="mt-2">This does not affect safety.</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">2.5 Implementation Details</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Proposal numbers must be unique</strong>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>achieved by disjoint number ranges per proposer</li>
                      </ul>
                    </li>
                    <li><strong>Acceptors must use stable storage</strong>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>promises and accepted proposals survive crashes</li>
                      </ul>
                    </li>
                    <li><strong>One process can play all roles</strong></li>
                  </ul>
                  <p className="mt-3">At this point, single-decree Paxos is complete.</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4">3. Implementing a State Machine — Multi-Paxos</h2>
                <p className="mb-4">Now Paxos is applied repeatedly.</p>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">Replicated State Machine</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Each command is a deterministic operation</li>
                    <li>All replicas must execute commands in the same order</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">Multi-Paxos</h3>
                  <p className="mb-3">Run one Paxos instance per log slot</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Slot <code className="bg-muted px-1 rounded">i</code> chooses command <code className="bg-muted px-1 rounded">i</code></li>
                    <li><code className="bg-muted px-1 rounded">slot 1 → cmd1</code></li>
                    <li><code className="bg-muted px-1 rounded">slot 2 → cmd2</code></li>
                    <li><code className="bg-muted px-1 rounded">slot 3 → cmd3</code></li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">Leader Optimization (Critical)</h3>
                  <p className="mb-3">Once a leader is chosen:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Phase 1 is run once</li>
                    <li>Phase 2 is run for each slot</li>
                  </ul>
                  <p className="mt-3">This turns Paxos into a practical replication protocol.</p>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">Gaps and No-ops</h3>
                  <p className="mb-3">If slots are skipped (due to failure):</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>leader fills them with no-ops</li>
                    <li>preserves order</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">Key Result</h3>
                  <p className="mb-3">In steady state:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>each command costs one round of messages</li>
                    <li>Paxos is optimal under its assumptions</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4">Final Conceptual Summary</h2>
                <p className="mb-4">This matters:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Paxos does not rely on message order.</strong> Paxos creates order through agreement.</li>
                  <li><strong>Proposal numbers impose logical time</strong></li>
                  <li><strong>Promises prevent going backward</strong></li>
                  <li><strong>Majorities preserve decisions</strong></li>
                  <li><strong>Logs impose total order</strong></li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
                <p>
                  Paxos represents the minimal algorithm for achieving consensus in asynchronous, failure-prone distributed systems. Its elegance lies in its simplicity: by using proposal numbers, promises, and majority intersections, Paxos ensures that only one value can ever be chosen while tolerating the strongest adversarial conditions. The extension to Multi-Paxos transforms this single-decree consensus into a practical replication protocol, forming the foundation for many modern distributed systems.
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



