"use client"

import { motion } from "framer-motion"

interface RoadmapStep {
  step: number
  title: string
  description: string
  link: string
  duration: string
  skill_category: string
}

interface AdditionalResource {
  title: string
  description: string
  link: string
}


interface AdditionalResourcesProps {
  resources: AdditionalResource[]
}

export default function AdditionalResources({ resources }: AdditionalResourcesProps) {
  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold text-center text-indigo-800 mb-8">Additional Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">{resource.title}</h3>
            <p className="text-gray-600 mb-4">{resource.description}</p>
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Explore Resource
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

