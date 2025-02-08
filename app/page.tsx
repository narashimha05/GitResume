"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaGithub, FaUserCheck, FaCode } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";


export default function LandingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleForm = () => {
    setLoading(true);
    router.push("/form");
  }
  return (
    <div className="bg-gray-900 text-white">
      <section className="relative flex flex-col items-center justify-center h-screen text-center px-6 bg-white overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-[0.1px] opacity-10">
          {[...Array(144)].map((_, i) => (
            <div key={i} className="w-full h-full bg-white border border-black"></div>
          ))}
        </div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 relative z-10 text-black"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Create Your <span className="text-green-600">GitHub Resume</span> Effortlessly
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Showcase your best GitHub projects and generate a professional resume in seconds.
        </motion.p>
        <motion.div
          className="flex space-x-4 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Button className="bg-green-600 hover:bg-green-500 text-lg">
            <div onClick={handleForm}>{loading ? <BeatLoader size={8}/> : <p>Get Started</p>}</div>
          </Button>
          <Button className="bg-gray-700 hover:bg-gray-600 text-lg">
            <Link href="https://github.com/narashimha05/GitResume" target="_blank" className="flex items-center">
              <FaGithub className="mr-2" /> GitHub
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-10 px-6 text-center bg-white">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-black">Why Use GitHub Resume?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div className="p-6 bg-black rounded-xl shadow-md" whileHover={{ scale: 1.05 }}>
            <FaUserCheck className="text-green-400 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Professional Resume</h3>
            <p className="text-gray-400 mt-2">Generate a beautifully designed resume based on your GitHub projects.</p>
          </motion.div>
          <motion.div className="p-6 bg-black rounded-xl shadow-md" whileHover={{ scale: 1.05 }}>
            <FaGithub className="text-white text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold">GitHub Integration</h3>
            <p className="text-gray-400 mt-2">Fetch and showcase your top repositories in just a few clicks.</p>
          </motion.div>
          <motion.div className="p-6 bg-black rounded-xl shadow-md" whileHover={{ scale: 1.05 }}>
            <FaCode className="text-blue-400 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Showcase Your Work</h3>
            <p className="text-gray-400 mt-2">Highlight your best projects and skills to impress recruiters.</p>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-10 px-6 text-center bg-white text-black">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div className="p-6 bg-black text-white rounded-xl shadow-md" whileHover={{ scale: 1.05 }}>
            <h3 className="text-xl font-semibold mb-2">1. Enter Your GitHub Username</h3>
            <p className="text-gray-400">Connect your GitHub account to fetch your projects.</p>
          </motion.div>
          <motion.div className="p-6 bg-black text-white rounded-xl shadow-md" whileHover={{ scale: 1.05 }}>
            <h3 className="text-xl font-semibold mb-2">2. Select Your Projects</h3>
            <p className="text-gray-400">Choose up to 4 projects to feature on your resume.</p>
          </motion.div>
          <motion.div className="p-6 bg-black text-white rounded-xl shadow-md" whileHover={{ scale: 1.05 }}>
            <h3 className="text-xl font-semibold mb-2">3. Generate & Download</h3>
            <p className="text-gray-400">Download your resume instantly as a PDF.</p>
          </motion.div>
        </div>
      </section>

      {/* Want to Contribute? Get Started Section */}
      <section className="py-10 px-6 text-center bg-white text-black">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">Want to Contribute? Get Started!</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
          Join our open-source community! Help improve GitHub Resume by contributing code, design, or new features.
        </p>
        <motion.div whileHover={{ scale: 1.02 }}>
          <Button className="bg-green-500 hover:bg-green-400 text-lg">
            <Link href="https://github.com/narashimha05/GitResume" target="_blank" className="flex items-center">
              Contribute on GitHub
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-900 text-center border-t border-gray-700">
        
        <p className="text-gray-200 mt-2">
          Contributors: <span className="text-green-300"><Link href={"https://www.linkedin.com/in/chinnari-narashimha-prasad-a0253628a/"}>Chinnari Narashimha (Developer)</Link></span> &{" "}
          <span className="text-green-300"><Link href={"https://www.linkedin.com/in/atmaprakash-sahu-99b855301/"}>AtmaPrakash Sahu (UI/UX Designer)</Link></span>
        </p>
        <div className="mt-4 mb-4 flex justify-center space-x-6">
          <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
          <Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
        </div>
        <p className="text-white">Built with Late Night Coding 🧑‍💻.</p>
      </footer>
    </div>
  );
}
