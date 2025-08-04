import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getAdminJobs, getJobById,postJob,getAllJobs, getJobs } from '../controllers/job.controller.js';
import { get } from 'mongoose';
const router = express.Router();

router.route('/post').post(isAuthenticated,postJob);
router.route('/get').get(isAuthenticated,getAllJobs);
router.route('/search').get(isAuthenticated,getJobs);
router.route('/getadminjobs').get(isAuthenticated,getAdminJobs);

router.route('/get/:id').get(isAuthenticated,getJobById);

export default router;