import React from 'react'
import Navbar from './shared/Navbar'
import Job from './job'
import FilterCard from './FilterCard'
import { useSelector, useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { Button } from './ui/button';
import { X } from 'lucide-react';

const Browse = () => {
    useGetAllJobs();
    const dispatch = useDispatch();
    const {allJobs = [], searchedQuery} = useSelector(store=>store.job);
    const { user } = useSelector(store => store.auth);
    
    console.log("Browse component - allJobs:", allJobs);
    console.log("Browse component - user:", user);
    console.log("Browse component - searchedQuery:", searchedQuery);
    
    const clearSearch = () => {
        dispatch(setSearchedQuery(""));
    };
    
    // Handle case where no jobs are available
    if (!allJobs || allJobs.length === 0) {
        return (
            <div>
                <Navbar/>
                <div className='max-w-7xl mx-auto my-10'>
                    <div className='flex items-center justify-between my-10'>
                        <h1 className='font-bold text-xl'>
                            {searchedQuery ? `Search Results for "${searchedQuery}" (0)` : 'Search Results (0)'}
                        </h1>
                        {searchedQuery && (
                            <Button onClick={clearSearch} variant="outline" size="sm">
                                <X className="h-4 w-4 mr-2" />
                                Clear Search
                            </Button>
                        )}
                    </div>
                    <div className='text-center py-8'>
                        <p className='text-gray-500'>
                            {searchedQuery ? `No jobs found for "${searchedQuery}"` : 'No jobs found'}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between my-10'>
                <h1 className='font-bold text-xl'>
                    {searchedQuery ? `Search Results for "${searchedQuery}" (${allJobs.length})` : `Search Results (${allJobs.length})`}
                </h1>
                {searchedQuery && (
                    <Button onClick={clearSearch} variant="outline" size="sm">
                        <X className="h-4 w-4 mr-2" />
                        Clear Search
                    </Button>
                )}
            </div>
            
            <div className='flex gap-6'>
                {/* Filter Sidebar */}
                <div className='flex-shrink-0'>
                    <FilterCard />
                </div>
                
                {/* Jobs Grid */}
                <div className='flex-1'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {
                            allJobs.map((job, index) => (
                                <Job key={job._id || index} job={job} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Browse