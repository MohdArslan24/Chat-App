import axios from "axios";

const loginAPI = async (formData, navigate) => {
    try{
        //API call to login the user
        const res = await axios.post("http://localhost:5000/api/auth/login", formData, {
          withCredentials: true,
        });
        if(res.data.success){
          //navigate to home page
          navigate('/');
        } else{
          alert(res.data.message);
        }
    }
    catch(err){
      console.log(err);
    }
}

const signupAPI = async (formData, navigate) => {
  if (formData.password !== formData.confirmPassword) {
      alert("Password and confirm password should be same");
      return;
    }
    try{
        //API call to signup the user
        const res = await axios.post("http://localhost:5000/api/auth/signup", formData, {
          withCredentials: true,
        });
        if(res.data.success){
          //navigate to home page
          navigate('/');
        } else{
          alert(res.data.message);
        }
    }
    catch(err){
      console.log(err);
    }
}

export {loginAPI, signupAPI}