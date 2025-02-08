// import GitHubCalendar from 'react-github-calendar';
"use client";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <div className='border-black border-4 w-full'>
      Hello
      {/* <div className='border-black border-4 m-4 w-full'>
        <GitHubCalendar username="narashimha05" colorScheme='light' />
      </div> */}
      <button onClick={()=>router.push("/form")} className="border-2 rounded-lg px-4 py-1 bg-gray-200 ml-4">Forms</button>
    </div>
  );
}
