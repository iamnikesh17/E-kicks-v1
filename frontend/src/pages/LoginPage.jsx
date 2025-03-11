import React, { useEffect, useState } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { useLoginUserMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import {Loader} from "../components/main";
export const LoginPage = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const [loginUser,{isLoading:loginLoading,error}]=useLoginUserMutation();
  const {userInfo}=useSelector((state)=>state.auth);


  const {search}=useLocation();
  const queryParams = new URLSearchParams(search);
  const redirect=queryParams.get("redirect") || "/";

  useEffect(()=>{
    if(userInfo){
      navigate("/");
    }
  },[redirect,userInfo,navigate])


  const submitHandler=async (e)=>{
    e.preventDefault();
    try{
        const res=await loginUser({email,password}).unwrap();
        console.log(res);
        toast.success("logged in succesfully");
        dispatch(setCredentials(res))
        navigate(`/${redirect}`);
    }catch(error){
        toast.error(error?.data?.message || error?.error)
    }
  }


  return loginLoading?<Loader/>:(
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6 animate-fade-in">
          Login
        </h2>
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-400">Or continue with</p>
          <div className="flex justify-center space-x-4 mt-4">
            <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-6 h-6"
              />
            </button>
            <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300">
              <img
                src="https://www.svgrepo.com/show/303114/facebook-3-logo.svg"
                alt="Facebook"
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-400 transition-colors duration-300"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

