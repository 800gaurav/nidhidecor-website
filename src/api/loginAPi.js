// src/api/loginApi.js
import axios from "axios";
import { BaseUrl } from "./BaseUrl";

export async function loginApi({ id, password }) {
  
  if (!id || !password) {
    return {
      success: false,
      message: "Email and password are required",
    };
  }

  try {
    const response = await axios.post(`${BaseUrl()}/api/v1/user/auth/register`, {
      userId: id,
      password: password,
    });
  

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || error.message || "Server error",
    };
  }
}
