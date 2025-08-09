import {createSlice} from '@reduxjs/toolkit';

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    allJobs: [],
    originalJobs: [], // Store original unfiltered jobs
    allAdminJobs:[],
    singleJob: null,
    searchJobByText :"",
    allAppliedJobs:[],
    searchedQuery:"",
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setOriginalJobs: (state, action) => {
      state.originalJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs:(state,action)=>{
      state.allAdminJobs =action.payload;
    },
    setSearchJobByText:(state,action)=>{
      state.searchJobByText =action.payload;
    },
    setAllAppliedJobs : (state ,action) =>{
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery:(state,action)=>{
      state.searchedQuery = action.payload;
    }
  }
});

export const {setAllJobs, setOriginalJobs, setSearchedQuery ,setSingleJob, setAllAdminJobs,setSearchJobByText,setAllAppliedJobs} = jobSlice.actions;

export default jobSlice.reducer;

