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
                Viewstamped Replication Revisited: A Deep Dive into Distributed Consensus
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
                Viewstamped Replication (VR) is a protocol originally developed in the 1980s for handling crash failures in replicated services. This "Revisited" version presents an updated protocol that enables a service (like a file system or lock manager) to run on multiple nodes, maintaining a consistent state accessible to clients despite individual node failures.
              </p>

              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
                <p>
                  The paper introduces an updated version of Viewstamped Replication (VR), a protocol originally developed in the 1980s for handling crash failures in replicated services. VR enables a service (like a file system or lock manager) to run on multiple nodes, maintaining a consistent state accessible to clients despite individual node failures.
                </p>
                <p className="mt-4">
                  This "Revisited" version differs from the original in several key ways:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li><strong>Improved Protocol:</strong> It incorporates optimizations inspired by later work on Byzantine Fault Tolerance (PBFT), making it simpler and more performant.</li>
                  <li><strong>No Disk Requirement:</strong> The protocol achieves persistence through replication rather than mandatory disk writes during normal operations.</li>
                  <li><strong>Reconfiguration:</strong> It introduces a new protocol to change group membership (adding/removing nodes) and adjust the failure threshold dynamically.</li>
                  <li><strong>Application Independence:</strong> The protocol is presented as a standalone layer, unlike previous iterations that were tightly coupled with specific database or file system implementations.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4">2. Background</h2>
                <p>
                  This section establishes the environment and assumptions for VR.
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li><strong>Assumptions:</strong> VR handles crash failures (nodes stop working) but not Byzantine failures (malicious attacks). It operates in an asynchronous network where messages can be lost, delayed, or reordered, but will eventually be delivered if retried.</li>
                  <li><strong>Replica Groups:</strong> The system uses a group of <code className="bg-muted px-1 rounded">2f + 1</code> replicas to tolerate <code className="bg-muted px-1 rounded">f</code> failures. This size ensures that any "quorum" of <code className="bg-muted px-1 rounded">f + 1</code> replicas will overlap with any other quorum by at least one node, guaranteeing data consistency.</li>
                  <li><strong>Architecture:</strong> Clients run user code which talks to a local VR proxy. This proxy communicates with the replicas. Replicas run the VR code, which manages the protocol and makes "up-calls" to the service code (the actual application being replicated) only when requests are committed.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4">3. Overview</h2>
                <p>
                  VR relies on a primary replica to order client requests. Other replicas act as backups.
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li><strong>Normal Operation:</strong> The primary dictates the order of operations. Backups follow this order.</li>
                  <li><strong>View Changes:</strong> If the primary fails, the system performs a "view change" to select a new primary. Correctness requires that the new view reflects all operations executed in previous views. This is guaranteed because the new view starts from a quorum of <code className="bg-muted px-1 rounded">f + 1</code> replicas, at least one of which must know about the latest committed request.</li>
                  <li><strong>Recovery:</strong> Failed nodes can recover and rejoin. To do so safely, they must retrieve the most recent state from the group to ensure they don't vote in a quorum with outdated information.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4">4. The VR Protocol</h2>
                <p>
                  This section details the core algorithms.
                </p>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">4.1 Normal Operation</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>State:</strong> Each replica maintains a configuration, a view-number (identifies the current primary), an op-number (sequence number for requests), a log (history of requests), a commit-number, and a client-table (deduplication of requests).</li>
                    <li><strong>Process:</strong>
                      <ol className="list-decimal pl-6 mt-2 space-y-1">
                        <li>Client sends a REQUEST to the primary.</li>
                        <li>Primary assigns an op-number, adds it to its log, and broadcasts a PREPARE message to backups.</li>
                        <li>Backups check the sequence, add to their log, and reply with PREPAREOK.</li>
                        <li>Once the primary receives <code className="bg-muted px-1 rounded">f</code> PREPAREOKs (constituting a quorum including itself), the operation is committed.</li>
                        <li>The primary executes the operation, replies to the client, and informs backups of the commit (often piggybacked on the next PREPARE or via a COMMIT message).</li>
                        <li>Backups execute the operation after learning of the commit.</li>
                      </ol>
                    </li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">4.2 View Changes</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Trigger:</strong> Backups expect regular communication from the primary. If a timeout occurs, they initiate a view change.</li>
                    <li><strong>Protocol:</strong>
                      <ol className="list-decimal pl-6 mt-2 space-y-1">
                        <li>A replica advances its view-number and broadcasts STARTVIEWCHANGE.</li>
                        <li>When a replica receives <code className="bg-muted px-1 rounded">f</code> STARTVIEWCHANGE messages, it sends a DOVIEWCHANGE message to the new primary containing its log and state.</li>
                        <li>The new primary waits for <code className="bg-muted px-1 rounded">f + 1</code> DOVIEWCHANGE messages. It selects the log with the highest view number and op-number (the most up-to-date history).</li>
                        <li>The new primary installs this state, sets its status to normal, and broadcasts STARTVIEW.</li>
                        <li>Backups install the new state and process any uncommitted operations in the new log.</li>
                      </ol>
                    </li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">4.3 Recovery</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Problem:</strong> A recovering node cannot simply rejoin because it may have "forgotten" a vote it cast before crashing, potentially violating quorum guarantees.</li>
                    <li><strong>Solution:</strong> The node enters a recovering state. It sends a RECOVERY message with a nonce. It waits for <code className="bg-muted px-1 rounded">f + 1</code> RECOVERYRESPONSE messages, including one from the current primary. This allows it to learn the current view and sync its state/log before participating in decisions again.</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">4.4 Non-deterministic Operations</h3>
                  <p>
                    For operations that rely on local non-deterministic values (like reading a local clock), the primary must compute the value or predict it, record it in the log, and transmit it to backups so all nodes execute the exact same state transition.
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">4.5 Client Recovery</h3>
                  <p>
                    Clients track request numbers to handle dropped messages. If a client crashes, it queries the cluster to find its last executed request number and increments it to avoid reusing numbers.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4">5. Pragmatics</h2>
                <p>
                  This section addresses implementation efficiency, specifically log management.
                </p>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">5.1 Efficient Recovery</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Sending the full log during recovery is too expensive. Instead, replicas create checkpoints of the application state (snapshots).</li>
                    <li>The log is truncated (garbage collected) up to the checkpoint.</li>
                    <li>Recovering nodes fetch the application state (checkpoint) and only the small tail of the log. Merkle trees can be used to optimize the transfer of large application states by only sending changed pages.</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">5.2 State Transfer</h3>
                  <p>
                    If a node lags behind (without crashing), it uses GETSTATE messages to fetch missing log entries. If the gap is too large, it may fetch a checkpoint/snapshot similar to a recovering node.
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">5.3 View Changes</h3>
                  <p>
                    To keep view change messages small, replicas can send only a suffix of their log, rather than the whole history, assuming the new primary is likely already up to date.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4">6. Optimizations</h2>
                <p>
                  Techniques to improve throughput and latency:
                </p>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">6.1 Witnesses</h3>
                  <p>
                    In a group of <code className="bg-muted px-1 rounded">2f+1</code>, only <code className="bg-muted px-1 rounded">f+1</code> nodes act as "active" replicas (running service code/storing state). The remaining <code className="bg-muted px-1 rounded">f</code> are "witnesses" that only participate in recovery or view changes. This reduces the number of nodes performing the actual work.
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">6.2 Batching</h3>
                  <p>
                    The primary collects multiple client requests and runs the consensus protocol once for the whole batch, reducing overhead under high load.
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">6.3 Fast Reads</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Reads at Primary:</strong> The primary can execute reads immediately without consulting backups if it holds "leases" ensuring it is still the primary.</li>
                    <li><strong>Reads at Backups:</strong> Backups can serve reads if slightly stale data is acceptable. To ensure causality (a client seeing their own writes), the client tracks their last request number, and backups wait until they have executed up to that point before replying.</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4">7. Reconfiguration</h2>
                <p>
                  This describes how to change the replica group (e.g., replacing a failed node or moving to a new data center) or the failure threshold (<code className="bg-muted px-1 rounded">f</code>).
                </p>

                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li><strong>Mechanism:</strong> Reconfiguration is treated as a special client request (RECONFIGURATION) that transitions the system to a new epoch.</li>
                  <li><strong>The Protocol:</strong>
                    <ol className="list-decimal pl-6 mt-2 space-y-1">
                      <li>The request goes through the normal commitment process in the old group.</li>
                      <li>Once committed, the old group stops processing client requests.</li>
                      <li>The state is transferred to the new group (new nodes are brought up to date).</li>
                      <li>The new group begins processing in the new epoch (starting at view 0).</li>
                    </ol>
                  </li>
                  <li><strong>Safety:</strong> The protocol ensures that the old group stops effectively before the new group starts, preventing "split-brain" scenarios. Old nodes do not shut down until they receive confirmation (EPOCHSTARTED) that the new group is active.</li>
                  <li><strong>Client Redirection:</strong> Clients interacting with the old group are informed of the new configuration via a NEWEPOCH message.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4">8. Correctness</h2>
                <p>
                  An informal discussion of why the protocol is safe and live.
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li><strong>View Changes:</strong> Safety is maintained because the new view's initial state is derived from a quorum of the previous view. The "quorum intersection property" guarantees that at least one node in the new quorum holds all previously committed operations.</li>
                  <li><strong>Recovery:</strong> Correctness relies on the recovering node not participating until it is synced with a current quorum.</li>
                  <li><strong>Reconfiguration:</strong> Because the reconfiguration is a committed operation in the old group, and the new group is initialized from that state, all prior history is preserved.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4">9. Conclusions</h2>
                <p>
                  The paper concludes by summarizing the contributions: a practical, efficient, disk-less replication protocol that handles crash failures, supports dynamic group reconfiguration, and provides high performance through batching and read optimizations.
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

