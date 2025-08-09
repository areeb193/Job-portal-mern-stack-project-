import React from 'react'
import { useSelector } from 'react-redux';
import LatestJobCards from './LatestJobCards'


//const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const LatestJobs = () => {
  const { allJobs = [] } = useSelector(store => store.job || {});

  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top</span> job Openings</h1>
      <div className='grid grid-cols-3 gap-4 my-5' >
        {
          allJobs.length < 1 ? <span>No jobs found</span> : allJobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job= {job} />)
        }
      </div>


    </div>

  )
}


export default LatestJobs