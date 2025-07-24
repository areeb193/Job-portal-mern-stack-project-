import React from 'react'
import { Link } from 'react-router-dom'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut, User2 } from "lucide-react"
const Navbar = () => {
  const user = false;
  return (
    <div className='bg-white'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
        <div>
          <h1 className='text-2xl font-bold'>Job <span className='text-[#F83002]'>Portal</span></h1>
        </div>
        <div className='flex items-center gap-12'>
          <ul className='flex font-medium item-center gap-5'>
            <li>Home</li>
            <li>jobs</li>
            <li>Browser</li>
          </ul>
          {
            !user ? (
              <div className='flex items-center gap-3'>
                <Link to="/Login"><button className='w-28 h-10 border border-gray-300 rounded-2xl px-4 py-2' type='button'> Login</button></Link>
                <Link to="/Signup"><button className='w-28 h-10 border border-[#6A38C2] rounded-2xl px-4 py-2 bg-[#6A38C2]  hover:bg-[#5A2BB2]'type='button'>Sign Up </button></Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className='cursor-pointer'>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className=''>
                  <div className='flex gap-4 space-y-2'>
                    <Avatar className='cursor-pointer'>
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className='font-medium'>
                        Areeb
                      </h4>
                      <p className='text-sm text-muted-foreground'>ladekdeddb dejdj </p>
                    </div>
                  </div>
                  <div className='flex flex-col my-2 text-gray-600'>
                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                      <User2 />
                      <Button variant="link">View profile</Button>
                    </div>

                    <div className='flex w-fit items-center gap-2 cursor-pointer'>  <Button variant="link">
                      <LogOut />
                      logout</Button></div>
                  </div>
                </PopoverContent>
              </Popover>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar