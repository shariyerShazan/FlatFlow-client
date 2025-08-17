import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import {  setUser } from "../redux/user.slice";
import { USER_API_END_POINT } from "../utlis/apiEndPoints";
import { googleLogin } from "../firebase/firebase.config";

function Login() {
  useEffect(() => {
      document.title = "Login | FlatFlow";
    }, []);
    
  const navigate = useNavigate();
  const dispatch = useDispatch()


    const [loadingBtn, setLoadingBtn] = useState(false)
  const [eye, setEye] = useState(true);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    setLoadingBtn(true)
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        { email, password },
        { withCredentials: true }
      );
      if (res?.data?.success) {
        dispatch(setUser(res.data.user))
        toast.success(res?.data?.message || "login successful");
        setError("");
        navigate("/");
        e.target.reset();
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong";
      setError(errMsg);
    }finally{
        setLoadingBtn(false)
    }
  };


  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const user = result.user;
      const newUser = {
        fullName: user.displayName,
        email: user.email,
        profilePicture: user.photoURL,
      };

      const res = await axios.post(`${USER_API_END_POINT}/firebase-login`, newUser, { withCredentials: true });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || "Login successful");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message || "Google login failed");
    }
  };


  return (
    <div className="w-[90%] mx-auto">
        <Link className="flex items-center gap-2 btn bg-favone/80 hover:bg-favone w-min px-10 my-6" to={"/"}> <IoMdArrowRoundBack /> Home
        </Link>
        <div className="flex justify-center items-center h-[70vh]">
        
      <div>
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 w-96 border-favone border-2 p-5 rounded-xl shadow-xl hover:shadow-2xl"
        >
            <p className="text-2xl font-bold text-center">Flat<span className="text-favone">Flow</span> Login</p>
          {/* email */}
          <div className="flex flex-col">
            <label className="text-lg font-bold " htmlFor="">
              Email :
            </label>
            <input
              type="eamil"
              name="email"
              className="text-gray-500 border-favone border-2 p-2 rounded-md w-full"
              placeholder="Enter name here "
            />
          </div>

          {/* password */}
          <div className="flex flex-col relative">
            <label className="text-lg font-bold " htmlFor="">
              Password :
            </label>
            <input
              type={`${eye ? "password" : "text"}`}
              name="password"
              className="text-gray-500 border-favone border-2 p-2 rounded-md w-full "
              placeholder="Enter password here "
            />
            {eye ? (
              <IoMdEye
                type="button"
                onClick={() => setEye(!eye)}
                className=" absolute top-11/20 right-3 cursor-pointer"
                size={20}
              />
            ) : (
              <IoMdEyeOff
                type="button"
                onClick={() => setEye(!eye)}
                size={20}
                className=" absolute top-11/20 right-3 cursor-pointer"
              />
            )}
          </div>
          {/* error */}
          {error && <span className="text-red-500">{error}</span>}
          {/* login button */}
          <div className=" flex flex-col justify-center items-center w-full">
            <button
              type="submit"
              className="btn bg-favone/80 hover:bg-favone w-full"
            >
              {loadingBtn ?<div className="loading loading-spinner loading-md"></div> :"Login"}
            </button>

            {/* google login button */}
           <div className="border-b-1 border-gray-500 w-full">
           <button onClick={handleGoogleLogin} className="btn my-3 w-full bg-white hover:bg-favone/40 text-black border-[#e5e5e5] ">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
           </div>

            <span className="my-2 ">
              Don't have account?{" "}
              <Link className="text-green-500" to={"/register"}>
                register
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
    </div>
    
  );
}

export default Login;
