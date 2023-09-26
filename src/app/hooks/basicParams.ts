import { ExtendHeader, Headers } from "@/utils/interfaces/interfaces";
import { getToken, getUserInfo } from "@/utils/utils";
import { AxiosRequestConfig } from "axios";

const session = getUserInfo();

export const buildHeader = (objToExtend: ExtendHeader = {}): AxiosRequestConfig<Headers> => {
  const headers: AxiosRequestConfig<Headers> = {
    headers: {
      token: getToken(),
      userId: getUserInfo().id,
      google: session.google,
      email: objToExtend.email,
      password: objToExtend.password
    },
  };
  return headers;
};
