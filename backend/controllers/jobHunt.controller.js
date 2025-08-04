import { JobHunt } from '../models/jobHunt.model.js';
import axios from 'axios';

// Function to make API call to RapidAPI (extracted for reuse)
const makeRapidAPICall = async (searchQuery, page, numPages, country) => {
  const options = {
    method: 'GET',
    url: 'https://jsearch.p.rapidapi.com/search',
    params: {
      query: searchQuery,
      page: page.toString(),
      num_pages: numPages.toString(),
      country: country.toLowerCase(),
      date_posted: 'all'
    },
    headers: {
      'x-rapidapi-key': 'f0b42ac17dmsh109237a79ab5c5cp195c47jsne2f1c8e40881',
      'x-rapidapi-host': 'jsearch.p.rapidapi.com'
    }
  };

  const response = await axios.request(options);
  
  let jobs = [];
  let totalResults = 0;

  if (response.data.data && response.data.data.length > 0) {
    jobs = response.data.data;
    totalResults = response.data.data.length;
  }

  return { jobs, totalResults };
};

export const searchJobs = async (req, res) => {
  try {
    const { city, country, field, page = 1, numPages = 3 } = req.body;
    const userId = req.id; // From auth middleware

    if (!city || !country) {
      return res.status(400).json({ 
        message: 'City and country are required', 
        success: false 
      });
    }

    console.log(`Making API call for ${field || 'general'} search in ${city}, ${country}`);
    
    // Build search query based on field
    let searchQuery = `internship jobs in ${city}`;
    if (field && field.trim()) {
      searchQuery = `${field} internship jobs in ${city}`;
    }

    // Make API call to RapidAPI
    const apiResult = await makeRapidAPICall(searchQuery, page, numPages, country);
    const jobs = apiResult.jobs;
    const totalResults = apiResult.totalResults;

    // Save to MongoDB (always save user's search history)
    const jobHuntData = new JobHunt({
      userId,
      searchQuery: { city, country, field: field || null },
      jobs,
      totalResults,
      searchParams: { page, numPages }
    });

    await jobHuntData.save();

    return res.status(200).json({
      message: 'Jobs searched successfully',
      success: true,
      data: {
        jobs,
        totalResults,
        searchQuery: { city, country, field: field || null },
        searchId: jobHuntData._id,
        pagination: { page, numPages }
      }
    });

  } catch (error) {
    console.error('Job search error:', error);
    return res.status(500).json({ 
      message: 'Failed to search jobs', 
      success: false 
    });
  }
};

export const getJobHistory = async (req, res) => {
  try {
    const userId = req.id;
    
    const jobHistory = await JobHunt.find({ userId })
      .sort({ searchDate: -1 })
      .limit(10); // Get last 10 searches

    return res.status(200).json({
      message: 'Job history retrieved successfully',
      success: true,
      data: jobHistory
    });

  } catch (error) {
    console.error('Get job history error:', error);
    return res.status(500).json({ 
      message: 'Failed to get job history', 
      success: false 
    });
  }
};

export const getJobSearchById = async (req, res) => {
  try {
    const { searchId } = req.params;
    const userId = req.id;

    const jobSearch = await JobHunt.findOne({ 
      _id: searchId, 
      userId 
    });

    if (!jobSearch) {
      return res.status(404).json({
        message: 'Job search not found',
        success: false
      });
    }

    return res.status(200).json({
      message: 'Job search retrieved successfully',
      success: true,
      data: jobSearch
    });

  } catch (error) {
    console.error('Get job search error:', error);
    return res.status(500).json({ 
      message: 'Failed to get job search', 
      success: false 
    });
  }
};

export const deleteJobSearch = async (req, res) => {
  try {
    const { searchId } = req.params;
    const userId = req.id;

    const deletedSearch = await JobHunt.findOneAndDelete({ 
      _id: searchId, 
      userId 
    });

    if (!deletedSearch) {
      return res.status(404).json({
        message: 'Job search not found',
        success: false
      });
    }

    return res.status(200).json({
      message: 'Job search deleted successfully',
      success: true
    });

  } catch (error) {
    console.error('Delete job search error:', error);
    return res.status(500).json({ 
      message: 'Failed to delete job search', 
      success: false 
    });
  }
};

 