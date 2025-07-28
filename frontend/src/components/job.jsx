import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import {Avatar, AvatarImage} from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
const Job = () => {
  const Navigate= useNavigate();
  const jobId = "12345"; // Example job ID, replace with actual data
  return (
    
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:shadow-2xl transition-all duration-300'>
    <div className='flex items-center justify-between'>
      <p className='text-sm text-gray-500'>2 days ago</p>
      <Button variant="outline" className="rounded-full" size="icon"><Bookmark/></Button> 
      </div>
      <div className='flex items-center gap-2 my-2'>
      <Button className="p-6" variant="outline" size="icon">
        <Avatar>
            <AvatarImage src="https://tse1.mm.bing.net/th/id/OIP.afQdiNPi7rhMZnP6xqoyLwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"/>
        </Avatar>
        </Button> 
        <div>
            <h1 className='font-medium text-lg'>Company Name </h1>
            <p className='text-sm text-gray-500'>az.</p>
        </div>
     </div>
     <div>
        <h1 className='font-bold text-lg my-2'>Title</h1>
        <p className='text-sm text-gray-600'>Join our team to build modern web applications using React, TailwindCSS, and cutting-edge technologies. Collaborate with designers and backend engineers to deliver seamless user experiences.</p>
     </div>
      <div className="flex item-center gap-2 mt-4">
             <Badge className="text-blue-700 font-bold" variant="ghost">12 Position</Badge>
             <Badge className="text-[#F83002] font-bold" variant="ghost">Part Time</Badge>
             <Badge className="text-[#7209b7] font-bold" variant="ghost">24 lpa</Badge>
         </div>
    <div className='flex justify-end mt-4 gap-4'>
        <Button onClick={()=>Navigate(`/description/${jobId}`)} variant="outline" >Details</Button>
        <Button className="bg-[#7209b7]">Save for Later</Button>
    </div>

    </div>
  )
}

export default Job