// app/recommendations/page.tsx
import { ResourceList } from "./resource-list"

const resources = [
  {
    type: "course",
    title: "Python for Everybody Specialization",
    description: "Comprehensive Python course covering basics to data structures, taught by University of Michigan.",
    skill: "Python",
    url: "https://www.coursera.org/specializations/python",
    impactFactor: 0.95,
    alignmentStrategy: "global",
    offeredInArabic: true,
    duration: "6 weeks"
  },
  {
    type: "course",
    title: "Dynamic Public Speaking Specialization",
    description: "Develop essential public speaking skills with focus on verbal communication and presentation techniques.",
    skill: "Public Speaking",
    url: "https://www.coursera.org/specializations/public-speaking",
    impactFactor: 0.85,
    alignmentStrategy: "global",
    offeredInArabic: false,
    duration: "8 weeks"
  },
  {
    type: "course",
    title: "Machine Learning with Python",
    description: "Learn machine learning techniques and algorithms using Python, aligned with UAE's AI strategy.",
    skill: "Machine Learning",
    url: "https://www.edoxi.com/python-machine-learning-training",
    impactFactor: 0.8,
    alignmentStrategy: "UAE",
    offeredInArabic: true,
    duration: "10 weeks"
  },
  {
    type: "article",
    title: "Python Data Science Handbook",
    description: "Comprehensive guide to essential tools for data science in Python, including NumPy, Pandas, and Matplotlib.",
    skill: "Python",
    url: "https://jakevdp.github.io/PythonDataScienceHandbook/",
    impactFactor: 0.9,
    alignmentStrategy: "global",
    offeredInArabic: false,
    duration: "Self-paced"
  },
  {
    type: "course",
    title: "ImagiCharm Python Course",
    description: "Interactive Python course using wearable devices, part of Abu Dhabi's initiative to enhance coding skills in schools.",
    skill: "Python",
    url: "https://gulfnews.com/uae/education/abu-dhabi-launches-new-projects-to-develop-coding-skills-in-schools-1.104520517",
    impactFactor: 0.75,
    alignmentStrategy: "UAE",
    offeredInArabic: true,
    duration: "4 weeks"
  },
  {
    type: "paper",
    title: "An Experience Report of Executive-Level Artificial Intelligence Education in the UAE",
    description: "Research paper discussing AI education for business executives in the UAE, aligning with national AI strategies.",
    skill: "Machine Learning",
    url: "https://ojs.aaai.org/index.php/AAAI/article/view/21555/21304",
    impactFactor: 0.85,
    alignmentStrategy: "both",
    offeredInArabic: true,
    duration: "30 pages"
  },
  {
    type: "course",
    title: "National Undergraduate Public Speaking and Debate Competition",
    description: "UAE-based competition focusing on public speaking and debate skills, with a theme of sustainability.",
    skill: "Public Speaking",
    url: "https://www.zawya.com/en/press-release/companies-news/abu-dhabi-university-empowers-future-leaders-through-national-public-speaking-competitions-dy2b59sx",
    impactFactor: 0.7,
    alignmentStrategy: "UAE",
    offeredInArabic: true,
    duration: "2 days"
  },
]

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Personalized Learning Recommendations
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Curated resources based on your skills and preferences
        </p>
      </div>
      <ResourceList initialResources={resources} />
    </div>
  )
}