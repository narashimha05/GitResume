"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import supabase from "@/config/supabaseClient";

function ResumePage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");

  interface UserDetails {
    fullName: string;
    address: string;
    phoneNumber: string;
    description: string;
  }

  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [projects, setProjects] = useState<{ id: number; project_name: string }[]>([]);

  // Fetch User Details
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from("users")
        .select("fullName, address, phoneNumber, description")
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

  // Fetch Selected Projects
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

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Resume Details</h1>

      {userDetails && (
        <div className="mb-4">
          <p><strong>Name:</strong> {userDetails.fullName}</p>
          <p><strong>Address:</strong> {userDetails.address}</p>
          <p><strong>Phone:</strong> {userDetails.phoneNumber}</p>
          <p><strong>Description:</strong> {userDetails.description}</p>
        </div>
      )}

      <h2 className="text-lg font-bold mt-4">Selected Projects</h2>
      <ul className="list-disc pl-5">
        {projects.map((project) => (
          <li key={project.id}>{project.project_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ResumePage;
