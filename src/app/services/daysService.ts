import { DaysAttributes, PaginateDTO } from "@/utils/interfaces/interfaces";
import { getToken } from "@/utils/utils";
import { api } from "./interceptors";

const API_AIR_URL = process.env.NEXT_PUBLIC_API_APP;

export const getDays: PaginateDTO<DaysAttributes> | any = async (
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
    let response = await api.get<PaginateDTO<DaysAttributes> | any>(
      `${API_AIR_URL}days/list?limit=${limit}&offset=${page}`,
      options
    );
    return response;
  } catch (e) {
    console.error(e, "errorsssss");
    return undefined;
  }
};
