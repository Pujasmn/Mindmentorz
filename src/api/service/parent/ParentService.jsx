import { parentInstance } from "../../axios/ParentInstance";

export const parentLogin = async (mobile) => {
  try {
    const response = await parentInstance.post(`/parent/login`, {
      mobile,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const verifyOtp = async (otp) => {
  try {
    const response = await parentInstance.post(`/parent/verify-otp`, {
      otp,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const parentKidsRegistration = async (formData,state) => {
  try {
    const response = await parentInstance.post(`/parent/parent-kids-registration`, {
      formData,state,
    });
    return response;
  } catch (err) {
    return err;
  }
};


export const parentBookDemoClass = async (formData,state) => {
  try {
    console.log("parentBookDemoClass",formData,state)
    const response = await parentInstance.post(`/parent/parent-book-demo-class`, {
      formData,state,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const gettingKidsData = async (parentId) => {
  try {
  
    const response = await parentInstance.get(`/parent/get-kids-data/${parentId}`);
    return response;
  } catch (err) {
    return err;
  }
};