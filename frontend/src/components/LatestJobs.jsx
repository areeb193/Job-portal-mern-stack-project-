import React from 'react'
import { useSelector } from 'react-redux';
import LatestJobCards from './LatestJobCards'


//const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const LatestJobs = () => {
  const { allJobs = [] } = useSelector(store => store.job || {});

  return (
    <div className='max-w-7xl mx-auto my-20 px-4'>
      <h1 className='text-3xl md:text-5xl font-extrabold tracking-tight'>
        <span className='bg-clip-text text-transparent bg-gradient-to-r from-[#6A38C2] to-[#F83002]'>Latest & Top</span> Internship Openings
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6'>
        {
          allJobs.length < 1 ? <span>No jobs found</span> : allJobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job= {job} />)
        }
      </div>


    </div>

  )
}


export default LatestJobs