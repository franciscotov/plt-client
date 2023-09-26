import { ExtendHeader, UserBase } from "@/utils/interfaces/interfaces";
import { api } from "./interceptors";
import { GoogleUser } from "@/utils/types";
import { buildHeader } from "../hooks/basicParams";

const API_AIR_URL = process.env.NEXT_PUBLIC_API_APP;

export const loginUser: UserBase | any = async (
  email: string,
  password: string
) => {
  const extraDatatoHeader: ExtendHeader = { email, password }
  let options = buildHeader(extraDatatoHeader);
  try {
    let response = await api.get<UserBase | any>(
      `${API_AIR_URL}user/login`,
      options
    );
    return response;
  } catch (e) {
    console.error(e, "errorsssss");
    return undefined;
  }
};

export const loginUserGoogle: UserBase | any = async (
  user: GoogleUser
) => {
  let options = buildHeader();
  try {
    let response = await api.post<UserBase | any>(
      `${API_AIR_URL}user/login-google`,
      user,
      options
    );
    return response;
  } catch (e) {
    console.error(e, "errorsssss");
    return undefined;
  }
};
