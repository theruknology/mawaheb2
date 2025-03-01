"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, BookText, Clock, Rocket } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

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
  userName?: string
}

export default function RoadmapTimeline({ roadmap, userName }: RoadmapTimelineProps) {
  const [activeHoverStep, setActiveHoverStep] = useState<number | null>(null)

  const handleRecommendationClick = (title: string) => {
    localStorage.setItem("currentStep", title)
    window.location.href = "/dashboard/recommended"
  }

  return (
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Personalized Header */}
      <div className="text-center mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Rocket className="w-12 h-12 text-pink-500 mx-auto mb-4 animate-bounce" />
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
            Your Learning Journey
          </h1>
          {userName && (
            <p className="mt-3 md:mt-4 text-lg md:text-xl text-gray-600">
              Ready to level up, {userName}? 🚀
            </p>
          )}
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <AnimatePresence>
          {roadmap.map((step, index) => (
            <motion.div
              key={step.step}
              className="flex flex-col md:flex-row items-start md:items-center mb-12 md:mb-16 group"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverEnd={() => setActiveHoverStep(null)}
            >
              {/* Progress Line */}
              <div className="hidden md:block w-12 mr-8 relative">
                {/* <div className="absolute left-6 -inset-y-8 w-px bg-gradient-to-b from-transparent via-indigo-300 to-transparent z-[9]" /> */}
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-pink-400 border-4 border-white rounded-full flex items-center justify-center text-white font-bold z-10 shadow-lg">
                  {step.step}
                </div>
              </div>

              {/* Mobile Step Number */}
              <div className="md:hidden w-full flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-pink-400 border-2 border-white rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md mr-3">
                  {step.step}
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-indigo-200 to-pink-200" />
              </div>

              {/* Content Card */}
              <div className="flex-1 relative w-full">
                <motion.div
                  className={cn(
                    "bg-white rounded-xl shadow-lg p-6 border-2 border-indigo-50",
                    "hover:shadow-xl hover:border-indigo-100 transition-all duration-300",
                    "relative group-hover:scale-[1.005]"
                  )}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-50 to-pink-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative">
                    <div className="relative">
                      <h3 
                        className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 cursor-pointer hover:text-indigo-600 transition-colors"
                        onMouseEnter={() => setActiveHoverStep(step.step)}
                        onClick={() => window.innerWidth < 768 && handleRecommendationClick(step.title)}
                      >
                        {step.title}
                      </h3>
                      
                      <AnimatePresence>
                        {(activeHoverStep === step.step && window.innerWidth >= 768) && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute z-10 top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100"
                          >
                            <div className="p-2">
                              <button
                                onClick={() => handleRecommendationClick(step.title)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 rounded-md flex items-center"
                              >
                                <BookText className="w-4 h-4 mr-2 text-indigo-600" />
                                Recommended Resources
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <p className="text-gray-600 mb-4 text-base md:text-lg leading-relaxed">
                      {step.description}
                    </p>
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-pink-500" />
                        {step.duration}
                      </span>
                      <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium">
                        {step.skill_category}
                      </span>
                    </div>
                    
                    <a
                      href={step.link}
                      target="_blank"
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-800 group transition-colors text-sm md:text-base"
                    >
                      <span className="mr-2">Explore this topic</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}