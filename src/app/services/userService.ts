import { UserBase } from "@/utils/interfaces/interfaces";
import { api } from "./interceptors";
import { env } from "process";

const API_AIR_URL = env.NEXT_PUBLIC_API_APP || "http://localhost:3001/";
// export const buildHeader = () => {
//   const session = getSession();
//   return {
//     headers: {
//       token: session.token,
//       userId: session.userId,
//       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//     },
//   };
// };

export const loginUser: UserBase | any = async (
  email: string,
  password: string
) => {
  const options = {
    headers: {
      email,
      password,
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
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
