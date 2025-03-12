import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
// import { setsignupData } from "../slices/authSlice";
import { useNavigate } from "react-router";
import Success from "../components/Sign_up_Component/Success";
import Header_Signup from "../components/Sign_up_Component/Header_Signup";
import Info from "../components/Sign_up_Component/Form_information";
import Already_registered from "../components/Sign_up_Component/Already_registered";
import Submit from "../components/Sign_up_Component/Submit_button";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      //dispatch(setsignupData(formData));
      //send opt to verify email
      const email = formData.email;
    }
  };

  return (
    <div>
      {loading ? (
        <div className="text-white">loading</div>
      ) : (
        <div className="min-h-screen  bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
          <Header_Signup/>
          <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md z-10">
            <div className="bg-gray-900 bg-opacity-80 backdrop-blur-lg py-8 px-4 shadow-2xl shadow-indigo-500/10 sm:rounded-xl sm:px-10 border border-gray-800">
              {isSuccess ? (
                <Success formdata={formData} />
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                 
                  <Info 
                   formData = {formData} handleChange = {handleChange}
                   errors = {errors}
                   showConfirmPassword = {showConfirmPassword}
                   showPassword = {showPassword}
                   setShowPassword = {setShowPassword}
                   setShowConfirmPassword = {setShowConfirmPassword}
                  />

                  <Submit isSubmitting = {isSubmitting} formData = {formData}/>
            
                  <Already_registered/>
            
                </form>
              )}
            </div>
          </div>

          {/* Animated glow lines */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30"></div>
          <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-30"></div>
          <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-indigo-500 to-transparent opacity-30"></div>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
