import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { JOB_HUNT_API_END_POINT } from '../utils/constant';

// Async thunks
export const searchJobs = createAsyncThunk(
  'jobHunt/searchJobs',
  async ({ city, country, field, page = 1, numPages = 3 }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${JOB_HUNT_API_END_POINT}/search`,
        { city, country, field, page, numPages },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to search jobs');
    }
  }
);

export const getJobHistory = createAsyncThunk(
  'jobHunt/getJobHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${JOB_HUNT_API_END_POINT}/history`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get job history');
    }
  }
);

export const getJobSearchById = createAsyncThunk(
  'jobHunt/getJobSearchById',
  async (searchId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${JOB_HUNT_API_END_POINT}/search/${searchId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get job search');
    }
  }
);

export const deleteJobSearch = createAsyncThunk(
  'jobHunt/deleteJobSearch',
  async (searchId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${JOB_HUNT_API_END_POINT}/search/${searchId}`,
        { withCredentials: true }
      );
      return { searchId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete job search');
    }
  }
);

const initialState = {
  currentSearch: {
    jobs: [],
    searchQuery: null,
    searchId: null,
    totalResults: 0
  },
  jobHistory: [],
  loading: false,
  error: null,
  historyLoading: false,
  historyError: null
};

const jobHuntSlice = createSlice({
  name: 'jobHunt',
  initialState,
  reducers: {
    clearCurrentSearch: (state) => {
      state.currentSearch = {
        jobs: [],
        searchQuery: null,
        searchId: null,
        totalResults: 0
      };
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
      state.historyError = null;
    }
  },
  extraReducers: (builder) => {
    // Search Jobs
    builder
      .addCase(searchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSearch = {
          jobs: action.payload.data.jobs,
          searchQuery: action.payload.data.searchQuery,
          searchId: action.payload.data.searchId,
          totalResults: action.payload.data.totalResults
        };
        state.error = null;
      })
      .addCase(searchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Job History
    builder
      .addCase(getJobHistory.pending, (state) => {
        state.historyLoading = true;
        state.historyError = null;
      })
      .addCase(getJobHistory.fulfilled, (state, action) => {
        state.historyLoading = false;
        state.jobHistory = action.payload.data;
        state.historyError = null;
      })
      .addCase(getJobHistory.rejected, (state, action) => {
        state.historyLoading = false;
        state.historyError = action.payload;
      });

    // Get Job Search by ID
    builder
      .addCase(getJobSearchById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobSearchById.fulfilled, (state, action) => {
        state.loading = false;
        const searchData = action.payload.data;
        state.currentSearch = {
          jobs: searchData.jobs,
          searchQuery: searchData.searchQuery,
          searchId: searchData._id,
          totalResults: searchData.totalResults
        };
        state.error = null;
      })
      .addCase(getJobSearchById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Job Search
    builder
      .addCase(deleteJobSearch.fulfilled, (state, action) => {
        // Remove from history
        state.jobHistory = state.jobHistory.filter(
          search => search._id !== action.payload.searchId
        );
        
        // Clear current search if it was the deleted one
        if (state.currentSearch.searchId === action.payload.searchId) {
          state.currentSearch = {
            jobs: [],
            searchQuery: null,
            searchId: null,
            totalResults: 0
          };
        }
      });
  }
});

export const { clearCurrentSearch, clearError } = jobHuntSlice.actions;
export default jobHuntSlice.reducer; 