import React, { useState, useEffect } from 'react'
import Navbar from './shared/Navbar'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Search, MapPin, Building, ExternalLink, Loader2, AlertCircle, History, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { 
  searchJobs, 
  getJobHistory, 
  getJobSearchById, 
  deleteJobSearch,
  clearCurrentSearch,
  clearError,
  resetLoading
} from '../redux/jobHuntSlice'

// Predefined internship fields
const INTERNSHIP_FIELDS = [
  { value: '', label: 'All Internships' },
  { value: 'Software Development', label: 'Software Development' },
  { value: 'Data Science', label: 'Data Science' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Design', label: 'Design' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Business', label: 'Business' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Education', label: 'Education' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Human Resources', label: 'Human Resources' },
  { value: 'Research', label: 'Research' },
  { value: 'Content Writing', label: 'Content Writing' },
  { value: 'Graphic Design', label: 'Graphic Design' },
  { value: 'Web Development', label: 'Web Development' },
  { value: 'Mobile Development', label: 'Mobile Development' },
  { value: 'Cybersecurity', label: 'Cybersecurity' },
  { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
  { value: 'Machine Learning', label: 'Machine Learning' }
]

const JobHunt = () => {
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [field, setField] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [numPages, setNumPages] = useState(3)
  const [showHistory, setShowHistory] = useState(false)

  const dispatch = useDispatch()
  const jobHuntState = useSelector((state) => state.jobHunt)
  const { user } = useSelector((state) => state.auth)
  
  // Provide fallback values if state is not available
  const { 
    currentSearch = { jobs: [], searchQuery: null, searchId: null, totalResults: 0 }, 
    jobHistory = [], 
    loading = false, 
    error = null, 
    historyLoading = false, 
    historyError = null 
  } = jobHuntState || {}

  // Debug logging
  console.log('JobHunt State:', { loading, error, jobHuntState })
  
  // Add effect to monitor loading state changes
  useEffect(() => {
    console.log('Loading state changed:', loading)
  }, [loading])

  // Load job history on component mount
  useEffect(() => {
    try {
      dispatch(getJobHistory())
    } catch (error) {
      console.error('Error loading job history:', error)
    }
  }, [dispatch])

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      try {
        dispatch(clearError())
      } catch (error) {
        console.error('Error clearing error state:', error)
      }
    }
  }, [dispatch])

  const handleSearch = async (e) => {
    e.preventDefault()
    
    if (!city.trim() || !country.trim()) {
      toast.error('Please enter both city and country')
      return
    }

    setCurrentPage(1) // Reset to first page on new search
    console.log('Starting search with:', { city, country, field, page: 1, numPages })
    
    try {
      // Add a small delay to test loading state
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const result = await dispatch(searchJobs({ city, country, field, page: 1, numPages })).unwrap()
      console.log('Search completed successfully:', result)
    } catch (error) {
      console.error('Error searching jobs:', error)
      toast.error(error || 'Failed to search jobs. Please try again.')
      // Force clear loading state if there's an error
      dispatch(resetLoading())
    }
  }

  const handleLoadSearch = async (searchId) => {
    try {
      await dispatch(getJobSearchById(searchId)).unwrap()
      setShowHistory(false)
    } catch (error) {
      console.error('Error loading search:', error)
      toast.error(error || 'Failed to load search. Please try again.')
    }
  }

  const handleDeleteSearch = async (searchId) => {
    try {
      await dispatch(deleteJobSearch(searchId)).unwrap()
      toast.success('Search deleted successfully')
    } catch (error) {
      console.error('Error deleting search:', error)
      toast.error(error || 'Failed to delete search. Please try again.')
    }
  }

  const handlePageChange = async (newPage) => {
    if (newPage < 1) return
    
    setCurrentPage(newPage)
    try {
      await dispatch(searchJobs({ city, country, field, page: newPage, numPages })).unwrap()
    } catch (error) {
      console.error('Error changing page:', error)
      toast.error(error || 'Failed to load page. Please try again.')
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatSearchDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect <span className="text-[#F83002]">Internship</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover exciting internship opportunities in your preferred location and field. 
            Search by city, country, and specific internship type to find the best matches for your career goals.
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-3xl mx-auto mb-8 bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Internships
              </h2>
              <p className="text-gray-600 text-sm">
                Enter your preferred location and field to find internship opportunities
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-2"
            >
              <History className="h-4 w-4" />
              History
            </Button>
          </div>
          
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium">City</Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="e.g., Lahore, Karachi"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-medium">Country</Label>
                <Input
                  id="country"
                  type="text"
                  placeholder="e.g., Pakistan, USA"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="field" className="text-sm font-medium">Internship Field</Label>
                <select
                  id="field"
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F83002] focus:border-transparent"
                >
                  {INTERNSHIP_FIELDS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="numPages" className="text-sm font-medium">Pages to Search</Label>
                <select
                  id="numPages"
                  value={numPages}
                  onChange={(e) => setNumPages(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F83002] focus:border-transparent"
                >
                  <option value={1}>1 page</option>
                  <option value={2}>2 pages</option>
                  <option value={3}>3 pages</option>
                  <option value={5}>5 pages</option>
                  <option value={10}>10 pages</option>
                </select>
              </div>
              <Button 
                type="submit" 
                variant="default"
                size="default"
                className="bg-[#F83002] hover:bg-[#d42a02] px-8"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search Internships
                  </>
                )}
              </Button>
              {loading && (
                <Button 
                  type="button" 
                  variant="outline"
                  size="sm"
                  onClick={() => dispatch(resetLoading())}
                  className="ml-2"
                >
                  Reset Loading
                </Button>
              )}
              <Button 
                type="button" 
                variant="outline"
                size="sm"
                onClick={() => console.log('Current loading state:', loading)}
                className="ml-2"
              >
                Debug Loading
              </Button>
            </div>
          </form>
        </div>

        {/* Job History */}
        {showHistory && (
          <div className="max-w-3xl mx-auto mb-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <History className="h-5 w-5" />
              Search History
            </h3>
            
            {historyLoading ? (
              <div className="text-center py-8">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-[#F83002]" />
                <p className="text-gray-600">Loading history...</p>
              </div>
            ) : historyError ? (
              <div className="text-center py-8">
                <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
                <p className="text-gray-600">{historyError}</p>
              </div>
            ) : jobHistory.length > 0 ? (
              <div className="space-y-3">
                {jobHistory.map((search) => (
                  <div key={search._id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {search.searchQuery.city}, {search.searchQuery.country}
                        {search.searchQuery.field && (
                          <span className="text-sm text-gray-600 ml-2">• {search.searchQuery.field}</span>
                        )}
                      </p>
                      <p className="text-sm text-gray-600">
                        {search.totalResults} results • {formatSearchDate(search.searchDate)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLoadSearch(search._id)}
                        className=""
                      >
                        Load
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteSearch(search._id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No search history found</p>
              </div>
            )}
          </div>
        )}

        {/* Current Search Results */}
        {currentSearch.searchId && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Found {currentSearch.totalResults} Internship Opportunities
              </h2>
              <p className="text-gray-600">
                in {currentSearch.searchQuery?.city}, {currentSearch.searchQuery?.country}
                {currentSearch.searchQuery?.field && (
                  <span className="text-[#F83002]"> • {currentSearch.searchQuery.field}</span>
                )}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => dispatch(clearCurrentSearch())}
                className="mt-2"
              >
                Clear Results
              </Button>
            </div>
            
            {currentSearch.jobs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentSearch.jobs.map((job) => (
                    <div key={job.job_id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {job.job_title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Building className="h-4 w-4" />
                          <span className="truncate">{job.employer_name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{job.job_city}, {job.job_country}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {job.job_employment_type && (
                          <Badge variant="secondary" className="text-xs">
                            {job.job_employment_type}
                          </Badge>
                        )}
                        
                        {job.job_salary && (
                          <p className="text-sm text-green-600 font-medium">
                            {job.job_salary}
                          </p>
                        )}
                        
                        {job.job_posted_at_datetime_utc && (
                          <p className="text-xs text-gray-500">
                            Posted: {formatDate(job.job_posted_at_datetime_utc)}
                          </p>
                        )}
                        
                        <Button 
                          asChild 
                          variant="default"
                          size="default"
                          className="w-full bg-[#F83002] hover:bg-[#d42a02]"
                        >
                          <a 
                            href={job.job_apply_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Apply Now
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center justify-center gap-4 mt-8">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1 || loading}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Page</span>
                    <span className="font-medium">{currentPage}</span>
                    <span className="text-sm text-gray-600">of {numPages}</span>
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= numPages || loading}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Results Found</h3>
                  <p className="text-gray-600">No internship opportunities found for the specified location and field.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default JobHunt