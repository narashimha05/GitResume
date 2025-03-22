"use client";
// import GitHubCalendar from 'react-github-calendar';
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";
import supabase from "@/config/supabaseClient";
import { Suspense } from "react";
import Image from "next/image";
import { FaLocationPin } from "react-icons/fa6";
// import { IoMail } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { LuExternalLink } from "react-icons/lu";
import { useReactToPrint } from "react-to-print";
import toast from "react-hot-toast";
import ThemeToggle from "@/components/ThemeToggle";
// import { BeatLoader } from "react-spinners";
// import { Tooltip } from 'react-tooltip'

function ResumePageContent() {
  // const router = useRouter();
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
    linkedin: string;
    twitter: string;
    portfolio: string;
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
  const [projects, setProjects] = useState<
    { id: number; project_name: string; description: string }[]
  >([]);
  // const [loading, setLoading] = useState(false);

  const resumeRef = useRef(null);
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId) return;
      const { data, error } = await supabase
        .from("users")
        .select(
          "fullName, address, phoneNumber, description, githubUsername, education, skills, workExperiences, hasWorkExperience,linkedin, twitter, portfolio"
        )
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

  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: `${userDetails?.fullName}'s Resume`,
    onBeforePrint: async () => {
      setIsPrinting(true);
    },
    onAfterPrint: () => {
      setTimeout(() => {
        if (isPrinting) {
          toast.success("Resume downloaded successfully!");
        }
        setIsPrinting(false);
      }, 500);
    },
    pageStyle: `
      @page {
        margin: 1cm;
      }
    `,
    onPrintError: () =>
      toast.error("Failed to download resume. Please try again."),
  });
  // const handleDelete = async () => {
  //   if (!userId) return;
  //   setLoading(true);
  //   const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
  //   if (!confirmDelete) return;
  //   try {
  //     const { error: projectsError } = await supabase.from("projects").delete().eq("user_id", userId);
  //     if (projectsError) throw projectsError;
  //     const { error: userError } = await supabase.from("users").delete().eq("id", userId);
  //     setLoading(false);
  //     if (userError) throw userError;
  //     router.push("/");
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //     alert("Failed to delete profile. Please try again.");
  //   }
  // };
  return (
    <div className="p-6 dark:bg-black">
      <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-xl rounded-lg border border-gray-200 dark:bg-black dark:text-white dark:border-gray-600">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_2px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_2px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-black "></div>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 dark:text-white">
          Resume Details
        </h1>
        {userDetails ? (
          <div className="space-y-4" ref={resumeRef}>
            <div className="flex items-center space-x-4 border-b pb-4">
              <Image
                src={`https://github.com/${userDetails.githubUsername}.png?size=400`}
                quality={100}
                className="w-24 h-24 rounded-full"
                alt="GitHub Avatar"
                width={24}
                height={24}
              />
              <div>
                <p className="text-2xl font-semibold uppercase">
                  {userDetails.fullName}
                </p>
                <p className="text-gray-700 dark:text-white">
                  {userDetails.description}
                </p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <a
                    href={`https://github.com/${userDetails.githubUsername}/`}
                    target="blank"
                  >
                    <p className="text-gray-500 dark:text-white flex gap-2 items-center text-sm sm:text-md">
                      <FaGithub size={20} />
                      {userDetails.githubUsername}
                    </p>
                  </a>
                  <p className="text-gray-500 dark:text-white flex gap-2 items-center text-sm sm:text-md">
                    <IoCall size={20} /> {userDetails.phoneNumber}
                  </p>
                  <p className="text-gray-500 dark:text-white flex gap-2 items-center text-sm sm:text-md">
                    <FaLocationPin size={20} /> {userDetails.address}
                  </p>
                  {userDetails.linkedin && (
                    <a
                      href={userDetails.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 flex gap-2 items-center text-sm sm:text-md hover:text-blue-600 dark:text-white"
                    >
                      <LuExternalLink size={20} /> LinkedIn
                    </a>
                  )}
                  {userDetails.twitter && (
                    <a
                      href={userDetails.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 flex gap-2 items-center text-sm sm:text-md hover:text-blue-400 dark:text-white"
                    >
                      <LuExternalLink size={20} /> Twitter
                    </a>
                  )}
                  {userDetails.portfolio && (
                    <a
                      href={userDetails.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 flex gap-2 items-center text-sm sm:text-md hover:text-purple-600 dark:text-white"
                    >
                      <LuExternalLink size={20} /> Portfolio
                    </a>
                  )}
                </div>
              </div>
            </div>

            <p className="text-gray-700 dark:text-white">
              <div className="font-extrabold text-xl">Education:</div>{" "}
              {userDetails.education.split(/\s*,\s*/).map((edu, index) => (
                <div key={index} className=" px-3 py-1 rounded-full text-sm">
                  - {edu}
                </div>
              ))}
            </p>
            <div>
              <h2 className="text-xl font-extrabold">Skills:</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {userDetails.skills.split(/\s*,\s*/).map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-1">
              {/* <GitHubCalendar username={userDetails.githubUsername} colorScheme='light' blockSize={12} style={{ width: '100%' }} /> */}
              <img
                src={`http://ghchart.rshah.org/000/${userDetails.githubUsername}`}
                alt="2016rshah's Github chart"
                className="w-full"
              />
            </div>
            {userDetails.hasWorkExperience && userDetails.workExperiences && (
              <div>
                <h2 className="text-xl font-extrabold">Work Experience:</h2>
                <ul className="space-y-4 mt-2">
                  {(() => {
                    try {
                      const parsedExperience: WorkExperience[] = JSON.parse(
                        JSON.stringify(userDetails.workExperiences)
                      );
                      return parsedExperience.map((exp, index) => (
                        <li
                          key={index}
                          className="p-4 bg-gray-100 rounded-lg dark:bg-black dark:text-white"
                        >
                          <div className="flex justify-between">
                            <div>
                              <p className="text-md font-bold">{exp.company}</p>
                              <p className="text-sm text-gray-700 dark:text-white">
                                {exp.role}
                              </p>
                            </div>
                            <div>
                              <div className="text-md font-bold text-end">
                                {exp.location}
                              </div>
                              <p className="text-sm text-gray-700 dark:text-white">
                                {exp.startDate} - {exp.endDate}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm mt-2">
                            {exp.responsibilities
                              .split(/\s*,\s*/)
                              .map((resp, index) => (
                                // <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{resp}</div>
                                <li key={index}>• {resp}</li>
                              ))}
                          </p>
                        </li>
                      ));
                    } catch (error) {
                      console.error(
                        "Error parsing work experience JSON:",
                        error
                      );
                      return <p>Invalid work experience format.</p>;
                    }
                  })()}
                </ul>
              </div>
            )}
            <h2 className="text-xl font-extrabold">Projects:</h2>
            <ul className="list-disc space-y-1 text-gray-700 dark:text-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userDetails &&
                  projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-white shadow-lg rounded-lg p-4 border dark:bg-black dark:border-gray-800"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-md font-semibold text-black dark:text-white">
                          {project.project_name}
                        </p>
                        <a
                          href={`https://github.com/${userDetails.githubUsername}/${project.project_name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 text-sm flex gap-2"
                        >
                          view <LuExternalLink size={18} />
                        </a>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-white">
                        {project.description?.length > 100
                          ? `${project.description?.substring(0, 120)}...`
                          : project.description}
                      </p>
                    </div>
                  ))}
              </div>
            </ul>
            {/*           <button
            onClick={handleDelete}
            className="mt-6 w-full bg-black  text-white py-2 rounded-lg hover:bg-black-700 transition-all font-bold"
            data-tooltip-id="my-tooltip" data-tooltip-content="This will erase the data generated here and goes back to the home page"
          >
            {loading?<BeatLoader size={8} color="#ffffff"/>:<p>Delete and Go Home</p>}
          </button>
          <Tooltip id="my-tooltip" /> */}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-black">
            Loading user details...
          </p>
        )}
        <button
          onClick={() => handlePrint()}
          className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-all font-bold dark:text-black dark:bg-white"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
}

export default function ResumePage() {
  return (
    <Suspense
      fallback={
        <div className="text-center text-gray-500 dark:text-white">
          Loading...
        </div>
      }
    >
      <ResumePageContent />
    </Suspense>
  );
}
