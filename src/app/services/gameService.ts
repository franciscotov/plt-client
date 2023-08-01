import { GameAttributes } from "@/utils/interfaces/interfaces";
import { api } from "./interceptors";
import { getToken } from "@/utils/utils";
import { env } from "process";

const API_AIR_URL = env.NEXT_PUBLIC_API_APP || "http://localhost:3001/";

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

export const getGames: GameAttributes | any = async (
  page: number,
  limit: number
) => {
  const options = {
    headers: {
      token: getToken(),
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  const data: any = {};
  try {
    let response = await api.post<GameAttributes[] | any>(
      `${API_AIR_URL}game/list?limit=${limit}&offset=${page}`,
      data,
      options
    );
    return response;
  } catch (e) {
    console.error(e, "errorsssss");
    return undefined;
  }
};

export const updateGame: GameAttributes | any = async (row: any) => {
  const options = {
    headers: {
      token: getToken(),
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  const data: GameAttributes = { ...row };
  try {
    let response = await api.put<GameAttributes | any>(
      `${API_AIR_URL}game/update`,
      data,
      options
    );
    return response;
  } catch (e) {
    console.error(e, "errorsssss");
    return undefined;
  }
};
