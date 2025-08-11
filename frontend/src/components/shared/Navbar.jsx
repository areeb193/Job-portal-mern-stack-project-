import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut, User2 } from "lucide-react"
import { useSelector } from 'react-redux'
import { USER_API_END_POINT } from '../../utils/constant'
import axiosInstance from '../../utils/axiosConfig'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axiosInstance.get(`${USER_API_END_POINT}/logout`)
      if (res.data.success) {
        dispatch(logout());
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error)
      dispatch(logout());
      navigate('/');
      toast.error('Logged out successfully');
    }
  }
  return (
    <div className='bg-white'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
        <div>
          <h1 className='text-2xl font-bold'>Internship <span className='text-[#F83002]'>Portal</span></h1>
        </div>
        <div className='flex items-center gap-12'>
          {/* JobLensAI Button */}
          <Link to="https://job-lens-ai-six.vercel.app/" target="_blank" rel="noopener noreferrer">
            <Button
              variant="ghost"
              className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-white to-blue-500 font-bold text-lg"
            >
              AIChecker
            </Button>
          </Link>

          {/* Navigation Links */}
          <ul className='flex font-medium items-center gap-5'>
            {
              user && user.role==='recruiter' ?(
                <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Internships</Link></li>
                </>
              ):(
                <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Internship</Link></li>
                <li><Link to="/browse">Browse</Link></li>
                <li><Link to="/job-hunt">Internship Hunt</Link></li>
                </>
              )
            }
            
          </ul>

          {/* User Buttons */}
          {!user ? (
            <div className='flex items-center gap-3'>
              <Link to="/Login"><Button variant="outline" className="mr-2">Login</Button></Link>
              <Link to="/Signup"><Button className="bg-[#7209b7] text-white">Signup</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className='cursor-pointer'>
                  <AvatarImage src={user?.profile?.profilePicture} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <div className='flex gap-4 space-y-2'>
                  <Avatar className='cursor-pointer'>
                    <AvatarImage src={user?.profile?.profilePicture} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className='font-medium'>{user?.fullname}</h4>
                                         <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className='flex flex-col my-2 text-gray-600'>
                 
                 {
                  user && user.role === 'student' &&(
                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                    <User2 />
                    <Button variant="link"><Link to="/profile">View profile</Link></Button>
                  </div>
                  )
                 }
                 
                 
                  
                  <div className='flex w-fit items-center gap-2 cursor-pointer'>
                    <Button onClick={logoutHandler} variant="link">
                      <LogOut />
                      logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
