import React, { useState } from 'react'

import { login } from '../services/operations/authAPI';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      const {email,password} = formData;
      dispatch(login(email,password,navigate,setIsSubmitting));
    }
  };

  return (
    <>
      <div className=" box-content bg-black mt-14  flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-900 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute top-10 -left-24 w-64 h-64 bg-blue-900 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1/3 bg-gradient-to-t from-indigo-900 to-transparent opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-900 rounded-full filter blur-3xl opacity-20"></div>
      </div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-3 shadow-lg shadow-indigo-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-full w-full text-white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
        <h2 className="mt-6 text-center text-4xl font-bold text-white">
          Login
        </h2>
        <p className="mt-2 text-center text-cyan-400 text-opacity-80">
          Access your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-gray-900 bg-opacity-80 backdrop-blur-lg py-8 px-4 shadow-2xl shadow-indigo-500/10 sm:rounded-xl sm:px-10 border border-gray-800">
          {isSuccess ? (
            <div className="text-center">
              <div className="rounded-full h-16 w-16 flex items-center justify-center mx-auto bg-gradient-to-r from-green-400 to-cyan-500 shadow-lg shadow-cyan-500/30">
                <svg className="h-8 w-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Authentication Successful</h3>
              <p className="mt-2 text-gray-300">Welcome back to the system</p>
              <button 
                className="mt-6 w-full flex justify-center py-3 px-4 border-0 rounded-xl text-base font-medium text-white bg-gradient-to-r from-indigo-800 to-blue-700 hover:from-indigo-700 hover:to-blue-600 focus:outline-none shadow-lg shadow-blue-700/30 transition-all duration-300"
                onClick={() => setIsSuccess(false)}
              >
                Back to Login
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-cyan-400">
                  Email address
                </label>
                <div className="mt-1 relative group">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full px-4 py-3 bg-gray-800 bg-opacity-50 border-0 border-b-2 border-gray-700 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-200 shadow-sm transition-all duration-150 text-base"
                    placeholder="Your email address"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-cyan-400">
                    Password
                  </label>
                  <a href="#" className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-150">
                    Forgot password?
                  </a>
                </div>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full px-4 py-3 bg-gray-800 bg-opacity-50 border-0 border-b-2 border-gray-700 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-200 shadow-sm transition-all duration-150 text-base"
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-400">{errors.password}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700 rounded bg-gray-800"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-4 border-0 rounded-xl shadow-lg shadow-blue-700/30 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none disabled:opacity-50 transition-all duration-300"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Authenticating...
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </div>
              
              <div className="mt-6">
                <p className="text-center text-sm text-gray-400">
                  Don't have an account?{' '}
                  <a href="/signup" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-150">
                    Create one now
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
      
      {/* Animated glow lines */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30"></div>
      <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-30"></div>
      <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-indigo-500 to-transparent opacity-30"></div>
    </div>
    </>
  );
};

export default LoginForm;