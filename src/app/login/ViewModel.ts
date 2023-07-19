import React from "react";
import { loginUser } from "@/services/loginService";

const ViewModel = () => {
  const submitLogin = async (data: any) => {
    const rest = await loginUser(data.email, data.password);
    console.log("111111111", rest);
  }

  return {
    submitLogin,
  };
};

export default ViewModel;
