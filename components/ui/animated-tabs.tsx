"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"

interface ProjectTab {
  id: string
  title: string
  description: string
  tech: string[]
  github: string
  image: string
}

const projectTabs: ProjectTab[] = [
  {
    id: "infoblend",
    title: "InfoBlend AI",
    description: "A Manifest V3 Chrome extension that augments web browsing with in-page definitions, extractive page summaries, ad blocking, and intelligent form auto-fill — all executed client-side using LLMs.",
    tech: ["JavaScript", "Chrome Extension APIs", "LLM APIs"],
    github: "https://github.com/RIxiV1/InfoBlend",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
  },
  {
    id: "subsentry",
    title: "SubSentry",
    description: "A subscription tracker that helps you stop losing money to forgotten subscriptions. Clean UI, secure, built with TypeScript.",
    tech: ["TypeScript", "Next.js", "Tailwind CSS"],
    github: "https://github.com/RIxiV1/SubSentry",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
  },
  {
    id: "resume-agent",
    title: "Resume Screening Agent",
    description: "AI-powered resume screening agent built with n8n and Lovable. Candidates upload a PDF resume and JD; the workflow scores the match with an LLM and returns a structured report with score, summary, and recommendations.",
    tech: ["TypeScript", "n8n", "LLM APIs"],
    github: "https://github.com/RIxiV1/Resume-Screening-Agent",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800",
  },
  {
    id: "jarvis",
    title: "Jarvis",
    description: "A voice-activated AI assistant that responds to commands using speech recognition and OpenAI — plays music, answers questions, and opens websites completely hands-free.",
    tech: ["Python", "OpenAI API", "Speech Recognition"],
    github: "https://github.com/RIxiV1/Jarvis",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800",
  },
]

export function AnimatedTabs() {
  const [activeTab, setActiveTab] = useState(projectTabs[0].id)

  const activeProject = projectTabs.find((tab) => tab.id === activeTab)

  return (
    <div className="w-full rounded-xl bg-[#11111198] backdrop-blur-sm p-4 md:p-6">
      {/* Tab Headers */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-4">
        {projectTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors",
              activeTab === tab.id
                ? "text-white"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-slate-800 rounded-lg"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.title}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeProject && (
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {/* Image */}
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="h-60 w-full object-cover rounded-lg"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {activeProject.title}
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed mb-4">
                  {activeProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {activeProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-slate-800 border border-slate-700 px-2 py-0.5 text-xs text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={activeProject.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InteractiveHoverButton text="View on GitHub" className="text-sm" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
