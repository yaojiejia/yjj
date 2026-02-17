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
                Ionia: High-Performance Distributed Write-Optimized Key-Value Stores
              </h1>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs transition-colors border-transparent bg-secondary text-secondary-foreground">
                  Distributed Systems
                </span>
                <span className="inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs transition-colors border-transparent bg-secondary text-secondary-foreground">
                  Backend Development
                </span>
                <span className="inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs transition-colors border-transparent bg-secondary text-secondary-foreground">
                  Storage Systems
                </span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none space-y-6 text-foreground/90 leading-relaxed">
              <p>
                Ionia is a distributed protocol designed to achieve high throughput with low latency by decoupling scalability from locality. This article explores the foundational storage concepts, the problems Ionia solves, and its innovative approach to distributed write-optimized key-value stores.
              </p>

              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4">Part 1: Storage Engine Foundations</h2>
                <p className="mb-4">
                  Understanding the trade-offs that motivate Ionia requires examining the fundamental storage engine architectures.
                </p>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">1. B-Tree (Traditional)</h3>
                  <p className="mb-3"><strong>Structure:</strong></p>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`        [50|100]
       /    |    \\
[20|30]  [60|80]  [110|120]
 /  |  \\   /  |  \\   /  |  \\
leaf leaf leaf leaf ...`}
                  </pre>
                  <p className="mb-3"><strong>Write Operation Flow:</strong></p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li><strong>Search:</strong> Traverse root → leaf (requires random disk reads).</li>
                    <li><strong>Update:</strong> Insert key into leaf.</li>
                    <li><strong>Split:</strong> If node is full, split and propagate up (requires multiple random disk writes).</li>
                  </ol>
                  <p className="mt-4"><strong>Characteristics:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li><strong>Symmetric Performance:</strong> Reads and writes are roughly equally fast/slow.</li>
                    <li><strong>Bottleneck:</strong> Limited by Random IOPS (e.g., ~600K IOPS on SSD).</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">2. LSM Tree (Log-Structured Merge Tree)</h3>
                  <p className="mb-3"><strong>Core Insight:</strong> Convert random writes into sequential writes to maximize throughput.</p>
                  <p className="mb-3"><strong>Structure:</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Memory Tier:</strong> <code className="bg-muted px-1 rounded">MemTable</code> (Sorted, ~256 MB).</li>
                    <li><strong>Disk Tier (SSTables):</strong>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Level 0: ~256 MB</li>
                        <li>Level 1: ~2.5 GB</li>
                        <li>Level 2: ~25 GB ...</li>
                      </ul>
                    </li>
                  </ul>
                  <p className="mt-4 mb-3"><strong>Write Operation Flow:</strong></p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li><strong>Buffer:</strong> Write to <code className="bg-muted px-1 rounded">MemTable</code> (RAM) + Append to Write-Ahead Log (Sequential).</li>
                    <li><strong>Flush:</strong> When <code className="bg-muted px-1 rounded">MemTable</code> fills, flush to disk as SSTable (Sequential write, 3-7 GB/s).</li>
                    <li><strong>Merge:</strong> Background process merges sorted files to clean up invalid data.</li>
                  </ol>
                  <p className="mt-4"><strong>Characteristics:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li><strong>Asymmetric Performance:</strong> Excellent write throughput (sequential) but reads can be slower (checking multiple levels).</li>
                    <li><strong>Write-Optimized Key-Value (WO-KV):</strong> Prioritizes write speed over read speed.</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4">Part 2: The Problem Space</h2>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">Background & Motivation</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>WO-KV Speed:</strong> Single-node WO-KV stores have massive write throughput.</li>
                    <li><strong>Replication Bottleneck:</strong> Traditional replication protocols kill this performance because:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>They apply writes sequentially on a single thread to ensure identical replicas.</li>
                        <li>They require coordination for write ordering (high latency).</li>
                        <li>Followers are unused (wasted resources).</li>
                      </ul>
                    </li>
                    <li><strong>The Goal:</strong> An ideal protocol must preserve WO-KV write performance (throughput/latency) while ensuring consistency.</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">Shortcomings of Existing Systems</h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li><strong>Trade-offs:</strong> Systems usually force a choice between scalable reads (low latency) vs. availability.</li>
                    <li><strong>Batching Latency:</strong> Systems like CBASE/Eve use multi-threading but rely on large batches to find concurrency, increasing latency.</li>
                    <li><strong>Sequential Write Bottlenecks:</strong> Systems using commutativity or network ordering often still suffer from sequential write limitations.</li>
                    <li><strong>Read Latency:</strong> Systems routing reads to the leader (Gaios, Gnothi) suffer from high RTT.</li>
                  </ol>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4">Part 3: Ionia Protocol Overview</h2>
                <p>
                  <strong>Ionia</strong> is a distributed protocol designed to achieve high throughput with low latency by decoupling scalability from locality.
                </p>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">Core Philosophy</h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li><strong>Parallel Execution:</strong> Concurrently execute non-conflicting writes to avoid inconsistencies.</li>
                    <li><strong>Deferred Ordering:</strong> Guarantees durability immediately (1 RTT) but defers strict ordering and execution to the background.</li>
                    <li><strong>Decoupling Locality:</strong>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Traditional In-Memory bottleneck: Network.</li>
                        <li>WO-KV bottleneck: SSD Random IOPS.</li>
                        <li><em>Insight:</em> Reads can scale non-locally as long as validation checks are done in-memory without hitting the SSD.</li>
                      </ul>
                    </li>
                    <li><strong>Client-Side Consistency:</strong> To solve stale reads at followers, the client performs the final validity check using metadata from the leader.</li>
                  </ol>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4">Part 4: Ionia Implementation</h2>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">A. Write Operations (Fast Durability)</h3>
                  <p className="mb-3">Ionia separates durability from execution to achieve speed.</p>
                  
                  <div className="mb-4">
                    <p className="mb-2"><strong>1. Fast Durability (1 RTT):</strong></p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Client sends write to all replicas in parallel.</li>
                      <li>Replicas append to <strong>Durability Log</strong> (uncoordinated) and ACK.</li>
                      <li>Client waits for a <strong>Supermajority</strong> (<code className="bg-muted px-1 rounded">f + ⌈f/2⌉ + 1</code>) including the leader.</li>
                      <li><em>Result:</em> Durable in 1 RTT.</li>
                    </ul>
                  </div>

                  <div className="mb-4">
                    <p className="mb-2"><strong>2. Background Ordering:</strong></p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Leader moves writes from Durability Log to <strong>Consensus Log</strong> (assigns sequence numbers).</li>
                      <li>Leader batches these into <code className="bg-muted px-1 rounded">PREPARE</code> messages for followers.</li>
                      <li>Once <code className="bg-muted px-1 rounded">f</code> followers <code className="bg-muted px-1 rounded">PREPARE-OK</code>, the order is finalized (<code className="bg-muted px-1 rounded">COMMIT</code>).</li>
                    </ul>
                  </div>

                  <div>
                    <p className="mb-2"><strong>3. Parallel Execution:</strong></p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>ExecQueues:</strong> Storage layer hashes keys to specific thread queues.</li>
                      <li><strong>Rule:</strong> Non-conflicting writes execute in parallel threads. Conflicting writes (same key) execute serially.</li>
                      <li><strong>Progress:</strong> Replicas track <code className="bg-muted px-1 rounded">applied_index</code> (latest Consensus Log index applied to KV store).</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">B. Read Operations (Scalable & Consistent)</h3>

                  <div className="mb-4">
                    <p className="mb-2"><strong>1. Leader Reads</strong></p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Check:</strong> Leader checks Durability Log for pending updates.</li>
                      <li><strong>Empty?</strong> Read from KV Store (1 RTT).</li>
                      <li><strong>Pending?</strong> Synchronously order/execute pending updates, then return (2 RTTs, but rare).</li>
                    </ul>
                  </div>

                  <div className="mb-4">
                    <p className="mb-2"><strong>2. Follower Reads (The "Meta-Query" Mechanism)</strong></p>
                    <p className="mb-2">To allow reading from followers without staleness, Ionia uses a parallel check.</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Action:</strong> Client sends <strong>Read</strong> to Follower AND <strong>Meta-Query</strong> to Leader simultaneously.</li>
                      <li><strong>Follower Response:</strong> Returns <code className="bg-muted px-1 rounded">Data</code> + <code className="bg-muted px-1 rounded">Follower_Applied_Index</code>.</li>
                      <li><strong>Leader Response:</strong> Returns <code className="bg-muted px-1 rounded">Key_Modified_Index</code> (from in-memory history).</li>
                    </ul>
                    <p className="mt-3 mb-2"><strong>Client-Side Consistency Check:</strong></p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Logic:</strong> <code className="bg-muted px-1 rounded">if Follower_Applied_Index {'>='} Key_Modified_Index</code>: <strong>Data is Fresh.</strong></li>
                      <li><strong>Else:</strong> Data is stale; retry at leader.</li>
                    </ul>
                  </div>

                  <div>
                    <p className="mb-2"><strong>3. History Management & Optimization</strong></p>
                    <p className="mb-2">The leader cannot store history for every key forever.</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Trimming:</strong> Leader tracks <code className="bg-muted px-1 rounded">applied_index</code> of all "active" followers. History is trimmed up to the point where all active followers have caught up.</li>
                      <li><strong>Missing Keys (LTI):</strong> If a key is trimmed from history, Leader returns <strong>LTI (Last-Trimmed Index)</strong>.</li>
                      <li><strong>Optimization:</strong> Pending updates in the leader's log trigger immediate synchronous execution at the leader to return fresh data, avoiding a client retry.</li>
                    </ul>
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <p className="mb-2"><strong>Example Scenario:</strong></p>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Key <code className="bg-background px-1 rounded">k1</code> last modified at index <strong>50</strong>.</li>
                        <li>Follower has applied up to index <strong>100</strong> (has <code className="bg-background px-1 rounded">k1</code>'s latest version).</li>
                        <li>Leader History trimmed to index <strong>80</strong> (LTI). <code className="bg-background px-1 rounded">k1</code> is no longer in history.</li>
                        <li><strong>The Check:</strong>
                          <ul className="list-disc pl-6 mt-1 space-y-1">
                            <li>Leader returns: <code className="bg-background px-1 rounded">LTI = 80</code>.</li>
                            <li>Follower returns: <code className="bg-background px-1 rounded">Data</code> + <code className="bg-background px-1 rounded">Applied_Index = 100</code>.</li>
                            <li>Client Check: <code className="bg-background px-1 rounded">100 ≥ 80</code> → <strong>PASS</strong>.</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4">Part 5: Reliability & Correctness</h2>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">Failures and View Changes</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Recovery:</strong> Replicas restore Consensus and Durability logs from the leader.</li>
                    <li><strong>Why Supermajority?</strong>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Standard majority isn't enough for the Durability Log because writes are uncoordinated (Log A: <code className="bg-muted px-1 rounded">[a,b]</code>, Log B: <code className="bg-muted px-1 rounded">[b,a]</code>).</li>
                        <li><strong>Supermajority Quorum:</strong> <code className="bg-muted px-1 rounded">f + ⌈f/2⌉ + 1</code>.</li>
                        <li>Ensures that after <code className="bg-muted px-1 rounded">f</code> failures, at least one remaining replica has the correct order of writes.</li>
                      </ul>
                    </li>
                    <li><strong>View Change Process:</strong> New leader collects logs, builds a dependency DAG from pairwise comparisons, topologically sorts it to finalize order, and enters the new view.</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">Correctness Proof Sketch</h3>
                  
                  <div className="mb-4">
                    <p className="mb-2"><strong>Property 1: Write Ordering (Linearizability)</strong></p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Normal operation:</strong> Leader imposes order moving from Durability Log to Consensus Log.</li>
                      <li><strong>View Change:</strong> Supermajority guarantees the new leader can reconstruct the linearizable order despite failures.</li>
                      <li><strong>Execution:</strong> Deterministic hashing ensures conflicting writes execute in the same order on all replicas.</li>
                    </ul>
                  </div>

                  <div>
                    <p className="mb-2"><strong>Property 2: Read Freshness</strong></p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Case 1 (Pending Write):</strong> Leader Meta-Query sees pending write in Durability Log → Leader executes and returns fresh data.</li>
                      <li><strong>Case 2 (Executed Write):</strong> Client compares <code className="bg-muted px-1 rounded">Follower_Applied_Index</code> vs <code className="bg-muted px-1 rounded">Leader_Modified_Index</code> (or LTI). Because LTI is always <code className="bg-muted px-1 rounded">≥</code> actual modified index (conservative), the client never accepts stale data.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
                <p>
                  Ionia represents a significant advancement in distributed WO-KV systems by achieving high throughput and low latency through innovative techniques: separating durability from execution, enabling parallel non-conflicting writes, and allowing scalable follower reads with client-side consistency checks. The protocol's design elegantly addresses the fundamental tension between write performance and consistency in distributed systems.
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

