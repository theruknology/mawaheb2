// Home Page
'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import TrendingSearches from '@/components/chat/TrendingSearches'
import AssessmentWindow from '@/components/chat/AssessmentWindow'
import { Moon, Sun, Sparkles, ArrowLeft, ArrowRightCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [showAssessment, setShowAssessment] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    if (prompt.trim()) setShowAssessment(true)
  }

  const handleTrendingClick = (search: string) => {
    setPrompt(search)
    handleSubmit()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Top Bar */}
      <div className="absolute top-6 right-6 flex gap-2">
        {showAssessment && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <Button
              variant="outline"
              size="icon"
              className="rounded-lg"
              onClick={() => setShowAssessment(false)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
        <Button
          variant="outline"
          size="icon"
          className="rounded-lg"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl px-4 space-y-8"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-6 space-y-2">
          <Sparkles className="h-8 w-8 text-purple-500 mb-3" />
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100">
            {showAssessment ? "Personal Assessment" : "What would you like to learn?"}
          </h1>
        </div>

        <AnimatePresence mode="wait">
          {!showAssessment ? (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <Input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your learning goal..."
                    className="py-6 text-lg shadow-sm border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 rounded-lg dark:bg-gray-800 flex-1"
                  />
<Button 
  type="submit" 
  className="py-6 px-8 rounded-lg border-2 border-indigo-500 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 font-medium gap-2 transition-all"
>
  Continue
  <ArrowRightCircle className="h-5 w-5 stroke-[1.5]" />
</Button>
                </div>
                <TrendingSearches onSearchClick={handleTrendingClick} />
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="assessment"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <AssessmentWindow prompt={prompt} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}