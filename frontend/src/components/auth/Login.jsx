import React, {useState} from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Link, Navigate } from 'react-router-dom'
import { RadioGroup } from '@/components/ui/radio-group'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'

const Login = () => {

  const [input, setInput] = useState({
      email: '',
      password: '',
      role: 'student',
    });
    const changeEventHandler = (e) => {
      setInput({
        ...input,
        [e.target.name]: e.target.value
      });
    }
  
    const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_END_POINT}/Login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      if(res.data.success) {
        Navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };
    
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Login</h1>
          <div className='my-2'>
            <Label> Email </Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              placeholder='ali@example.com'
              onChange={changeEventHandler}
            />
          </div>
          <div className='my-2'>
            <Label> Password </Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              placeholder='********'
              onChange={changeEventHandler}
            />
          </div>
          <div className='flex items-center justify-between'>
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Input 
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <button type='submit' className='w-full my-4 bg-black text-amber-50'>Login</button>
          <span className='text-sm'> Dont have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Login