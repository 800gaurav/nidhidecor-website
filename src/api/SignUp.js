import axios from "axios";

export const SignupApi = async (formData) => {
  try {
    const res = await axios.post(`${BASE_URL()}/api/v1/user/auth/register`, formData);
    return res.data;
  } catch (err) {
    console.error("SignupApi Error:", err); // 👈 useful for debugging
    throw err?.response?.data || { message: "Signup failed, please try again" };
  }
};
