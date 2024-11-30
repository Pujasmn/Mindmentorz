import { useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import mindMentorImage from "../../assets/mindmentorz.png";
import { useLocation, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";

const phoneInputStyle = {
  container: "!w-full",
  input:
    "!w-full !h-12 !text-base !pl-12 !pr-4 !border !border-gray-300 !rounded-lg focus:!ring-2 focus:!ring-[rgb(177,21,177)] focus:!border-[rgb(177,21,177)] !transition-colors",
  button: "!h-12 !bg-transparent !border-r !border-gray-300 !rounded-l-lg",
  dropdown: "!bg-white !shadow-lg !rounded-lg !border !border-gray-200 !mt-1",
  search: "!mx-2 !my-2 !px-3 !py-2 !border !border-gray-300 !rounded-md",
};

const ParentRegistration = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { phoneNumber } = state;

  const [mobile, setMobile] = useState(phoneNumber || "");
  const [isMobileWhatsapp, setIsMobileWhatsapp] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [childName, setChildName] = useState("");
  const [language, setLanguage] = useState("English");
  const [country, setCountry] = useState("in");

  const handleMobileChange = (value, countryData) => {
    setMobile(value);
    setCountry(countryData.countryCode);
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsMobileWhatsapp(checked);
    setMobile(checked ? phoneNumber : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      mobile: isMobileWhatsapp ? phoneNumber : mobile,
      email,
      name,
      childName,
      isMobileWhatsapp,
    };
    console.log("Data", data);
    navigate("/parent/parent-kids-registration", { state: data });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div
        style={{ backgroundColor: "rgb(177, 21, 177)" }}
        className="text-white lg:w-2/5 p-8 flex flex-col justify-between relative"
      >
        <div className="flex-grow flex flex-col justify-center">
          <h2 className="text-4xl font-bold leading-tight mb-4">Welcome to</h2>
          <img
            src={mindMentorImage}
            alt="mindMentorImage"
            className="max-w-full h-auto"
          />
        </div>
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-sm hover:underline transition duration-300"
          >
            <ArrowLeft size={16} className="mr-2" /> back to site
          </button>
          <div className="relative">
            <button
              className="flex items-center text-sm focus:outline-none hover:bg-opacity-20 hover:bg-black p-2 rounded transition duration-300"
              onClick={() =>
                setLanguage(language === "English" ? "Hindi" : "English")
              }
            >
              <span className="mr-2">🇬🇧</span>
              <span>{language}</span>
              <ChevronDown size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>

      <div className="lg:w-3/5 p-8 bg-white ml-0 mt-8 lg:mt-32 lg:ml-20 lg:mr-20 flex-1">
        <div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[rgb(177,21,177)] mb-2">
              Update More Details to your Profile
            </h2>
            <h2 className="text-sm text-gray-600">
              The Details given will be kept confidential and will not be used
              for any marketing purposes
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-start mb-2">
                <input
                  id="isMobileWhatsapp"
                  type="checkbox"
                  checked={isMobileWhatsapp}
                  onChange={handleCheckboxChange}
                  className="mt-1 h-4 w-4 text-purple-600 rounded"
                />
                <label
                  htmlFor="isMobileWhatsapp"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Is Phone Number same as WhatsApp number
                </label>
              </div>

              <div className="relative">
                <PhoneInput
                  country={country}
                  value={mobile}
                  onChange={handleMobileChange}
                  inputProps={{
                    name: "mobile",
                    required: true,
                    autoFocus: true,
                    disabled: isMobileWhatsapp,
                  }}
                  containerClass={phoneInputStyle.container}
                  inputClass={phoneInputStyle.input}
                  buttonClass={phoneInputStyle.button}
                  dropdownClass={phoneInputStyle.dropdown}
                  searchClass={phoneInputStyle.search}
                  enableSearch={true}
                  countryCodeEditable={!isMobileWhatsapp}
                />
              </div>

              <p className="text-xs text-[rgb(177,21,177)] mt-1">
                Will also be used for class notifications and to avoid calls
              </p>
            </div>

            <div className="space-y-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter your email ID"
              />
              <p className="text-xs text-[rgb(177,21,177)]">
                Will be used for sending payment invoices
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Enter your name"
                />
                <p className="text-xs text-[rgb(177,21,177)]">
                  Display name / Invoice name
                </p>
              </div>
              <div className="space-y-1">
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Enter your child name"
                />
                <p className="text-xs text-[rgb(177,21,177)]">
                  Participant name
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="bg-[rgb(177,21,177)] w-full py-3 px-4 text-white font-medium rounded-md hover:bg-opacity-90 transition duration-300 flex items-center justify-center"
            >
              Next
              <span className="ml-2">→</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ParentRegistration;
