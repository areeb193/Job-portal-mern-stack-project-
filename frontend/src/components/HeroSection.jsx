import React from 'react'
import{ Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
const HeroSection = () => {
  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No 1 job Hunt Website</span>
        <h1 className='text-5xl font-bold'>Search, Apply &<br/>Get Your <span className='text-[#6A38C2]'>Dream jobs</span></h1>
        <p className="text-lg text-gray-600 mt-2">A modern job portal with user authentication, job posting, company profiles, and application tracking — developed by Areeb & Ali.</p>
        <div className='flex w-full max-w-xl shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
            <input type="text"
            placeholder='find your dream jobs'
            className='outline-none border-none w-full' />
            <Button className='bg-[#6A38C2] text-white rounded-r-full  hover:bg-[#7840b0]'>
                <Search className='h-4 w-4' />
            </Button>

        </div>
        </div>  

    </div>
  )
}

export default HeroSection