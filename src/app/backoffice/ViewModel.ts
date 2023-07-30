import React from "react";
import { GameAttributes } from "@/utils/interfaces/interfaces";
import { getGames } from "../services/gameService";

const ViewModel = () => {
  const getDataGames = async (
    pageData: number,
    limit: number,
    field: string,
    orderData: number,
    filter: any
  ) => {
    const res: any = await getGames(pageData, limit);
    if (res?.status === 200) {
      if (res.data) {
        // setLoadingCampus(false);
        return { items: res.data.rows, total: res.data.count };
        // const formatedRows = res.data.rows.map((campus: GameAttributes) => ({
        //   ...campus,
        //   label: campus.name,
        //   value: campus.id,
        // }));
        // setDataCampus(formatedRows);
      } else {
        return { items: [], total: 0 };
        // setDataCampus([]);
      }
    } else {
      // openSnackbar(i18n.errorTitle, i18n.errorMsgGetDataCampus, "error");
      // setLoadingCampus(false);
      // setDataCampus([]);
      return { items: [], total: 0 };
    }
  };

  /*
   * get campus data
   */
  // const fetchDataCampus: PaginateDTO<CampusAttributes> | any = async () => {
  //   const res: PaginateDTO<CampusAttributes> | any = await getCampus(0, 10);
  //   if (res?.status === 200) {
  //     if (res.data) {
  //       setLoadingCampus(false);
  //       const formatedRows = res.data.rows.map((campus: CampusAttributes) => ({
  //         ...campus,
  //         label: campus.name,
  //         value: campus.id,
  //       }));
  //       setDataCampus(formatedRows);
  //     } else {
  //       setDataCampus([]);
  //     }
  //   } else {
  //     openSnackbar(i18n.errorTitle, i18n.errorMsgGetDataCampus, "error");
  //     setLoadingCampus(false);
  //     setDataCampus([]);
  //   }
  // };
  return {
    getDataGames,
  };
};

export default ViewModel;
