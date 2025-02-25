"use client"

import { useState, useEffect } from "react"
import { Resource } from "./resource"
import { motion } from "framer-motion"

type ResourceType = {
  type: string
  title: string
  description: string
  skill: string
  url: string
  impactFactor: number
  alignmentStrategy: string
}

type ResourceListProps = {
  initialResources: ResourceType[]
}

export function ResourceList({ initialResources }: ResourceListProps) {
  const [resources, setResources] = useState<ResourceType[]>([])
  const [typeFilter, setTypeFilter] = useState("all")
  const [sortBy, setSortBy] = useState("impactFactor")

  useEffect(() => {
    setResources([]) // Reset resources when initialResources change
    initialResources.forEach((resource, index) => {
      setTimeout(() => {
        setResources((prev) => [...prev, resource])
      }, index * 300) // Staggered loading effect
    })
  }, [initialResources])

  const filteredResources = resources.filter(
    (resource) => typeFilter === "all" || resource.type === typeFilter
  )

  const sortedResources = [...filteredResources].sort((a, b) =>
    sortBy === "impactFactor" ? b.impactFactor - a.impactFactor : a.title.localeCompare(b.title)
  )

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <label htmlFor="type-filter" className="mr-2">
            Filter by type:
          </label>
          <select
            id="type-filter"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border rounded p-1"
          >
            <option value="all">All</option>
            <option value="course">Course</option>
            <option value="article">Article</option>
            <option value="paper">Paper</option>
          </select>
        </div>
        <div>
          <label htmlFor="sort-by" className="mr-2">
            Sort by:
          </label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded p-1"
          >
            <option value="impactFactor">Impact Factor</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        {sortedResources.map((resource, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Resource resource={resource} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
