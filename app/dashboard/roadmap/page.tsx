import RoadmapTimeline from "@/components/roadmap/RoadmapTimeline";
import AdditionalResources from "@/components/roadmap/AdditionalResources";
import roadmapData from "@/data/roadmap.json";


export default function Home() {
  return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Data Science Learning Roadmap</h1>
        <RoadmapTimeline roadmap={roadmapData.roadmap} />
        <AdditionalResources resources={roadmapData.additional_resources} />
      </div>
    </main>
  );
}
