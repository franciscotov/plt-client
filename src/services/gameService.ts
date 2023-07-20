import { GameAttributes } from "@/utils/interfaces/interfaces";
import { api } from "./interceptors";
import { getToken } from "@/utils/utils";
const API_AIR_URL = "http://localhost:3001/";

export const createGame: GameAttributes | any = async (
  data: GameAttributes
) => {
  const options = {
    headers: {
      token: getToken(),
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  try {
    let response = await api.post<GameAttributes | any>(
      `${API_AIR_URL}game/create`,
      data,
      options
    );
    return response;
  } catch (e) {
    console.error(e, "errorsssss");
    return undefined;
  }
};
