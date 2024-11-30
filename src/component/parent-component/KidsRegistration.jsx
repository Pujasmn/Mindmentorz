import { useState } from "react";
import { ArrowLeft, ChevronDown, Plus, Trash2 } from "lucide-react";
import mindMentorImage from "../../assets/mindmentorz.png";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { parentBookDemoClass } from "../../api/service/parent/ParentService";

const KidsRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [language, setLanguage] = useState("English");
  
  // Updated state for multiple programs
  const [enrollments, setEnrollments] = useState([{
    id: Date.now(),
    program: "",
    programLevel: ""
  }]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleAddProgram = () => {
    setEnrollments([
      ...enrollments,
      { id: Date.now(), program: "", programLevel: "" }
    ]);
  };

  const handleRemoveProgram = (id) => {
    if (enrollments.length > 1) {
      setEnrollments(enrollments.filter(item => item.id !== id));
    }
  };

  const handleProgramChange = (id, field, value) => {
    setEnrollments(enrollments.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
   
    const programsData = enrollments.map(({ program, programLevel }) => ({
      program,
      programLevel
    }));

    const formData = {
      programs: programsData,
      date,
      time
    };

    try {
      console.log("Registration data:", formData, state);
      const response = await parentBookDemoClass(formData, state);
      console.log(response);
      
      if (response.status === 201) {
        toast.success(response.data.message);
        localStorage.setItem("parentId", response?.data?.parentId);
        setTimeout(() => {
          navigate("/parent/dashboard");
        }, 1500);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="bg-[#b115b1] text-white lg:w-2/5 p-8 flex flex-col justify-between relative">
        <div className="flex-grow flex flex-col justify-center">
          <h2 className="text-4xl font-bold leading-tight mb-4">Welcome to</h2>
          <img src={mindMentorImage} alt="mindMentorImage" />
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

      <div className="lg:w-3/5 p-8 bg-white flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-[#b115b1]">Enroll your program / Level</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {enrollments.map((enrollment, index) => (
              <div key={enrollment.id} className="relative">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor={`program-${index}`} className="font-medium block mb-2">
                      Program
                    </label>
                    <select
                      id={`program-${index}`}
                      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full"
                      value={enrollment.program}
                      onChange={(e) => handleProgramChange(enrollment.id, 'program', e.target.value)}
                    >
                      <option value="">Choose a program</option>
                      <option value="Chess">Chess</option>
                      <option value="Coding">Coding</option>
                      <option value="Rubiks Cube">Rubiks Cube</option>
                      <option value="Robotics">Robotics</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`program-level-${index}`} className="font-medium block mb-2">
                      Program Level
                    </label>
                    <select
                      id={`program-level-${index}`}
                      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full"
                      value={enrollment.programLevel}
                      onChange={(e) => handleProgramChange(enrollment.id, 'programLevel', e.target.value)}
                    >
                      <option value="">Choose a level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>
                
                {enrollments.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveProgram(enrollment.id)}
                    className="absolute -right-8 top-10 text-red-500 hover:text-red-700 mr-1"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddProgram}
              className="flex items-center gap-2 text-[#b115b1] hover:text-opacity-80"
            >
              <Plus size={20} />
              Add Another Program
            </button>

            <div>
              <label htmlFor="date-time" className="font-medium block mb-2">
                Suitable Date & Time
              </label>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="date" className="text-sm mb-2">Date</label>
                  <input
                    type="date"
                    id="date"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="time" className="text-sm mb-2">Time</label>
                  <input
                    type="time"
                    id="time"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#b115b1] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition duration-300 w-full"
            >
              ENROLL
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

export default KidsRegistration;