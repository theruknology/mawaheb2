// SkillInput.tsx
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Rocket, Settings, Star, ArrowRightCircle, Plus, X } from "lucide-react"

interface SkillInputProps {
  onComplete: (skills: { skill: string; level: string }[]) => void
}

const skillLevels = [
  { name: 'Beginner', icon: Rocket, color: 'text-blue-500', bg: 'bg-blue-100/50', border: 'border-blue-200' },
  { name: 'Intermediate', icon: Settings, color: 'text-purple-500', bg: 'bg-purple-100/50', border: 'border-purple-200' },
  { name: 'Advanced', icon: Star, color: 'text-orange-500', bg: 'bg-orange-100/50', border: 'border-orange-200' },
]

export default function SkillInput({ onComplete }: SkillInputProps) {
  const [skills, setSkills] = useState<{ skill: string; level: string }[]>([])
  const [currentSkill, setCurrentSkill] = useState('')

  const handleAddSkill = (level: string) => {
    if (currentSkill.trim()) {
      setSkills(prev => [...prev, { skill: currentSkill.trim(), level }])
      setCurrentSkill('')
    }
  }

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          Skill Inventory
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-3">
            <Input
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              placeholder="Type a skill..."
              className="h-12 px-4 text-base"
              // startAdornment={<Rocket className="h-5 w-5 text-muted-foreground mr-2" />}
            />
            
            <div className="grid grid-cols-3 gap-3">
              {skillLevels.map(({ name, icon: Icon, color, bg, border }) => (
                <Button
                  key={name}
                  variant="outline"
                  className={`h-16 flex flex-col gap-1 ${color} ${border} hover:${border} hover:border-2`}
                  onClick={() => handleAddSkill(name)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{name}</span>
                </Button>
              ))}
            </div>
          </div>

          {skills.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Your Skills:</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => {
                  const level = skillLevels.find(l => l.name === skill.level)!
                  return (
                    <Badge 
                      key={index}
                      variant="outline"
                      className={`${level.bg} ${level.border} pl-2.5 pr-1 py-1 rounded-lg group`}
                    >
                      <div className="flex items-center gap-1.5">
                        <level.icon className={`h-4 w-4 ${level.color}`} />
                        <span className="text-sm font-medium">{skill.skill}</span>
                        <button
                          onClick={() => handleRemoveSkill(index)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 p-1 rounded-full hover:bg-black/5"
                          aria-label="Remove skill"
                        >
                          <X className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      </div>
                    </Badge>
                  )})}
              </div>
            </div>
          )}

          <Button 
            className="w-full h-12 gap-2 transition-all" 
            onClick={() => onComplete(skills)}
          >
            {skills.length > 0 ? (
              <>
                Generate Roadmap
                <ArrowRightCircle className="h-4 w-4" />
              </>
            ) : (
              "Start Fresh - No Skills Added"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}