"use client";
// import GitHubCalendar from 'react-github-calendar';
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import supabase from "@/config/supabaseClient";
import { Suspense } from 'react';
import Image from 'next/image';
import { FaLocationPin } from "react-icons/fa6";
// import { IoMail } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { LuExternalLink } from "react-icons/lu";

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
  const [projects, setProjects] = useState<{ id: number; project_name: string; description: string }[]>([]);

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
        .select("id, project_name, description")
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
      console.error("Error deleting user:", error);
      alert("Failed to delete profile. Please try again.");
    }
  };
  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-xl rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Resume Details</h1>
      {userDetails ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-4 border-b pb-4">
            <Image src={`https://github.com/${userDetails.githubUsername}.png?size=400`} quality={100} className="w-24 h-24 rounded-full" alt="GitHub Avatar" width={24} height={24}/>
            <div>
              <p className="text-2xl font-semibold uppercase">{userDetails.fullName}</p>
              <p className="text-gray-700">{userDetails.description}</p>
            <div className='flex gap-2 mt-3 flex-wrap'>
              <a href={`https://github.com/${userDetails.githubUsername}/`} target="blank"><p className="text-gray-500 flex gap-2 items-center text-sm sm:text-md"><FaGithub size={20}/>{userDetails.githubUsername}</p></a>
              <p className="text-gray-500 flex gap-2 items-center text-sm sm:text-md"><IoCall size={20}/> {userDetails.phoneNumber}</p>
              <p className="text-gray-500 flex gap-2 items-center text-sm sm:text-md"><FaLocationPin size={20}/> {userDetails.address}</p>
            </div>
            </div>
          </div>
          
          <p className="text-gray-700"><div className='font-extrabold text-xl'>Education:</div> {userDetails.education.split("\n").map((edu, index) => (
            <div key={index} className=" px-3 py-1 rounded-full text-sm">- {edu}</div>
          ))}</p>
          <div>
            <h2 className="text-xl font-extrabold">Skills:</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {userDetails.skills.split("\n").map((skill, index) => (
                <span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">{skill}</span>
              ))}
            </div>
          </div>
            <div className='flex flex-1'>
            {/* <GitHubCalendar username={userDetails.githubUsername} colorScheme='light' blockSize={12} style={{ width: '100%' }} /> */}
            <img src={`http://ghchart.rshah.org/000/${userDetails.githubUsername}`} alt="2016rshah's Github chart" className='w-full' />
            </div>
          {userDetails.hasWorkExperience && userDetails.workExperiences && (
            <div>
              <h2 className="text-xl font-extrabold">Work Experience:</h2>
              <ul className="space-y-4 mt-2">
                {(() => {
                  try {
                    const parsedExperience: WorkExperience[] = JSON.parse(JSON.stringify(userDetails.workExperiences));
                    return parsedExperience.map((exp, index) => (
                      <li key={index} className="p-4 bg-gray-100 rounded-lg">
                      <div className='flex justify-between'>
                       <div>
                        <p className='text-md font-bold'>{exp.company}</p>
                        <p className='text-sm text-gray-700'>{exp.role}</p>
                       </div>
                        <div>
                          <div className='text-md font-bold text-end'>{exp.location}</div>
                          <p className='text-sm text-gray-700'>{exp.startDate} - {exp.endDate}</p>
                        </div>
                      </div>
                        <p className='text-sm mt-2'>{exp.responsibilities.split("\n").map((resp, index)=>
                          // <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{resp}</div>
                          <li key={index}>
                            • {resp}
                          </li>
                        )}</p>

                      </li>
                    ));
                  } catch (error) {
                    console.error("Error parsing work experience JSON:", error);
                    return <p>Invalid work experience format.</p>;
                  }
                })()}
              </ul>
            </div>
          )}
          <h2 className="text-xl font-extrabold">Projects:</h2>
          <ul className="list-disc space-y-1 text-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userDetails && projects.map((project) => (
              <div key={project.id} className="bg-white shadow-lg rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-md font-semibold text-black">{project.project_name}</p>
                  <a
                      href={`https://github.com/${userDetails.githubUsername}/${project.project_name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-sm flex gap-2"
                    >
                     view <LuExternalLink size={18}/>
                    </a>
                </div>
                <p className="text-sm text-gray-600">
                  {project.description?.length > 100
                    ? `${project.description?.substring(0, 120)}...`
                    : project.description}
                </p>
              </div>
            ))}
          </div>

          </ul>
          <button
            onClick={handleDelete}
            className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all"
          >
            Delete Profile
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading user details...</p>
      )}
    </div>
  );
}

export default function ResumePage() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500">Loading...</div>}>
      <ResumePageContent />
    </Suspense>
  );
}
