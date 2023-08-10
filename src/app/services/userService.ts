import { UserBase } from "@/utils/interfaces/interfaces";
import { api, buildHeader } from "./interceptors";
import { GoogleUser } from "@/utils/types";

const API_AIR_URL = process.env.NEXT_PUBLIC_API_APP;

export const loginUser: UserBase | any = async (
  email: string,
  password: string
) => {
  let options = buildHeader({ email, password });
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
