import { useState } from "react";
import { ArrowLeft, ChevronDown, ArrowRight } from "lucide-react";
import mindMentorImage from "../../assets/mindmentorz.png";
import { validateForm } from "../../utils/Validation";
import { ToastContainer, toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import { parentLogin } from "../../api/service/parent/ParentService";

const ParentLogin = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [language, setLanguage] = useState("English");
  const [country, setCountry] = useState("in");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    const { errors, formattedNumber } = validateForm(mobile, country.toUpperCase());

    if (errors?.mobileNumber) {
      toast.error(errors.mobileNumber);
      return;
    }

    try {
  
      const parentLoginResponse = await parentLogin(formattedNumber);
      
      if (parentLoginResponse.status === 200 || parentLoginResponse.status === 201) {
        toast.success(parentLoginResponse?.data?.message);
        
        setTimeout(() => {
          navigate("/parent/enter-otp", {
            state: {
              ...parentLoginResponse?.data,
              phoneNumber: formattedNumber
            }
          });
        }, 1500);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed. Please try again.");
    }
  };


  const phoneInputStyle = {
    container: "!w-full",
    input: "!w-full !h-12 !text-base !pl-12 !pr-4 !border !border-gray-300 !rounded-lg focus:!ring-2 focus:!ring-[rgb(177,21,177)] focus:!border-[rgb(177,21,177)] !transition-colors",
    button: "!h-12 !bg-transparent !border-r !border-gray-300 !rounded-l-lg",
    dropdown: "!bg-white !shadow-lg !rounded-lg !border !border-gray-200 !mt-1",
    search: "!mx-2 !my-2 !px-3 !py-2 !border !border-gray-300 !rounded-md"
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
     
      <div className="bg-[rgb(177,21,177)] text-white lg:w-2/5 p-4 sm:p-6 lg:p-8 flex flex-col justify-between relative min-h-[30vh] lg:min-h-screen">
        <div className="flex-grow flex flex-col justify-center items-center lg:items-start">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4">
            Welcome to
          </h2>
          <img 
            src={mindMentorImage} 
            alt="mindMentorImage" 
            className="w-auto max-w-[80%] sm:max-w-[60%] lg:max-w-[80%] h-auto object-contain"
          />
        </div>
        
        <div className="flex justify-between items-center w-full mt-4 lg:mt-0">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-xs sm:text-sm hover:underline transition-all duration-300 hover:opacity-80"
          >
            <ArrowLeft size={16} className="mr-1 sm:mr-2" /> back to site
          </button>
          
          <div className="relative">
            <button
              className="flex items-center text-xs sm:text-sm focus:outline-none hover:bg-white/10 p-2 rounded transition-all duration-300"
              onClick={() => setLanguage(language === "English" ? "Hindi" : "English")}
            >
              <span className="mr-1 sm:mr-2">🇬🇧</span>
              <span>{language}</span>
              <ChevronDown size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>

    
      <div className="lg:w-3/5 p-4 sm:p-6 lg:p-8 bg-white flex items-center justify-center flex-grow">
        <div className="w-full max-w-md mx-auto">
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[rgb(177,21,177)] mb-4">
              Parents Login
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 w-full">
            <div className="space-y-2">
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                Enter your phone number
              </label>
              
              <div className="relative">
                <PhoneInput
                  country={country}
                  value={mobile}
                  onChange={(value, countryData) => {
                    setMobile(value);
                    setCountry(countryData.countryCode);
                  }}
                  inputProps={{
                    name: "mobile",
                    required: true,
                    autoFocus: true,
                  }}
                  containerClass={phoneInputStyle.container}
                  inputClass={phoneInputStyle.input}
                  buttonClass={phoneInputStyle.button}
                  dropdownClass={phoneInputStyle.dropdown}
                  searchClass={phoneInputStyle.search}
                  enableSearch={true}
                  countryCodeEditable={false}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[rgb(177,21,177)] text-white py-3 px-4 rounded-lg hover:bg-opacity-90 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(177,21,177)] 
                transition-all duration-300 text-sm sm:text-base font-medium flex items-center justify-center"
            >
              Next <ArrowRight size={16} className="ml-2" />
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
        className="mt-16"
      />
    </div>
  );
};

export default ParentLogin;