import { Link } from "react-router-dom";
import vishalImg from "@/assets/IntelligenceX/Vishal.png";

export default function IntelligenceX2026Tutorials() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-5xl space-y-10">

          {/* Back link */}
          <div>
            <Link to="/events/intelligencex-2026" className="text-sm text-[#003d7b] hover:underline">
              ← Back to Event
            </Link>
          </div>

          {/* Header */}
          <div>
            <p className="text-sm font-semibold text-[#ee7c01] uppercase tracking-wide mb-2">
              IntelligenceX 2026 · 25 September 2026
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Hands-On Tutorials
            </h1>
            <p className="text-[#003d7b] font-medium">
              Limited Seats | Deep-Dive | Learn by Building
            </p>
          </div>

          {/* Overview */}
          <section className="space-y-4 rounded-lg border border-gray-200 bg-[#f9fafb] p-6 md:p-8">
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              As part of IntelligenceX 2026: Global Quantum × AI Frontier, we are offering a curated series of 3-hour
              intensive hands-on tutorials (tentatively scheduled for 25 September), designed for participants who want
              to go beyond theory and build real, working systems.
            </p>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              Each tutorial is highly interactive, led by leading experts from academia and industry, and focuses on
              practical implementation—not just concepts.
            </p>

            <ol className="list-decimal pl-6 space-y-4 text-gray-800 leading-relaxed text-sm md:text-base">
              <li>
                <span className="font-semibold text-gray-900">Quantum Computing: 3-Hour Hands-On Tutorial</span>
                <span className="block mt-1 text-gray-600">From Fundamentals to Algorithms &amp; Implementation</span>
                <span className="block mt-0.5 text-sm text-[#003d7b] font-medium">
                  Led by Vishal Bajpe — IBM Quantum, Singapore
                </span>
                <span className="block mt-1 font-normal">
                  This session provides a structured and practical introduction to quantum computing, bridging theory
                  and real-world applications — from core principles through live experiments on IBM quantum hardware.
                </span>
                <a
                  href="#vishal-qc-tutorial-post"
                  className="mt-2 inline-flex text-sm font-semibold text-[#003d7b] hover:underline"
                >
                  Read tutorial spotlight: Quantum Computing with Vishal Bajpe (IBM Quantum)
                </a>
              </li>
              <li>
                <span className="font-semibold text-gray-900">AI for Coding: 3-Hour Hands-On Tutorial</span>
                <span className="block mt-1 text-gray-600">Build Your Own Intelligent Development Workflows</span>
                <span className="block mt-0.5 text-sm text-[#003d7b] font-medium">
                  Led by Prof. Dr. Thorsten Koch — TU Berlin &amp; Zuse Institute Berlin, Germany
                </span>
                <span className="block mt-1 font-normal">
                  This tutorial focuses on using AI coding agents for code generation, debugging, and optimization,
                  enabling you to leverage AI as a coding co-pilot to significantly improve productivity and code quality.
                </span>
                <a
                  href="#thorsten-agentic-coding-post"
                  className="mt-2 inline-flex text-sm font-semibold text-[#003d7b] hover:underline"
                >
                  Read tutorial spotlight: Hands-on Agentic Coding with Prof. Dr. Thorsten Koch
                </a>
              </li>
              {/* AI Algorithmic Trading tutorial — not yet finalized, temporarily hidden
              <li>
                <span className="font-semibold text-gray-900">AI Algorithmic Trading: 3-Hour Hands-On Tutorial</span>
                <span className="block mt-1">From Strategy to Execution</span>
                <span className="block mt-1 font-normal">
                  A practical, end-to-end session on designing and implementing algorithmic trading strategies in modern
                  markets.
                </span>
              </li>
              */}
            </ol>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">🎯 Key Features</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-800 leading-relaxed text-sm md:text-base">
                <li>Hands-on, code-driven sessions (bring your laptop)</li>
                <li>Real datasets and practical use cases</li>
                <li>Small-group setting for close interaction</li>
                <li>Direct engagement with leading experts</li>
              </ul>
            </div>

            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              <span className="font-semibold">⚠️ Limited seats</span> available to ensure a high-quality learning experience.
              Early registration is strongly recommended.
            </p>
            <p className="text-sm text-gray-600">
              You may indicate a tutorial preference when you{" "}
              <Link to="/events/intelligencex-2026/register" className="font-semibold text-[#003d7b] hover:underline">
                register
              </Link>
              ; preference is optional and subject to capacity (see registration form for details).
            </p>
          </section>

          {/* Tutorial Spotlight */}
          <section
            id="thorsten-agentic-coding-post"
            className="space-y-6 rounded-lg border border-[#cddcf0] bg-[#f4f8ff] p-6 md:p-8 scroll-mt-28"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-start">
              <img
                src="/leadership/Thorsten.png"
                alt="Prof. Dr. Thorsten Koch"
                className="h-56 w-56 rounded-lg object-cover shadow-sm"
                loading="lazy"
              />
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#003d7b]">
                  Tutorial Spotlight
                </p>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Hands-on Agentic Coding (3-hour course)
                </h2>
                <p className="text-gray-700 text-sm md:text-base">
                  Led by <span className="font-semibold">Prof. Dr. Thorsten Koch</span> (TU Berlin &amp; Zuse Institute
                  Berlin)
                </p>
                <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                  This intensive tutorial introduces participants to agentic coding, where software agents autonomously
                  plan, execute, and iterate on complex tasks. Through guided exercises, attendees will build practical
                  agent workflows and integrate external development tools.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">About Prof. Dr. Thorsten Koch</h3>
              <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                Prof. Dr. Thorsten Koch is Professor for Software and Algorithms for Discrete Optimization at TU-Berlin
                and head of the Applied Optimization and the Digital Data and Information for Society, Science, and
                Culture departments at the Zuse Institute Berlin (ZIB). With more than 40 years of experience in software
                development, he has worked in several areas, particularly infrastructure network planning, chip
                verification, mathematical education, and integer optimization. From 2000-2020, he led the efforts on
                developing Integer Programming Solvers at ZIB, including the SCIP development.
              </p>
              <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                From 2008-2014, he was the coordinator of the FORNE project, an industry collaboration project regarding
                gas transportation involving five universities and two research institutes. The project received the 2016
                EURO Excellence in Practice Award of the European OR Society.
              </p>
              <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                From 2013-2019, he was head of the GasLab within the Research Campus MODAL. The project
                Optimized Execution of Dispatching, conducted together with Germany's largest Gas Transmission System
                Operator, became a finalist of the 2020 INFORMS Innovative Applications in Analytics Award.
              </p>
              <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                Currently, the work is focused on developing high-performance methods for solving large-scale structured
                optimization problems using multi-core CPUs, GPUs, and Quantum computing.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Tutorial Abstract</h3>
              <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                This intensive 3-hour course introduces participants to the emerging paradigm of agentic coding, where
                software agents autonomously plan, execute, and iterate on complex tasks. Moving beyond traditional
                prompt-based interactions, learners will explore how to design, orchestrate, and supervise AI agents that
                can write code, debug systems, and interact with tools in dynamic environments.
              </p>
              <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                Through a series of guided, hands-on exercises, participants will build and deploy simple agent workflows,
                integrate external tools (such as APIs and development environments), and experiment with multi-step
                reasoning and decision-making loops. The course emphasizes practical implementation, covering core concepts
                like task decomposition, memory handling, tool usage, and feedback-driven refinement.
              </p>
              <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                By the end of the session, attendees will have a working understanding of agent architectures and the
                confidence to prototype their own agentic coding systems for real-world applications. This course is ideal
                for developers, technical product builders, and AI enthusiasts looking to move from passive AI use to
                active system design.
              </p>
            </div>
          </section>

          {/* Tutorial Spotlight — Vishal Bajpe */}
          <section
            id="vishal-qc-tutorial-post"
            className="space-y-6 rounded-lg border border-[#cddcf0] bg-[#f4f8ff] p-6 md:p-8 scroll-mt-28"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-start">
              <img
                src={vishalImg}
                alt="Vishal Bajpe"
                className="h-56 w-56 rounded-lg object-cover shadow-sm"
                loading="lazy"
              />
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#003d7b]">
                  Tutorial Spotlight
                </p>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Quantum Computing: From Fundamentals to Algorithms &amp; Implementation (3-hour course)
                </h2>
                <p className="text-gray-700 text-sm md:text-base">
                  Led by <span className="font-semibold">Vishal Bajpe</span> (IBM Quantum, Singapore)
                </p>
                <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                  This hands-on tutorial bridges quantum theory and real-world implementation, taking participants from
                  core principles through practical algorithms and live experiments on IBM quantum hardware via the
                  Qiskit ecosystem.
                </p>
                <a
                  href="https://www.linkedin.com/in/vishal-bajpe/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#003d7b] hover:underline"
                >
                  LinkedIn →
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">About Vishal Bajpe</h3>
              <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                Vishal Bajpe is a Quantum Algorithm Engineer at IBM Quantum, based in Singapore. His work spans quantum
                optimization, quantum chemistry, and quantum machine learning, with a focus on the error mitigation
                needed to trust results from today's quantum processors. Alongside the algorithm work, he helps
                universities and research groups elevate their projects into utility-scale experiments on IBM hardware,
                and contributes tutorials to the Qiskit ecosystem.
              </p>
              <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                He got his start at IBM building quantum communities, leading IBM Quantum Challenges and driving partner
                engagement for Quantum Innovation Centers across APAC and EMEA. Community has stayed part of the job
                ever since.
              </p>
            </div>
          </section>

          {/* Back link bottom */}
          <div className="pt-4">
            <Link to="/events/intelligencex-2026" className="text-sm text-[#003d7b] hover:underline">
              ← Back to Event
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
