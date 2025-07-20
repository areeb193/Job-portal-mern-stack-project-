import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getadimnJobs, getJobById,postJob,getAllJobs } from '../controllers/job.controller.js';
import { get } from 'mongoose';
const router = express.Router();

router.route('/post').post(isAuthenticated,postJob);
router.route('/get').get(isAuthenticated,getAllJobs);
router.route('/getadminjobs').get(isAuthenticated,getadimnJobs);

router.route('/get/:id').get(isAuthenticated,getJobById);

export default router;