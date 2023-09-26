import { useCallback, useEffect, useState } from "react";
import { buildHeader } from "./basicParams";
import { api } from "../services/interceptors";
import { ApiBody, ApiType, FetchData } from "@/utils/interfaces/interfaces";
import { AxiosRequestConfig } from "axios";

const API_URL = process.env.REACT_APP_AIR_API_URL;

const options = buildHeader();

export const apiType = {
  GET: ApiType.GET,
  POST: ApiType.POST,
  PUT: ApiType.PUT,
  DELETE: ApiType.DELETE,
};

const GET = async (url: string) => {
  return api.get(`${API_URL}/${url}`, options);
};

const POST = async (
  url: string,
  body: ApiBody,
  options?: AxiosRequestConfig
) => {
  return api.post(`${API_URL}/${url}`, body, options);
};

const PUT = async (
  url: string,
  body: ApiBody,
  options?: AxiosRequestConfig
) => {
  return api.put(`${API_URL}/${url}`, body, options);
};

const DELETE = async (url: string) => {
  return api.delete(`${API_URL}/${url}`, options);
};

const useFetch = (url: string, type: ApiType, body = {}) => {
  const [fetchedData, setFetchedData] = useState<FetchData>({
    data: null,
    isLoading: true,
    error: false,
    status: 200,
  });
  const fetchData = useCallback(async () => {
    let response = null;
    if (apiType[type]) {
      if (apiType[type] === apiType.GET) {
        response = await GET(url);
      }
      if (apiType[type] === apiType.DELETE) {
        response = await DELETE(url);
      }
      if (apiType[type] === apiType.POST) {
        response = await POST(url, body, options);
      }
      if (apiType[type] === apiType.PUT) {
        response = await PUT(url, body, options);
      }
    }
    if (response) {
      const { data: resData, status: resStatus } = response;
      if (resStatus === 200 || resStatus === 201) {
        const newData: FetchData = {
          data: resData,
          isLoading: false,
          error: false,
          status: resStatus,
        };
        setFetchedData(newData);
      } else {
        const newData: FetchData = {
          data: null,
          isLoading: false,
          error: true,
          status: resStatus,
        };
        setFetchedData(newData);
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [url]);

  const { data, isLoading, error, status } = fetchedData;
  return { data, isLoading, error, status };
};

export default useFetch;
