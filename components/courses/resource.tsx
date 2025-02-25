import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Book, FileText, GraduationCap } from "lucide-react"

type ResourceProps = {
  resource: {
    type: string
    title: string
    description: string
    skill: string
    url: string
    impactFactor: number
    alignmentStrategy: string
  }
}

export function Resource({ resource }: ResourceProps) {
  const { type, title, description, skill, url, impactFactor, alignmentStrategy } = resource

  const getIcon = () => {
    switch (type) {
      case "course":
        return <GraduationCap className="w-6 h-6" />
      case "article":
        return <FileText className="w-6 h-6" />
      case "paper":
        return <Book className="w-6 h-6" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getIcon()}
            <CardTitle>{title}</CardTitle>
          </div>
          <Badge variant={alignmentStrategy === "global" ? "default" : "secondary"}>{alignmentStrategy}</Badge>
        </div>
        <CardDescription>{skill}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div>Impact: {impactFactor.toFixed(2)}</div>
        <Button asChild>
          <a href={url} target="_blank" rel="noopener noreferrer">
            Learn More
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

