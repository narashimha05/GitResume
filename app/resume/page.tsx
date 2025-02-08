"use client";
import GitHubCalendar from 'react-github-calendar';
import { useState, useEffect } from "react";
import { useRouter,useSearchParams } from "next/navigation";
import supabase from "@/config/supabaseClient";
import { Suspense } from 'react';

function ResumePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");

  interface UserDetails {
    fullName: string;
    address: string;
    phoneNumber: string;
    description: string;
    githubUsername: string;
    education: string;
    skills: string;
    hasWorkExperience: boolean;
    workExperiences: string | null;
  }

  interface WorkExperience {
    company: string;
    role: string;
    location: string;
    startDate: string;
    endDate: string;
    responsibilities: string;

  }

  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [projects, setProjects] = useState<{ id: number; project_name: string }[]>([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from("users")
        .select("fullName, address, phoneNumber, description, githubUsername, education, skills, workExperiences, hasWorkExperience")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user details:", error.message);
        return;
      }

      setUserDetails(data);
    };

    fetchUserDetails();
  }, [userId]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from("projects")
        .select("id, project_name")
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching projects:", error.message);
        return;
      }

      setProjects(data);
    };

    fetchProjects();
  }, [userId]);

  const handleDelete = async () => {
    if (!userId) return;

    const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
    if (!confirmDelete) return;

    try {
      const { error: projectsError } = await supabase.from("projects").delete().eq("user_id", userId);
      if (projectsError) throw projectsError;

      const { error: userError } = await supabase.from("users").delete().eq("id", userId);
      if (userError) throw userError;

      router.push("/form");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting user:", error.message);
      } else {
        console.error("Error deleting user:", error);
      }
      alert("Failed to delete profile. Please try again.");
    }
  };


  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Resume Details</h1>

      {userDetails ? (
        <div className="mb-4">
          <p><strong>Name:</strong> {userDetails.fullName}</p>
          <p><strong>Address:</strong> {userDetails.address}</p>
          <p><strong>Phone:</strong> {userDetails.phoneNumber}</p>
          <p><strong>Description:</strong> {userDetails.description}</p>
          <p><strong>GitHub Username:</strong> {userDetails.githubUsername}</p>
          <p><strong>Education:</strong> {userDetails.education}</p>
          <div>
                <img src={`https://github.com/${userDetails.githubUsername}.png`} className="w-24 h-24 rounded-lg"/>
          </div>
          <GitHubCalendar username={userDetails.githubUsername} colorScheme='light' />

          <p><strong>Skills:</strong></p>
          <div className="flex flex-wrap gap-2">
            {userDetails.skills
              .split("\n") 
              .map((skill, index) => (
                <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {skill}
                </span>
              ))}
          </div>

          {userDetails.hasWorkExperience && userDetails.workExperiences ? (<div>
              <p className="mt-4"><strong>Work Experience:</strong></p>
            <ul className="list-disc pl-5">
              {(() => {
                try {
                  const parsedExperience: WorkExperience[] = JSON.parse(JSON.stringify(userDetails?.workExperiences));
                  return parsedExperience.map((exp, index) => (
                    <li key={index} className="mb-2">
                      <p><strong>Company:</strong> {exp.company}</p>
                      <p><strong>Location:</strong> {exp.location}</p>
                      <p><strong>role:</strong> {exp.role}</p>
                      <p><strong>responsibilities:</strong> {exp.responsibilities.split("\n").map((res, index) => (
                        <p key={index} className="mb-2">{res}</p>
                      ))}</p>
                      <p><strong>Start Date:</strong> {exp.startDate}</p>
                      <p><strong>End Date:</strong> {exp.endDate}</p>
                    </li>
                  ));
                } catch (error) {
                  console.error("Error parsing work experience JSON:", error);
                  return <p>Invalid work experience format.</p>;
                }
              })()}
            </ul>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <p>Loading user details...</p>
      )}

      <h2 className="text-lg font-bold mt-4">Selected Projects</h2>
      <ul className="list-disc pl-5">
        {projects.map((project) => (
          <li key={project.id}>{project.project_name}</li>
        ))}
      </ul>

       <button
            onClick={handleDelete}
            className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Delete Profile
          </button>
    </div>
  );
}

export default function ResumePage() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ResumePageContent />
      </Suspense>
    );
}
