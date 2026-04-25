import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData, setLoading } from "../redux/userSlice";
import axiosInstance from '../utils/axiosInstance';

const useGetCurrentUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.log('No token found, skipping fetch')
          dispatch(setLoading(false))
          return
        }
        
        const res = await axiosInstance.get('/api/user/current')
        dispatch(setUserData(res.data))
      } catch (error) {
        console.log('Error fetching user:', error);
        dispatch(setLoading(false))
      }
    };
    fetchUser()
  }, [dispatch]);
};

export default useGetCurrentUser;