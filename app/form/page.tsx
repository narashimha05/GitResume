"use client";
import React, { useState } from "react";
import { FaGithub, FaPlus, FaTrash } from "react-icons/fa";
import supabase from "@/config/supabaseClient";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const [hasWorkExperience, setHasWorkExperience] = useState(false);
  // const [workExperiences, setWorkExperiences] = useState([
  //   { company: "", location: "", role: "", startDate: "", endDate: "", responsibilities: "" }
  // ]);
  const [formData, setFormData] = useState({
    fullName: "",
    githubUsername: "",
    address: "",
    phoneNumber:"",
    description: "",
    education:"",
    workExperiences: [{
      company:"", location:"", role:"", startDate:"", endDate:"", responsibilities: ""
    }],
    skills: ""
  });

  // Toggles Work Experience Section
  const handleWorkExperienceToggle = () => {
    setHasWorkExperience(!hasWorkExperience);
    if (!hasWorkExperience) {
      setFormData({
        ...formData,
        workExperiences: [{ company: "", location: "", role: "", startDate: "", endDate: "", responsibilities: "" }]
      });
    }
  };

  // Adds More Work Experience
  const addWorkExperience = () => {
    setFormData({
      ...formData,
      workExperiences: [...formData.workExperiences, { company: "", location: "", role: "", startDate: "", endDate: "", responsibilities: "" }]
    });
  };

  // Removes Work Experience
  const removeWorkExperience = (index: number) => {
    const updatedExperiences = [...formData.workExperiences];
    updatedExperiences.splice(index, 1);
    setFormData({ ...formData, workExperiences: updatedExperiences });
  };


// type for work experience
type WorkExperience = {
  company: string;
  location: string;
  role: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
};

// Handles Input Change
const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  index?: number,
  field?: keyof WorkExperience 
) => {
  if (index !== undefined && field) {
    const updatedExperiences = [...formData.workExperiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: e.target.value,
    };
    setFormData({ ...formData, workExperiences: updatedExperiences });
  } else {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formattedData = {
        ...formData,
        education: formData.education.replace(/, /g, "\n"),
        skills: formData.skills.replace(/, /g, "\n"),
        workExperiences: formData.workExperiences.map(exp => ({
          ...exp,
          responsibilities: exp.responsibilities.replace(/, /g, "\n"),
        })),
      };

      const { data, error } = await supabase.from("users").insert([formattedData]);

      if (error) throw error;

      alert("Data inserted successfully!");
      console.log(data);
      router.push("/projects?githubUsername=" + formData.githubUsername);
    } catch (err) {
      console.error("Error inserting data:", err);
      alert(`Failed to insert data: ${(err as Error).message}`);
    }
  };


  return (
    <div>
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="font-extrabold text-xl">Resume Builder</div>
        <div>
          <FaGithub size={26} />
        </div>
      </div>

      {/* Form */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-6 border-black border-2 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-2 lg:gap-4">
            {/* Personal Information */}
            <div className="font-bold text-2xl">Personal Information</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block mb-2 text-sm text-gray-700 font-medium">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="py-3 px-4 block w-full border-black rounded-lg text-sm bg-lime-200" placeholder="Full Name" />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-700 font-medium">GitHub Username</label>
                <input type="text" name="githubUsername" value={formData.githubUsername} onChange={handleInputChange} className="py-3 px-4 block w-full border-black rounded-lg text-sm bg-lime-200" placeholder="GitHub Username" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block mb-2 text-sm text-gray-700 font-medium">Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="py-3 px-4 block w-full border-black rounded-lg text-sm bg-lime-200" placeholder="Write Your Full Address" />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-700 font-medium">Phone Number</label>
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="py-3 px-4 block w-full border-black rounded-lg text-sm bg-lime-200" placeholder="Write Your Phone Number" />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-700 font-medium">Describe Yourself</label>
              <textarea rows={4} name="description" value={formData.description} onChange={handleInputChange} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm bg-gray-200"></textarea>
            </div>

            {/* Education */}
            <div className="font-bold text-2xl">Education</div>
            <div>
              <label className="block mb-2 text-sm text-gray-700 font-medium">Write Your Education</label>
              <textarea rows={4} name="education" value={formData.education} onChange={handleInputChange} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm bg-gray-200"></textarea>
            </div>

            {/* Work Experience Checkbox */}
            <div className="font-bold text-2xl">Work Experience</div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="workExperience" className="w-5 h-5" checked={hasWorkExperience} onChange={handleWorkExperienceToggle} />
              <label htmlFor="workExperience" className="text-lg font-medium text-gray-700">I have work experience</label>
            </div>

            {/* Work Experience Section (Conditional) */}
            {hasWorkExperience && (
              <div>
                
                {formData.workExperiences.map((exp, index) => (
                  <div key={index} className="border p-4 rounded-lg mb-4">
                    <div>Information {index+1}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                      <div>
                        <label className="block mb-2 text-sm text-gray-700 font-medium">Company Name</label>
                        <input type="text" value={exp.company} onChange={(e) => handleInputChange(e, index, "company")} className="py-3 px-4 block w-full border-black rounded-lg text-sm bg-lime-200" placeholder="Company Name" />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm text-gray-700 font-medium">Location</label>
                        <input type="text" value={exp.location} onChange={(e) => handleInputChange(e, index, "location")} className="py-3 px-4 block w-full border-black rounded-lg text-sm bg-lime-200" placeholder="Location" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                      <div>
                        <label className="block mb-2 mt-2 text-sm text-gray-700 font-medium">Role</label>
                        <input type="text" value={exp.role} onChange={(e) => handleInputChange(e, index, "role")} className="py-3 px-4 block w-full border-black rounded-lg text-sm bg-lime-200" placeholder="Role" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-2 mt-2 text-sm text-gray-700 font-medium">Start Date</label>
                          <input type="text" value={exp.startDate} onChange={(e) => handleInputChange(e, index, "startDate")} className="py-3 px-4 block w-full border-black rounded-lg text-sm bg-lime-200" placeholder="June 2024" />
                        </div>
                        <div>
                          <label className="block mb-2 mt-2 text-sm text-gray-700 font-medium">End Date</label>
                          <input type="text" value={exp.endDate} onChange={(e) => handleInputChange(e, index, "endDate")} className="py-3 px-4 block w-full border-black rounded-lg text-sm bg-lime-200" placeholder="August 2024" />
                        </div>
                      </div>
                    </div>

                    <label className="block my-2 text-sm text-gray-700 font-medium">Responsibilities</label>
                    <textarea rows={3} value={exp.responsibilities} onChange={(e) => handleInputChange(e, index, "responsibilities")} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm bg-gray-200"></textarea>

                    {formData.workExperiences.length > 1 && (
                      <button onClick={() => removeWorkExperience(index)} type="button" className="mt-3 text-red-600 hover:underline flex items-center gap-2">
                        <FaTrash /> Remove
                      </button>
                    )}
                  </div>
                ))}

                {/* Add More Work Experience Button */}
                <button onClick={addWorkExperience} type="button" className="flex items-center text-blue-600 hover:underline mt-2">
                  <FaPlus className="mr-1" /> Add More Work Experience
                </button>
              </div>
            )}
            
          <div className='font-bold text-2xl'>
            Skills
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-700 font-medium">Write Your Skills</label>
            <textarea rows={4} name="skills" value={formData.skills} onChange={handleInputChange} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm bg-gray-200"></textarea>
          </div>

            {/* Submit Button */}
            <div className="mt-6 grid">
              <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">Continue</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;







