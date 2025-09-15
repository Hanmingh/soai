export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Title band */}
      <section className="py-16 bg-[#003d7b]">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Society of Algorithmic Intelligence (SoAI)
          </h1>
        </div>
      </section>

      {/* Narrative */}
      <section id="about-us" className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-lg leading-8 text-gray-800 space-y-6">
            <p>
              The Society of Algorithmic Intelligence (SoAI) is a global community dedicated to advancing the science and practice of intelligent algorithms. We bring together leading minds from academia, industry, and government to explore the frontiers of artificial intelligence, machine learning, optimization, high-performance computing, and quantum technologies.
            </p>
            <p>
              At SoAI, we believe that algorithms are the foundation of intelligent systems shaping the future of finance, healthcare, engineering, and beyond. Our mission is to foster international collaboration, interdisciplinary research, and innovative education that empower the next generation of researchers and practitioners.
            </p>
            <p>
              Through world-class conferences, workshops, training programs, and strategic partnerships, the Society creates a unique platform where ideas move seamlessly from theory to real-world impact. By bridging academic rigor with industry application, SoAI supports a vibrant ecosystem for knowledge exchange, capacity building, and technological innovation.
            </p>
            <p>
              Society of Algorithmic Intelligence (SoAI) is a non-profit society registered in Singapore under the Societies Act. Our Constitution prohibits any distribution of profits to members; all funds are applied to our educational and research objectives. Accounts are tabled at the AGM and available on request, and officers are only reimbursed for approved expenses or paid reasonable honoraria for services rendered.
            </p>
            <p>
              Join us in building a globally connected, future-ready society where advanced algorithms drive human progress and technological breakthroughs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
