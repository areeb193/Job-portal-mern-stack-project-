import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { APPLICATION_API_END_POINT } from '../../utils/constant'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import { setApplications } from '../../redux/applicationSlice'

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector((state)=>state.application);
    
    console.log("Applicants data in component:", applicants); // Debug log
    
 useEffect(()=>{
    const fetchAllApplicants = async () =>{
try {
    const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials:true});
    
        dispatch(setApplications(res.data.applicants));
    
} catch (error) {
    toast.error(error.response.data.message);
}

    }
    fetchAllApplicants();
 }, [dispatch, params.id])

  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto'>
            <h1 className='font-bold text-2xl my-5'>Applicants ({applicants?.length || 0})</h1>
            <ApplicantsTable/>
        </div>

    </div>
  )
}

export default Applicants