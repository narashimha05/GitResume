"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import supabase from "@/config/supabaseClient";

function ProjectsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const githubUsername = searchParams.get("githubUsername");

  const [projects, setProjects] = useState<{ id: number; name: string }[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      if (!githubUsername) return;
  
      console.log("Fetching user with GitHub username:", githubUsername); 
  
      const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("githubUsername", githubUsername)
        .maybeSingle();
  
      if (error) {
        console.error("Error fetching user ID:", error.message);
        return;
      }
  
      if (data) {
        console.log("Fetched User ID:", data.id); 
        setUserId(data.id);
      } else {
        console.warn("No user found with this GitHub username.");
      }
    };
  
    fetchUserId();
  }, [githubUsername]);
  
  useEffect(() => {
    if (!githubUsername) return;

    fetch(`https://api.github.com/users/${githubUsername}/repos`)
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, [githubUsername]);

  const handleSelectProject = (name: string) => {
    if (selectedProjects.includes(name)) {
      setSelectedProjects(selectedProjects.filter((p) => p !== name));
    } else if (selectedProjects.length < 4) {
      setSelectedProjects([...selectedProjects, name]);
    }
  };

  const handleSubmit = async () => {
    if (!userId) {
      console.error("User ID not found!");
      return;
    }
    

    const projectData = selectedProjects.map((project) => ({
      user_id: userId,
      project_name: project,
    }));

    const { error } = await supabase.from("projects").insert(projectData);

    if (error) {
      console.error("Error saving projects:", error.message);
      return;
    }

    router.push(`/resume?user_id=${userId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Select Up to 4 Projects</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => handleSelectProject(project.name)}
            className={`px-4 py-2 rounded-lg ${
              selectedProjects.includes(project.name)
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {project.name}
          </button>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg"
        disabled={selectedProjects.length === 0}
      >
        Submit
      </button>
    </div>
  );
}

export default ProjectsPage;
