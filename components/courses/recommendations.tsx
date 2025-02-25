import { ResourceList } from "./resource-list"

// This data would typically come from an API or database
const resources = [
  {
    type: "course",
    title: "Python for Everybody Specialization",
    description: "Comprehensive Python course covering basics to data structures, taught by University of Michigan.",
    skill: "Python",
    url: "https://www.coursera.org/specializations/python",
    impactFactor: 0.95,
    alignmentStrategy: "global",
  },
  {
    type: "course",
    title: "Dynamic Public Speaking Specialization",
    description:
      "Develop essential public speaking skills with a focus on verbal communication and presentation techniques.",
    skill: "Public Speaking",
    url: "https://www.coursera.org/specializations/public-speaking",
    impactFactor: 0.85,
    alignmentStrategy: "global",
  },
  {
    type: "course",
    title: "Machine Learning with Python",
    description: "Learn machine learning techniques and algorithms using Python, aligned with UAE's AI strategy.",
    skill: "Machine Learning",
    url: "https://www.edoxi.com/python-machine-learning-training",
    impactFactor: 0.8,
    alignmentStrategy: "UAE",
  },
  {
    type: "article",
    title: "Python Data Science Handbook",
    description:
      "Comprehensive guide to essential tools for data science in Python, including NumPy, Pandas, and Matplotlib.",
    skill: "Python",
    url: "https://jakevdp.github.io/PythonDataScienceHandbook/",
    impactFactor: 0.9,
    alignmentStrategy: "global",
  },
  {
    type: "course",
    title: "ImagiCharm Python Course",
    description:
      "Interactive Python course using wearable devices, part of Abu Dhabi's initiative to enhance coding skills in schools.",
    skill: "Python",
    url: "https://gulfnews.com/uae/education/abu-dhabi-launches-new-projects-to-develop-coding-skills-in-schools-1.104520517",
    impactFactor: 0.75,
    alignmentStrategy: "UAE",
  },
  {
    type: "paper",
    title: "An Experience Report of Executive-Level Artificial Intelligence Education in the UAE",
    description:
      "Research paper discussing AI education for business executives in the UAE, aligning with national AI strategies.",
    skill: "Machine Learning",
    url: "https://ojs.aaai.org/index.php/AAAI/article/view/21555/21304",
    impactFactor: 0.85,
    alignmentStrategy: "both",
  },
  {
    type: "course",
    title: "National Undergraduate Public Speaking and Debate Competition",
    description: "UAE-based competition focusing on public speaking and debate skills, with a theme of sustainability.",
    skill: "Public Speaking",
    url: "https://www.zawya.com/en/press-release/companies-news/abu-dhabi-university-empowers-future-leaders-through-national-public-speaking-competitions-dy2b59sx",
    impactFactor: 0.7,
    alignmentStrategy: "UAE",
  },
]

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Course Recommendations</h1>
      <ResourceList initialResources={resources} />
    </div>
  )
}

