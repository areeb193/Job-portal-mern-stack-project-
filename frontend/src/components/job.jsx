import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import {Avatar, AvatarImage} from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
const Job = ({job}) => {
  const Navigate= useNavigate();
  const  dayAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  }

  return (
    
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:shadow-2xl transition-all duration-300'>
    <div className='flex items-center justify-between'>
      <p className='text-sm text-gray-500'>{dayAgoFunction(job?.createdAt)=== 0 ? "Today" : `${dayAgoFunction(job?.createdAt)} days ago`}</p>
      <Button variant="outline" className="rounded-full" size="icon"><Bookmark/></Button> 
      </div>
      <div className='flex items-center gap-2 my-2'>
      <Button className="p-6" variant="outline" size="icon">
        <Avatar>
            <AvatarImage src="https://tse1.mm.bing.net/th/id/OIP.afQdiNPi7rhMZnP6xqoyLwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"/>
        </Avatar>
        </Button> 
        <div>
            <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
            <p className='text-sm text-gray-500'>az.</p>
        </div>
     </div>
     <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
     </div>
      <div className="flex item-center gap-2 mt-4">
             <Badge className="text-blue-700 font-bold" variant="ghost">{job?.position} Position</Badge>
             <Badge className="text-[#F83002] font-bold" variant="ghost">{job?.jobtype}</Badge>
             <Badge className="text-[#7209b7] font-bold" variant="ghost">{job?.salary}</Badge>
         </div>
    <div className='flex justify-end mt-4 gap-4'>
        <Button onClick={()=>Navigate(`/description/${job?._id}`)} variant="outline" >Details</Button>
        <Button className="bg-[#7209b7]">Save for Later</Button>
    </div>

    </div>
  )
}

export default Job