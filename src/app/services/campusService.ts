import { CampusAttributes, PaginateDTO } from "@/utils/interfaces/interfaces";
import { api } from "./interceptors";
import { getToken } from "@/utils/utils";
import { env } from "process";

const API_AIR_URL = env.NEXT_PUBLIC_API_APP || "http://localhost:3001/";

export const createCampus: CampusAttributes | any = async (
  data: CampusAttributes
) => {
  const options = {
    headers: {
      token: getToken(),
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  try {
    let response = await api.post<CampusAttributes | any>(
      `${API_AIR_URL}campus/create`,
      data,
      options
    );
    return response;
  } catch (e) {
    console.error(e, "errorsssss");
    return undefined;
  }
};

export const getCampus: PaginateDTO<CampusAttributes> | any = async (
  page: number,
  limit: number
) => {
  const options = {
    headers: {
      token: getToken(),
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  try {
    let response = await api.get<PaginateDTO<CampusAttributes> | any>(
      `${API_AIR_URL}campus/list?limit=${limit}&offset=${page}`,
      options
    );
    return response;
  } catch (e) {
    console.error(e, "errorsssss");
    return undefined;
  }
};

export const getDays: PaginateDTO<CampusAttributes> | any = async (
  page: number,
  limit: number
) => {
  const options = {
    headers: {
      token: getToken(),
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  try {
    let response = await api.get<PaginateDTO<CampusAttributes> | any>(
      `${API_AIR_URL}days/list?limit=${limit}&offset=${page}`,
      options
    );
    return response;
  } catch (e) {
    console.error(e, "errorsssss");
    return undefined;
  }
};