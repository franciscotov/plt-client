import {
  ListAttributes,
  SignUpPlayerList,
  UserBase,
} from "@/utils/interfaces/interfaces";
import { getToken, getUserInfo } from "@/utils/utils";
import { api } from "./interceptors";

const API_AIR_URL = process.env.NEXT_PUBLIC_API_APP;

export const signUpPlayerToList: ListAttributes | any = async (
  listId: number
) => {
  const options = {
    headers: {
      token: getToken(),
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  const user: UserBase = getUserInfo();
  console.log(listId, "campusId, listId");
  const body: SignUpPlayerList = { listId, userEmail: user.email };
  try {
    let response = await api.post<ListAttributes[] | any>(
      `${API_AIR_URL}player-list/signUpForAList`,
      body,
      options
    );
    return response;
  } catch (e) {
    console.error(e, "errorsssss");
    return undefined;
  }
};
