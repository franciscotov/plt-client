import i18n from "@/i18n/i18n-es.json";
import {
  CampusAttributes,
  ListAttributes,
  PaginateDTO,
} from "@/utils/interfaces/interfaces";
import { getCampus } from "./campusService";
import { getListByCampusId } from "./listService";

/*
 * get campus data
 */
export const fetchDataCampus: PaginateDTO<CampusAttributes> | any = async (
  setDataCampus: any,
  setLoadingCampus: any,
  openSnackbar: any
) => {
  const res: PaginateDTO<CampusAttributes> | any = await getCampus(0, 1000);
  if (res?.status === 200) {
    if (res.data) {
      setLoadingCampus(false);
      const formatedRows = res.data.rows.map((campus: CampusAttributes) => ({
        ...campus,
        label: campus.name,
        value: campus.id,
      }));
      setDataCampus(formatedRows);
    } else {
      setDataCampus([]);
    }
  } else {
    openSnackbar(i18n.errorTitle, i18n.errorMsgGetDataCampus, "error");
    setLoadingCampus(false);
    setDataCampus([]);
  }
};

/*
 * get list data
 */
export const fetchDataList: PaginateDTO<ListAttributes> | any = async (
  setDataList: any,
  setLoadingList: any,
  openSnackbar: any,
  campusId: number
) => {
  const res: PaginateDTO<ListAttributes> | any = await getListByCampusId(
    campusId,
    0,
    1000
  );
  if (res?.status === 200) {
    if (res.data) {
      setLoadingList(false);
      const formatedRows = res.data.map((list: ListAttributes) => ({
        ...list,
        label: list.name,
        value: list.id,
      }));
      setDataList(formatedRows);
    } else {
      setDataList([]);
    }
  } else {
    openSnackbar(i18n.errorTitle, i18n.errorMsgGetDataList, "error");
    setLoadingList(false);
    setDataList([]);
  }
};
