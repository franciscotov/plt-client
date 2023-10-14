import i18n from "@/i18n/i18n-es.json";
import {
  ApiType,
  CampusAttributes,
  DaysAttributes,
  FetchData,
  GameTypeAttributes,
  ListAttributes,
  PaginateDTO,
} from "@/utils/interfaces/interfaces";
import { getListByCampusId } from "./listService";
import useFetch from "../hooks";

const paths = {
  campusList: "campus/list",
  daysList: "days/list",
  gameTypeList: "game-type/list",
  listByCampusId: "list/list-by-campus-id",
};

/*
 * get campus data, adapted to useFetch hook
 */
export const FetchDataCampus: PaginateDTO<CampusAttributes> | any = (
  params: any = {}
) => {
  const {
    data,
    isLoading,
    error,
    status,
  }: FetchData<PaginateDTO<CampusAttributes>> = useFetch<
    PaginateDTO<CampusAttributes>
  >(paths.campusList, ApiType.GET, {}, params);

  let formatedData = null;
  if (status === 200 && data && !isLoading && !error) {
    formatedData = data.rows.map((campus: CampusAttributes) => ({
      ...campus,
      label: campus.name,
      value: campus.id,
    }));
  }
  return { data: formatedData, isLoading, error, status };
};

/*
 * get days data, adapted to useFetch hook
 */
export const FetchDataDays: PaginateDTO<DaysAttributes> | any = (
  params: any = {}
) => {
  const {
    data,
    isLoading,
    error,
    status,
  }: FetchData<PaginateDTO<DaysAttributes>> = useFetch<
    PaginateDTO<DaysAttributes>
  >(paths.daysList, ApiType.GET, {}, params);

  return { data: data?.rows, isLoading, error, status };
};

/*
 * get game type data, adapted to useFetch hook
 */
export const FetchDataTypes: PaginateDTO<GameTypeAttributes> | any = (
  params: any = {}
) => {
  const {
    data,
    isLoading,
    error,
    status,
  }: FetchData<PaginateDTO<GameTypeAttributes>> = useFetch<
    PaginateDTO<GameTypeAttributes>
  >(paths.gameTypeList, ApiType.GET, {}, params);

  return { data: data?.rows, isLoading, error, status };
};

/*
 * get list, adapted to useFetch hook
 */
export const FetchDataList: PaginateDTO<ListAttributes> | any = (
  params: any = {}
) => {
  params = params.campusId ? params : {};
  const {
    data,
    isLoading,
    error,
    status,
  }: FetchData<PaginateDTO<ListAttributes> | any> = useFetch<
    PaginateDTO<ListAttributes>
  >(paths.listByCampusId, ApiType.GET, {}, params);

  let formatedData = null;
  if (status === 200 && data && !isLoading && !error) {
    formatedData = data.map((campus: ListAttributes) => ({
      ...campus,
      label: campus.name,
      value: campus.id,
    }));
  }
  return { data: formatedData, isLoading, error, status };
};
