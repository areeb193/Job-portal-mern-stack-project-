import express from 'express';
import { searchJobs, getJobHistory, getJobSearchById, deleteJobSearch } from '../controllers/jobHunt.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

// All routes require authentication
router.use(isAuthenticated);

// Search jobs and save to database
router.post('/search', searchJobs);

// Get user's job search history
router.get('/history', getJobHistory);

// Get specific job search by ID
router.get('/search/:searchId', getJobSearchById);

// Delete a job search
router.delete('/search/:searchId', deleteJobSearch);

export default router; 