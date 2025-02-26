// components/chat/resource-list.tsx
"use client"

import { useState, useEffect } from "react"
import { Resource } from "./resource"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, ArrowUp, Clock, Star, ArrowUpRight, Check, Languages } from "lucide-react"

type ResourceType = {
  type: string
  title: string
  description: string
  skill: string
  url: string
  impactFactor: number
  alignmentStrategy: string
  offeredInArabic: boolean
  duration: string
}

type ResourceListProps = {
  initialResources: ResourceType[]
}

export function ResourceList({ initialResources }: ResourceListProps) {
  const [resources, setResources] = useState<ResourceType[]>([])
  const [filters, setFilters] = useState({
    type: "all",
    arabic: false,
    sortBy: "impactFactor"
  })
  const [isFiltering, setIsFiltering] = useState(false)

  useEffect(() => {
    setResources([])
    initialResources.forEach((resource, index) => {
      setTimeout(() => {
        setResources((prev) => [...prev, resource])
      }, index * 300)
    })
  }, [initialResources])

  const handleArabicFilter = () => {
    setIsFiltering(true)
    setTimeout(() => setIsFiltering(false), 500)
    setFilters(prev => ({...prev, arabic: !prev.arabic}))
  }

  const filteredResources = resources.filter(resource => 
    (filters.type === "all" || resource.type === filters.type) &&
    (!filters.arabic || resource.offeredInArabic)
  )

  const sortedResources = [...filteredResources]
    .sort((a, b) => filters.sortBy === "impactFactor" ? 
      b.impactFactor - a.impactFactor : 
      a.title.localeCompare(b.title))
    .map((resource, index) => ({
      ...resource,
      isTop: index < 1 && filters.sortBy === "impactFactor"
    }))

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-4 items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={filters.type}
            onChange={e => setFilters({...filters, type: e.target.value})}
            className="rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2"
          >
            <option value="all">All Types</option>
            <option value="course">Courses</option>
            <option value="article">Articles</option>
            <option value="paper">Papers</option>
          </select>
        </div>

<motion.div
  whileHover={{ scale: 1.05 }}
  className="flex items-center gap-2"
>
  <button
    onClick={handleArabicFilter}
    className={`relative h-11 w-28 rounded-full p-1 transition-all duration-300 ${
      filters.arabic 
        ? 'bg-gradient-to-r from-[#d4af37] to-white' // Saudi flag colors
        : 'bg-gray-200 dark:bg-gray-700'
    }`}
  >
    <motion.div
      className={`absolute top-1 h-9 w-9 rounded-full bg-white dark:bg-gray-100 flex items-center justify-center shadow-md ${
        filters.arabic ? 'left-[calc(100%-2.5rem)]' : 'left-1'
      }`}
      initial={false}
      animate={{ 
        x: filters.arabic ? 'calc(100% - 2.5rem)' : 0,
        backgroundColor: filters.arabic ? '#fff' : '#fff'
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {filters.arabic ? (
        <span className="text-xl font-arabic text-[#006233]">ع</span> // Arabic 'Ayn' character
      ) : (
        <span className="text-xl font-arabic text-black">ع</span> // Arabic 'Ayn' character
      )}
    </motion.div>
  </button>
  <span className="text-sm font-medium">
    {filters.arabic ? "عربي" : "Arabic Content"}
  </span>
</motion.div>

        <div className="flex items-center gap-2">
          <ArrowUp className="h-5 w-5 text-gray-500" />
          <select
            value={filters.sortBy}
            onChange={e => setFilters({...filters, sortBy: e.target.value})}
            className="rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2"
          >
            <option value="impactFactor">Sort by Relevance</option>
            <option value="title">Sort A-Z</option>
          </select>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isFiltering ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center py-8"
          >
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-6 md:grid-cols-1 lg:grid-cols-1"
          >
            {sortedResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Resource 
                  resource={resource} 
                  isTop={resource.isTop}
                  highlightArabic={filters.arabic}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}