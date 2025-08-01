import './App.css'
import Navbar from './components/shared/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Jobs from './components/jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import JobHunt from './components/JobHunt';
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },  
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/jobs',
    element: <Jobs/>
  },
  {
    path: '/browse',
    element: <Browse/>
  }
  ,
  {
    path: "/description/:id" ,
    element: <JobDescription/> 

  },
  {
    path: '/profile',
    element: <Profile/>
  },
  {
    path: '/job-hunt',
    element: <JobHunt/>
  }
])

function App() {

  return (
    <div>
    <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
