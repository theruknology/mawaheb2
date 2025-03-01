// AssessmentWindow.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import LearningStylePreference from './LearningStylePreference'
import SkillInput from './SkillInput'
import { Rocket, Loader } from 'lucide-react'
import { useRouter } from 'next/navigation' // Changed from redirect to useRouter

interface AssessmentWindowProps {
  prompt: string
}

const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30
}

export default function AssessmentWindow({ prompt }: AssessmentWindowProps) {
  const router = useRouter() // Added client-side router
  const [step, setStep] = useState(1)
  const [learningStyle, setLearningStyle] = useState('')
  const [skills, setSkills] = useState<{ skill: string; level: string }[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Accept selectedSkills as parameter
  const handleComplete = (selectedSkills: { skill: string; level: string }[]) => {
    setIsSubmitting(true)
    const userInfo = {
      prompt,
      learningStyle,
      skills: selectedSkills,
    }

    console.log('Saving skills:', selectedSkills) // Debug log
    localStorage.setItem('userInfo', JSON.stringify(userInfo))

    fetch('http://localhost:8000/get_roadmap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    })
    .then(response => response.json())
    .then(data => {
      console.log('API response:', data)
      localStorage.setItem('roadmap', JSON.stringify(data))
      setIsSubmitting(false)
      router.push('/dashboard/roadmap') // Client-side navigation
    })
    .catch(error => {
      console.error('Error:', error)
      setIsSubmitting(false)
      router.push('/dashboard/roadmap') // Client-side navigation
    })
  }

  return (
    <Card className="w-full max-w-2xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springTransition}
      >
        <CardContent className="p-8">
          {/* Progress Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center justify-between">
              <motion.div
                className="w-full bg-muted rounded-full h-3"
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="bg-gradient-to-r from-blue-400 to-purple-400 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / 2) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </motion.div>
              <motion.span 
                className="ml-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                {step}/2
              </motion.span>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <Rocket className="h-8 w-8 text-primary mx-auto mb-2" />
              <h2 className="text-2xl font-bold tracking-tight">
                {step === 1 ? "Learning Preferences" : "Skill Inventory"}
              </h2>
            </motion.div>
          </div>

          {/* Content Area */}
          <div className="min-h-[400px] relative">
            <AnimatePresence mode='wait'>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: step === 1 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: step === 1 ? 20 : -20 }}
                transition={{ duration: 0.3 }}
                className="absolute w-full"
              >
                {step === 1 ? (
                  <LearningStylePreference 
                    onSelect={(style) => {
                      setLearningStyle(style)
                      setStep(2)
                    }} 
                  />
                ) : (
                  <SkillInput 
                    onComplete={(selectedSkills) => {
                      setSkills(selectedSkills)
                      handleComplete(selectedSkills) // Pass skills directly
                    }} 
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Loading State */}
          <AnimatePresence>
            {isSubmitting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg"
              >
                <Loader className="h-8 w-8 text-primary animate-spin" />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </motion.div>
    </Card>
  )
}