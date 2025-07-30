import React from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
const JobDescription = () => {
  const isApplied = true;
  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-bold text-xl '> Frontend Developer</h1>
          <div className="flex item-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">12 Position</Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">Part Time</Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">24 lpa</Badge>
          </div>
        </div>
        <button disabled={isApplied}
          className={`rounded-lg px-6 py-3 text-base ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#560bad]"}`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </button>
      </div>
      <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
      <div className='my-4'>
        <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
        <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>Islamabad</span></h1>
        <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, odio veritatis! Temporibus numquam maxime, quia aliquid non ea sint similique autem commodi quasi voluptatem vero et neque facilis explicabo harum.</span></h1>
        <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>2 years</span></h1>
        <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>12 lakhs</span></h1>
        <h1 className='font-bold my-1'>Total applicant: <span className='pl-4 font-normal text-gray-800'>4</span></h1>
        <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>01 Jan 2023</span></h1>
      </div>
    </div>
  )
}

export default JobDescription