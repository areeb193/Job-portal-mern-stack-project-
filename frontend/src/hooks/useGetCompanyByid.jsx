import { useEffect } from 'react';
import axios from 'axios';
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '../redux/jobSlice';
import { setSingleCompany } from '../redux/companySlice';

const useGetCompanyByid = (companyId) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    
    useEffect(() => {
        const fetchSingleCompany = async () => {
            if (!user) {
                console.log('User not authenticated, skipping job fetch');
                return;
            }
            
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true});
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            }
            catch (error) {
                console.error('Error fetching company:', error);
                if (error.response?.status === 401) {
                    console.log('Authentication required for fetching company');
                } else if (error.response?.status === 500) {
                    console.log('Server error while fetching company');
                }
            }
        };
        fetchSingleCompany();
    }, [companyId,dispatch]);
};

export default useGetCompanyByid;