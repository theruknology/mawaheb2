"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface RoadmapStep {
  step: number
  title: string
  description: string
  link: string
  duration: string
  skill_category: string
}

interface RoadmapTimelineProps {
  roadmap: RoadmapStep[]
}

export default function RoadmapTimeline({ roadmap }: RoadmapTimelineProps) {
  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gray-200"></div>
      {roadmap.map((step, index) => (
        <motion.div
          key={step.step}
          className={`flex items-center mb-16 ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="w-1/2 px-6">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">{step.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {step.duration}
                </span>
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                  {step.skill_category}
                </span>
              </div>
              <a
                href={step.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Learn More
                <ArrowRight className="ml-1 w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="w-12 h-12 bg-white border-4 border-indigo-500 rounded-full flex items-center justify-center text-indigo-500 font-bold z-10 shadow-md">
            {step.step}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

