// TrendingSearches Component
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

const trendingSearches = [
  "Digital Marketing",
  "Machine Learning",
  "Financial Accounting",
  "Sales training",
  "Data structures & algorithms",
]

export default function TrendingSearches({ onSearchClick }: { onSearchClick: (search: string) => void }) {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
        <span className="text-sm font-medium tracking-wide">Popular Topics</span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {trendingSearches.map((search, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant="outline" 
              onClick={() => onSearchClick(search)}
              className="w-full rounded-md justify-start bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300 text-sm font-normal"
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="text-left">{search}</span>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}