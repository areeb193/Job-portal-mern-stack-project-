import mongoose from "mongoose";

const jobHuntSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  searchQuery: {
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    field: {
      type: String,
      default: null
    }
  },
  searchParams: {
    page: {
      type: Number,
      default: 1
    },
    numPages: {
      type: Number,
      default: 3
    }
  },
  jobs: [{
    job_id: {
      type: String,
      required: true
    },
    employer_name: {
      type: String,
      required: true
    },
    job_title: {
      type: String,
      required: true
    },
    job_city: {
      type: String,
      required: true
    },
    job_country: {
      type: String,
      required: true
    },
    job_apply_link: {
      type: String,
      required: true
    },
    job_description: {
      type: String
    },
    job_employment_type: {
      type: String
    },
    job_salary: {
      type: String
    },
    job_posted_at_datetime_utc: {
      type: String
    }
  }],
  searchDate: {
    type: Date,
    default: Date.now
  },
  totalResults: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Create compound index for efficient queries
jobHuntSchema.index({ userId: 1, searchDate: -1 });

export const JobHunt = mongoose.model('JobHunt', jobHuntSchema); 