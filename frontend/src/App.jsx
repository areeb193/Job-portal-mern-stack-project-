import './App.css'
import Navbar from './components/shared/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Jobs from './components/Jobst';
import Browse from './components/Browse';
import Profile from './components/Profile';
import Companies from './components/admin/Companies';
import JobDescription from './components/JobDescription';
import JobHunt from './components/JobHunt';
import ProtectedRoute from './components/auth/ProtectedRoute';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import Adminjobs from './components/admin/Adminjobs';
import PostJob from './components/admin/PostJob';
import Applicants from './components/admin/Applicants';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

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
    element: <ProtectedRoute><Jobs/></ProtectedRoute>
  },
  {
    path: '/browse',
    element: <ProtectedRoute><Browse/></ProtectedRoute>
  }
  ,
  {
    path: "/description/:id" ,
    element: <ProtectedRoute><JobDescription/></ProtectedRoute> 

  },
  {
    path: '/profile',
    element: <ProtectedRoute><Profile/></ProtectedRoute>
  },
  {
    path: '/job-hunt',
    element: <ProtectedRoute><JobHunt/></ProtectedRoute>
  },
  //admin recruiter kay liya routes
  {
    path: "/admin/companies",

    element : <Companies/>
  },
  {
    path: "/admin/companies/create",

    element : <CompanyCreate/>
  }
  ,
  {
    path: "/admin/companies/:id",

    element : <CompanySetup/>
  },
  {
    path: "/admin/jobs",

    element : <Adminjobs/>
  },
  {
    path: "/admin/jobs/create",

    element : <PostJob/>
  },
  {
    path: "/admin/jobs/:id/applicants",

    element : <Applicants/>
  }

])

function App() {
  // Session guard: clear persisted state if user switches accounts
  const userId = useSelector((s) => s.auth?.user?._id);
  useEffect(() => {
    const key = 'persist_user_id';
    const prev = localStorage.getItem(key);
    if (userId) {
      if (prev && prev !== userId) {
        try {
          localStorage.removeItem('persist:root');
          sessionStorage.clear();
  } catch {
          // ignore
        }
        localStorage.setItem(key, userId);
        // Reload to rehydrate fresh state for the new user
        window.location.reload();
      } else if (!prev) {
        localStorage.setItem(key, userId);
      }
    } else if (prev) {
      localStorage.removeItem(key);
    }
  }, [userId]);

  return (
    <div>
    <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
