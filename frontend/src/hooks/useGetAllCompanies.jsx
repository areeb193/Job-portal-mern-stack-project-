import { useEffect } from 'react';
import axiosInstance from '../utils/axiosConfig';
import { COMPANY_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';

import { setCompanies } from '../redux/companySlice';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    
    useEffect(() => {
        const fetchCompanies = async () => {
            if (!user) {
                console.log('User not authenticated, skipping job fetch');
                return;
            }
            
            try {
                const res = await axiosInstance.get(`${COMPANY_API_END_POINT}/get`);
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            }
            catch (error) {
                console.error('Error fetching jobs:', error);
                if (error.response?.status === 401) {
                    console.log('Authentication required for fetching jobs');
                }
            }
        };
        fetchCompanies();
    }, [user, dispatch]);
};

export default useGetAllCompanies;