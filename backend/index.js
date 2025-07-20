import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoutes from './routes/user.route.js';
import jobRoutes from './routes/job.route.js';
import companyRoutes from './routes/company.route.js';

dotenv.config({});
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the Job Portal Backend!');   });
// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin:'http://localhost:5173', // Replace with your frontend URL
  credentials: true, // Allow credentials to be sent
};
app.use(cors(corsOptions));


const PORT = process.env.PORT || 3000;

app.use('/api/v1/user', userRoutes);
//http://localhost:8000/api/v1/user/register
//http://localhost:8000/api/v1/user/login
//http://localhost:8000/api/v1/user/profile/update
app.use('/api/v1/company', companyRoutes);
app.use('/api/v1/job', jobRoutes);

app.listen(PORT, () => {

    connectDB();
  console.log(`Connected to MongoDB`);
  console.log(`Server is running on http://localhost:${PORT}`);
});