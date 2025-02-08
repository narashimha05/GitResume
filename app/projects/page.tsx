"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import supabase from "@/config/supabaseClient";

function ProjectsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const githubUsername = searchParams.get("githubUsername");

  const [projects, setProjects] = useState<{ id: number; name: string; description: string }[]>([]);
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
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("Unexpected response from GitHub API:", data);
          return;
        }

        const formattedProjects = data.map((repo: { id: number; name: string; description: string | null }) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || "No description available",
        }));

        setProjects(formattedProjects);
      })
      .catch((error) => console.error("Error fetching GitHub projects:", error));
  }, [githubUsername]);

  const handleSelectProject = (name: string) => {
    setSelectedProjects((prev) =>
      prev.includes(name)
        ? prev.filter((p) => p !== name)
        : prev.length < 4
        ? [...prev, name]
        : prev
    );
  };

  const handleSubmit = async () => {
    if (!userId) {
      console.error("User ID not found!");
      return;
    }

    const projectData = selectedProjects.map((projectName) => {
      const project = projects.find((p) => p.name === projectName);
      return {
        user_id: userId,
        project_name: projectName,
        description: project?.description || "",
      };
    });

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
            className={`p-4 rounded-lg text-left transition ${
              selectedProjects.includes(project.name)
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            <p className="font-bold">{project.name}</p>
            <p className="text-sm text-gray-700">{project.description}</p>
          </button>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg disabled:bg-gray-400"
        disabled={selectedProjects.length === 0}
      >
        Submit
      </button>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectsPageContent />
    </Suspense>
  );
}
