import Link from "next/link"
import { Github, FileText, Users, Code, CheckCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Github className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">GitResume</span>
        </div>
      </header>

      <main className="flex-grow">
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute inset-0 bg-gray-900"></div>
          <div className="relative container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up ">Create Your Resume with GitHub</h1>
            <p className="text-xl mb-8 animate-fade-in-up animation-delay-200">
              Transform your GitHub profile into a professional resume in seconds
            </p>
            <Link href={"/form"}
              className=" text-primary hover:bg-gray-700 animate-fade-in-up animation-delay-400 rounded-lg bg-gray-600 px-4 py-2"
            >
              Get Started
            </Link >
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Why GitResume?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-lg transition-transform hover:scale-105">
                <FileText className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Automatic Generation</h3>
                <p>Create a professional resume instantly based on your GitHub activity</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-lg transition-transform hover:scale-105">
                <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Showcase Your Work</h3>
                <p>Highlight your projects, contributions, and coding skills to potential employers</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-lg transition-transform hover:scale-105">
                <Code className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Customizable</h3>
                <p>Tailor your resume to fit your needs and stand out from the crowd</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Try It Out</h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-semibold mb-4">See how it works</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-primary mr-2" />
                    <span>Connect your GitHub account</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-primary mr-2" />
                    <span>Choose your preferred template</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-primary mr-2" />
                    <span>Customize your resume content</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-primary mr-2" />
                    <span>Download or share your professional resume</span>
                  </li>
                </ul>
                <Link href={"/form"}><button className="mt-6 rounded-lg bg-gray-300 hover:bg-gray-400 px-4 py-2">
                  Create Your Resume Now
                </button></Link>
              </div>
              <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
                <div className="aspect-w-4 aspect-h-5 bg-gray-200 rounded-lg overflow-hidden">
                  <div className="p-4">
                    <div className="w-1/3 h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="w-1/2 h-4 bg-gray-300 rounded mb-8"></div>
                    <div className="space-y-2">
                      <div className="w-full h-4 bg-gray-300 rounded"></div>
                      <div className="w-full h-4 bg-gray-300 rounded"></div>
                      <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
                    </div>
                    <div className="mt-6 space-y-2">
                      <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
                      <div className="w-full h-4 bg-gray-300 rounded"></div>
                      <div className="w-full h-4 bg-gray-300 rounded"></div>
                      <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Want to Contribute?</h2>
            <p className="text-xl mb-8">Help us improve GitResume and make it even better for developers worldwide</p>
            <Link href={"https://github.com/narashimha05/GitResume"} className="bg-gray-500 text-primary hover:bg-gray-600 px-4 py-2 rounded-lg" >
              Contribute on GitHub
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 GitResume. All rights reserved.</p>
          <div className="mt-4">
            <Link href="#" className="hover:underline mr-4">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

