"use client"
import { useState, useEffect } from 'react';
import RoadmapTimeline from "@/components/roadmap/RoadmapTimeline";
import AdditionalResources from "@/components/roadmap/AdditionalResources";

export default function Home() {
  const [roadmapData, setRoadmapData] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      const storedRoadmap = localStorage.getItem("roadmap");
      const userInfo = localStorage.getItem("userInfo");

      if (storedRoadmap) {
        try {
          const parsedData = JSON.parse(storedRoadmap);
          setRoadmapData(parsedData);
        } catch (error) {
          console.error("Error parsing roadmap data:", error);
        }
      }
      if (userInfo) {
        try {
          const parsedDataU = JSON.parse(userInfo);
          setMessage(parsedDataU.prompt);
        } catch (error) {
          console.error("Error parsing roadmap data:", error);
        }
      }
    }
  }, []);

  if (!roadmapData) {
    return (
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>Loading roadmap...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">{message} Roadmap</h1>
        <RoadmapTimeline roadmap={roadmapData.roadmap} />
        {/* <AdditionalResources resources={roadmapData.additional_resources} /> */}
      </div>
    </main>
  );
}