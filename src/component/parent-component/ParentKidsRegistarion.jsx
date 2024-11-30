import { useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import mindMentorImage from "../../assets/mindmentorz.png";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { parentKidsRegistration } from "../../api/service/parent/ParentService";

const ParentKidsRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  console.log("Ste in parent registration",state)
  const [formData, setFormData] = useState({
    kidsName:state?.childName||"",
    age: "",
    gender: "",
    programs: [],
    chessLevel: "",
    rubiksCubeLevel: "",
    intention: "",
    schoolName: "",
    address: "",
    pincode: "",
  });

  const [language, setLanguage] = useState("English");

  // const programs = ["Chess", "Rubik's Cube"];

  // const chessLevels = [
  //   "Absolute Beginner - Not yet started playing",
  //   "Lower Beginner - Knows Castling",
  //   "Upper Beginner - Rating less than 1099",
  //   "Lower Intermediate - Rating is 1100 < 1299",
  //   "Upper Intermediate - Rating is 1300 < 1499",
  //   "Advanced - Rating is 1500+",
  // ];

  // const rubiksCubeLevels = [
  //   "Absolute Beginner - Never solved before",
  //   "Lower Beginner - Can solve one face",
  //   "Upper Beginner - Can solve two layers",
  //   "Intermediate - Can solve full cube (3+ minutes)",
  //   "Advanced - Can solve under 3 minutes",
  //   "Expert - Can solve under 1 minute",
  // ];

  const intention = ["Compitative", "Life Skill Improvement", "Summer Camp"];

  // const handleProgramSelect = (program) => {
  //   setFormData((prev) => {
  //     const newPrograms = prev.programs.includes(program)
  //       ? prev.programs.filter((p) => p !== program)
  //       : [...prev.programs, program];

  //     const updates = {
  //       programs: newPrograms,
  //     };

  //     if (!newPrograms.includes("Chess")) {
  //       updates.chessLevel = "";
  //     }
  //     if (!newPrograms.includes("Rubik's Cube")) {
  //       updates.rubiksCubeLevel = "";
  //     }

  //     return {
  //       ...prev,
  //       ...updates,
  //     };
  //   });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    try {
      const result = await parentKidsRegistration(formData, state);
      console.log(result);
      if (result.status === 201) {
        toast.success(result?.data?.message);
        setTimeout(() => {
          navigate("/parent/kids/demo", { state: result?.data?.data });
        }, 2000);
      }
    } catch (err) {
      console.log("Error in submit the data", err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
    <div
      style={{ backgroundColor: "rgb(177, 21, 177)" }}
      className="text-white lg:w-2/5 p-4 flex flex-col justify-between relative"
    >
      <div className="flex-grow flex flex-col justify-center">
        <h2 className="text-3xl font-bold leading-tight mb-4">Welcome to</h2>
        <img src={mindMentorImage} alt="mindMentorImage" className="mb-4" />
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-sm hover:underline transition duration-300"
        >
          <ArrowLeft size={16} className="mr-2" /> back to site
        </button>
        <div className="relative">
          <button
            className="flex items-center text-sm focus:outline-none hover:bg-opacity-20 hover:bg-black p-3 rounded transition duration-300"
            onClick={() => setLanguage(language === "English" ? "Hindi" : "English")}
          >
            <span className="mr-2">🇬🇧</span>
            <span>{language}</span>
            <ChevronDown size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
    <div className="lg:w-3/5 p-4 bg-gray-50 flex flex-col justify-between overflow-hidden mx-4 lg:mx-10 my-4 lg:my-0">
      <div className="w-full flex-grow overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#b115b1] mb-2">
          Student Registration Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Personal Information
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kids Name
                  </label>
                  <input
                    type="text"
                    name="kidsName"
                    value={formData.kidsName || state?.childName}
                    onChange={handleChange}
                    className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="Kids Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter age"
                    className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
  
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Intention of Parents
            </h3>
            <div className="space-y-4">
              <select
                name="intention"
                value={formData.intention}
                onChange={handleChange}
                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              >
                <option value="">Select Intention</option>
                {intention.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
  
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              School Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School Name
                </label>
                <input
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  placeholder="Enter school name"
                  className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                    className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter your pincode"
                    className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
  
          <div className="flex justify-center mt-6">

          <button
            type="submit"
            className="w-full bg-[rgb(177,21,177)] text-white py-3 px-4 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(177,21,177)] transition duration-300"
          >
            Next →
          </button>




        
          </div>
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

export default ParentKidsRegistration;
