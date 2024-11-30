import { useState, useRef } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import mindMentorImage from "../../assets/mindmentorz.png";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { verifyOtp } from '../../api/service/parent/ParentService';

const ParentOtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  console.log("State in parent otp",state.phoneNumber)

  const [otp, setOtp] = useState(['', '', '', '']);
  const [language, setLanguage] = useState("English");

  const otpRefs = useRef([]);
  
  const handleOtpChange = (index, value) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
   
    if (value && index < otp.length - 1) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const otpResponse = await verifyOtp(otp);
      if (otpResponse.status === 200) {
        toast.success(otpResponse?.data?.message);
  
        setTimeout(() => {
          if (state?.data?.type === "exist") {
            localStorage.setItem("parentId", otpResponse?.data?.parentData?._id);
            navigate("/parent/dashboard");
          } else {
            navigate("/parent/registration",{state:state});
          }
        }, 1500);
      } else {
        toast.error("Failed to verify OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error in verify OTP", err);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
    {/* Left Side - Set fixed background color directly */}
    <div className="bg-[rgb(177,21,177)] text-white lg:w-2/5 p-8 flex flex-col justify-between relative">
      <div className="flex-grow flex flex-col justify-center mb-8 lg:mb-0">
        <h2 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">Welcome to</h2>
        <img src={mindMentorImage} alt="mindMentorImage" className="w-full h-auto" />
      </div>
      <div className="flex justify-between items-center mt-4 lg:mt-8">
        <button onClick={() => navigate("/")} className="flex items-center text-sm hover:underline transition duration-300">
          <ArrowLeft size={16} className="mr-2" /> back to site
        </button>
        <div className="relative">
          <button
            className="flex items-center text-sm focus:outline-none hover:bg-opacity-20 hover:bg-black p-2 rounded transition duration-300"
            onClick={() => setLanguage(language === "English" ? "Hindi" : "English")}
          >
            <span className="mr-2">🇬🇧</span>
            <span>{language}</span>
            <ChevronDown size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  
    {/* Right Side - Form */}
    <div className="lg:w-3/5 p-8 bg-white flex items-center justify-center lg:mr-8">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-[rgb(177,21,177)] mb-4">
            Parents Login
          </h2>
          <p className="text-sm text-gray-600">Please enter the OTP sent to your mobile number.</p>
        </div>
  
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div className="flex justify-start mb-2">
            <label className="text-sm font-medium text-gray-700">Enter OTP</label>
          </div>
  
          <div className="flex justify-between space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                ref={(el) => (otpRefs.current[index] = el)}
                className="w-14 sm:w-16 md:w-20 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(177,21,177)]"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                required
              />
            ))}
          </div>
  
          <button
            type="submit"
            className="w-full bg-[rgb(177,21,177)] text-white py-3 px-4 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(177,21,177)] transition duration-300"
          >
            Next →
          </button>
        </form>
      </div>
    </div>
  
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      pauseOnFocusLoss
    />
  </div>
  
  );
};

export default ParentOtpPage;
