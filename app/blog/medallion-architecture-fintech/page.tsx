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
                Wednesday, January 15, 2025
              </p>
              <h1 className="text-4xl font-bold mb-4">
                Building Enterprise Data Pipelines: The Medallion Architecture in Fintech
              </h1>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs transition-colors border-transparent bg-secondary text-secondary-foreground">
                  Data Engineering
                </span>
                <span className="inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs transition-colors border-transparent bg-secondary text-secondary-foreground">
                  Backend Development
                </span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none space-y-6 text-foreground/90 leading-relaxed">
              <p>
                During the past summer (2025), I had the opportunity to work as a Data Engineer at a fintech company called Trepp. Trepp collects commercial real estate data, which it then transforms, models, and commercializes for downstream customers.
              </p>

              <p>
                Because the true value of the company lies within its data, the engineering standards are incredibly high. While working there, we utilized a design pattern known as the <strong>Medallion Architecture</strong>. Essentially, this architecture divides the entire data pipeline into three distinct layers: Bronze, Silver, and Gold.
              </p>

              <div className="space-y-4 my-8">
                <div>
                  <h3 className="text-xl font-semibold mb-2">1. Bronze</h3>
                  <p>Contains raw data exactly as it arrives from various sources.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">2. Silver</h3>
                  <p>Improves data quality and prepares it for analytics (cleansing and standardization).</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">3. Gold</h3>
                  <p>Optimizes data for dashboards, business reporting, and machine learning models.</p>
                </div>
              </div>

              <div className="my-8">
                <img 
                  src="/blog-images/tlayers.webp" 
                  alt="Medallion Architecture Layers" 
                  className="w-full rounded-lg"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4">Why use the Medallion Architecture?</h2>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>Clear Lineage:</strong> Data progression is simple and logical, providing clear lineage and easier auditability.
                  </li>
                  <li>
                    <strong>Modularity:</strong> You can treat the three layers almost like microservices; each layer operates independently, making it easier to plug in or remove specific components without breaking the whole chain.
                  </li>
                </ol>
              </div>

              <div>
                <h2 className="text-2xl font-bold mt-8 mb-4">The Trepp Implementation:</h2>
                <p>
                  To make this clear from an enterprise perspective, let me explain how we applied this at Trepp using AWS Step Functions, Lambda, Apache Spark, and Apache Hudi.
                </p>

                <div className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">1. Bronze Layer (Ingestion)</h3>
                    <p>
                      We used AWS Step Functions to orchestrate the workflow. The process kicked off with custom AWS Lambda scripts that fetched raw data from various external sources. We ingested this data exactly as-is into an S3 bucket, storing it as raw Parquet files. Storing it in Parquet at this stage compressed the data and made it efficient to read later, even though the content was still messy and unsorted.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">2. Silver Layer (The Transformation)</h3>
                    <p>
                      This is where the heavy lifting happened. We used Apache Spark to read the raw Bronze data and apply transformations. One of the specific pipelines I worked on was an address standardization pipeline.
                    </p>
                    <p className="mt-3">
                      <strong>Why is this pipeline critical?</strong>
                    </p>
                    <p>
                      To a computer, "123 Main St." and "123 Main Street" look like completely different entities. The Silver layer standardizes these addresses into a universal format to ensure data integrity.
                    </p>
                    <p className="mt-3">
                      Once the data was cleaned, we stored it using Apache Hudi. An important feature of Hudi here was incremental ingestion. Instead of reprocessing the entire historical dataset every day, Hudi allowed us to process only the new or changed data coming from Bronze, significantly reducing our compute costs and processing time.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">3. Gold Layer (Business Value)</h3>
                    <p>
                      Finally, for the Gold layer, we used Spark to transform the clean Hudi tables into reformatted models for specific use cases. This data is what actually powers the BI dashboards, Machine Learning models, and client-facing APIs. Because of standardization was done in Silver, the Gold layer queries are fast and reliable.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-8">
                This is just a snapshot of how big companies handle data. Trepp runs a lot of different pipelines, but I think this one does the best job of showing how the Medallion Architecture actually works in the real world.
              </p>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </main>
  )
}

