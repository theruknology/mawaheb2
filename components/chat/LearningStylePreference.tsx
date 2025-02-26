import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface LearningStylePreferenceProps {
  onSelect: (style: string) => void
}

const learningStyles = [
  { name: 'Visual', description: 'Video tutorials, diagrams', icon: '👁️' },
  { name: 'Textual', description: 'Articles, eBooks', icon: '📚' },
  { name: 'Interactive', description: 'Quizzes, projects', icon: '🤝' },
  { name: 'Structured', description: 'Courses with deadlines', icon: '📅' },
]

export default function LearningStylePreference({ onSelect }: LearningStylePreferenceProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">How do you learn best?</h2>
      <div className="grid grid-cols-2 gap-4">
        {learningStyles.map((style) => (
          <Card key={style.name} className="cursor-pointer hover:bg-gray-100" onClick={() => onSelect(style.name)}>
            <CardContent className="p-4 text-center">
              <div className="text-4xl mb-2">{style.icon}</div>
              <h3 className="font-semibold">{style.name}</h3>
              <p className="text-sm text-gray-600">{style.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button className="mt-4 w-full" onClick={() => onSelect('Help me decide')}>
        Help me decide
      </Button>
    </div>
  )
}