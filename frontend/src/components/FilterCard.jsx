import React, { useState, useEffect } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../redux/jobSlice'

const filterData = [
  {
    filterType: "Location",
    key: "location",
    array: ["Lahore", "Multan", "Okara", "Karachi", "Islamabad", "Faisalabad", "Sialkot", "Gujranwala", "Peshawar"]
  },
  {
    filterType: "Job Type",
    key: "jobType",
    array: ["Full-time", "Part-time", "Contract", "Internship", "Remote"]
  },
  {
    filterType: "Experience Level",
    key: "experienceLevel",
    array: ["Entry Level", "Mid Level", "Senior", "Lead", "Manager"]
  },
  {
    filterType: "Salary Range",
    key: "salary",
    array: ["0-10k", "10k-20k", "20k-30k", "30k-40k", "40k-50k", "50k-60k", "60k-70k", "70k-80k", "80k-90k", "90k-100k"]
  }
]

const FilterCard = ({ onFilterChange }) => {
  const dispatch = useDispatch();
  const { originalJobs } = useSelector(store => store.job);
  const [filters, setFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState({});

  // Initialize filters
  useEffect(() => {
    const initialFilters = {};
    filterData.forEach(filter => {
      initialFilters[filter.key] = '';
    });
    setFilters(initialFilters);
  }, []);

  const handleFilterChange = (filterKey, value) => {
    const newFilters = { ...filters, [filterKey]: value };
    setFilters(newFilters);
    
    // Update active filters
    const newActiveFilters = { ...activeFilters };
    if (value) {
      newActiveFilters[filterKey] = value;
    } else {
      delete newActiveFilters[filterKey];
    }
    setActiveFilters(newActiveFilters);
    
    // Apply filters to jobs
    applyFilters(newActiveFilters);
  };

  const applyFilters = (filterCriteria) => {
    if (!originalJobs || originalJobs.length === 0) return;

    let filteredJobs = [...originalJobs];

    Object.keys(filterCriteria).forEach(filterKey => {
      const filterValue = filterCriteria[filterKey];
      if (filterValue) {
        filteredJobs = filteredJobs.filter(job => {
          const jobValue = job[filterKey];
          if (!jobValue) return false;

          // Handle different filter types
          switch (filterKey) {
            case 'location':
              return jobValue.toLowerCase().includes(filterValue.toLowerCase());
            case 'jobType':
              return jobValue.toLowerCase() === filterValue.toLowerCase();
            case 'experienceLevel':
              return jobValue.toLowerCase() === filterValue.toLowerCase();
            case 'salary':
              return checkSalaryRange(jobValue, filterValue);
            default:
              return jobValue.toLowerCase().includes(filterValue.toLowerCase());
          }
        });
      }
    });

    // Update the jobs in Redux
    dispatch(setAllJobs(filteredJobs));
    
    // Call parent callback if provided
    if (onFilterChange) {
      onFilterChange(filteredJobs);
    }
  };

  const checkSalaryRange = (jobSalary, range) => {
    const salary = parseInt(jobSalary);
    const [min, max] = range.split('-').map(s => parseInt(s.replace('k', '000')));
    return salary >= min && salary <= max;
  };

  const clearAllFilters = () => {
    setFilters({});
    setActiveFilters({});
    // Reset to original jobs
    dispatch(setAllJobs(originalJobs));
    if (onFilterChange) {
      onFilterChange(originalJobs);
    }
  };

  const clearFilter = (filterKey) => {
    const newFilters = { ...filters, [filterKey]: '' };
    setFilters(newFilters);
    
    const newActiveFilters = { ...activeFilters };
    delete newActiveFilters[filterKey];
    setActiveFilters(newActiveFilters);
    
    applyFilters(newActiveFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 w-[220px] min-w-[200px]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">Filter Jobs</h1>
        {Object.keys(activeFilters).length > 0 && (
          <Button onClick={clearAllFilters} variant="outline" size="sm">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <hr className='mb-4'/>
      
      {filterData.map((data, index) => (
        <div key={index} className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-medium text-sm">{data.filterType}</h2>
            {activeFilters[data.key] && (
              <Button 
                onClick={() => clearFilter(data.key)} 
                variant="ghost" 
                size="sm"
                className="h-6 px-2 text-xs"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          
          <RadioGroup 
            value={filters[data.key] || ""} 
            onValueChange={(value) => handleFilterChange(data.key, value)}
            className="space-y-2"
          >
            {data.array.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <RadioGroupItem value={item} id={`${data.key}-${item}`} />
                <Label htmlFor={`${data.key}-${item}`} className="text-sm cursor-pointer">
                  {item}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
      
      {Object.keys(activeFilters).length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <h3 className="text-sm font-medium mb-2">Active Filters:</h3>
          <div className="space-y-1">
            {Object.entries(activeFilters).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between text-xs bg-gray-50 px-2 py-1 rounded">
                <span>{key}: {value}</span>
                <Button 
                  onClick={() => clearFilter(key)} 
                  variant="ghost" 
                  size="sm"
                  className="h-4 px-1"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterCard