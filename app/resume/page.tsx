"use client";

import React, { useEffect, useState } from "react";
import supabase from "@/config/supabaseClient";
function Resume() {
  interface Project {
    id: number;
    name: string;
    description: string;
    url: string;
  }

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchSelectedProjects = async () => {
      const { data, error } = await supabase.from("selected_projects").select("*");
      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setProjects(data);
      }
    };
    fetchSelectedProjects();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Resume</h1>
      <h2 className="text-2xl font-semibold mt-6">Selected Projects</h2>
      <div className="grid gap-4 mt-4">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div key={index} className="border p-4 rounded-lg bg-gray-100">
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Project
              </a>
            </div>
          ))
        ) : (
          <p>No projects selected.</p>
        )}
      </div>
    </div>
  );
}

export default Resume;
