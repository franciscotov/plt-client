import { useCallback, useEffect, useRef, useState } from "react";
import { buildHeader } from "./basicParams";
import { ApiType, FetchData } from "@/utils/interfaces/interfaces";
import { DELETE, GET, POST, PUT, apiType } from "./apiVerbs";

const options = buildHeader();

const useFetch = <T>(url: string, verb: ApiType, body = {}, params = {}) => {
  const [fetchedData, setFetchedData] = useState<FetchData<T>>({
    data: null,
    isLoading: true,
    error: false,
    status: 200,
  });
  const fetchData = useCallback(async () => {
    let response = null;
    if (Object.keys(params).length > 0) {
      options.params = { ...options.params, ...params };
    }

    if (apiType[verb]) {
      if (apiType[verb] === apiType.GET) {
        response = await GET<T>(url, options);
      }
      if (apiType[verb] === apiType.DELETE) {
        response = await DELETE(url);
      }
      if (apiType[verb] === apiType.POST) {
        response = await POST<T>(url, body, options);
      }
      if (apiType[verb] === apiType.PUT) {
        response = await PUT<T>(url, body, options);
      }
    }
    if (response) {
      const { data: resData, status: resStatus } = response;
      if (resStatus === 200 || resStatus === 201) {
        const newData: FetchData<T> = {
          data: resData,
          isLoading: false,
          error: false,
          status: resStatus,
        };
        setFetchedData(newData);
      } else {
        const newData: FetchData<T> = {
          data: null,
          isLoading: false,
          error: true,
          status: resStatus,
        };
        setFetchedData(newData);
      }
    }
  }, [JSON.stringify(params), body, url, verb]);

  useEffect(() => {
    fetchData();
  }, [url, JSON.stringify(params)]);

  const { data, isLoading, error, status } = fetchedData;
  return { data, isLoading, error, status };
};

export default useFetch;
