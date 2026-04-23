import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverURL } from '../main';
import { setUserData } from "../redux/userSlice";

const getCurrentUser = () => {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.user)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = axios.get(`${serverURL}/api/user/current`, {
          withCredentials: true,
        });
        dispatch(setUserData(res.data));
      } catch (error) {
        console.log(error);  
      }
    };
    fetchUser()
  }, [userData]);
};

export default getCurrentUser;