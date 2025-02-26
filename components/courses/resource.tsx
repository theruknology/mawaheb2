// components/chat/resource.tsx
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Book, FileText, GraduationCap, Clock, Star, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

type ResourceProps = {
  resource: {
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
  isTop?: boolean
  highlightArabic?: boolean
}

const getColorClass = (type: string) => {
  switch(type) {
    case 'course': return 'bg-blue-100 dark:bg-blue-900/50 text-blue-600'
    case 'article': return 'bg-green-100 dark:bg-green-900/50 text-green-600'
    case 'paper': return 'bg-purple-100 dark:bg-purple-900/50 text-purple-600'
    default: return 'bg-gray-100'
  }
}

export function Resource({ resource, isTop, highlightArabic }: ResourceProps) {
  const { type, title, description, skill, url, impactFactor, alignmentStrategy, offeredInArabic, duration } = resource

  const getIcon = () => {
    switch (type) {
      case "course": return <GraduationCap className="w-6 h-6" />
      case "article": return <FileText className="w-6 h-6" />
      case "paper": return <Book className="w-6 h-6" />
      default: return null
    }
  }

  return (
    <Card className={`relative ${isTop ? 'border-2 border-blue-500 dark:border-blue-400' : ''}`}>
      {isTop && (
        <Badge className="absolute -top-3 left-4 bg-blue-600 text-white">
          🔥 Top Recommendation
        </Badge>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${getColorClass(type)}`}>
              {getIcon()}
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Badge variant={alignmentStrategy === "global" ? "default" : "secondary"}>
            {alignmentStrategy}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> {duration}
          </Badge>
          
          {offeredInArabic && (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            >
              <Badge 
                variant="outline" 
                className={`flex items-center gap-1 transition-all ${
                  highlightArabic 
                    ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-300 text-emerald-600 dark:text-emerald-300'
                    : ''
                }`}
              >
                <span className="text-lg">🇦🇪</span>
                <span>Arabic Available</span>
                {highlightArabic && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-1"
                  >
                    ✨
                  </motion.span>
                )}
              </Badge>
            </motion.div>
          )}

          <Badge variant="outline">{skill}</Badge>
        </div>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </CardContent>

      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="font-medium">Relevance: {impactFactor.toFixed(2)}</span>
        </div>
        <Button asChild className="gap-2">
          <a href={url} target="_blank" rel="noopener noreferrer">
            Explore Content
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}