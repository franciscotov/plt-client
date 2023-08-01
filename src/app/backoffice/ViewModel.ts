import React, { useState } from "react";
import i18n from "@/i18n/i18n-es.json";
import {
  CampusAttributes,
  GameAttributes,
  PaginateDTO,
  Tabs,
} from "@/utils/interfaces/interfaces";
import { getGames } from "../services/gameService";
import { getCampus } from "../services/campusService";
import { states } from "@/utils/utils";

const ViewModel = () => {
  const [status, setStatus] = useState(1);
  const [refresh, setRefresh] = useState(true);
  const actions = () => [
    {
      text: i18n.activateGame,
      close: true,
      visible: true,
      action: async (row: any) => {
        // let arr = professionals.filter(
        //   pro => pro.professionalId !== row.professionalId,
        // )
        // setProfessionals(arr)
        // setRefreshProfessionalList(!refreshProfessionalList)
      },
    },
  ];

  const getDataGames = async (
    pageData: number,
    limit: number,
    field: string,
    orderData: number,
    filter: any
  ) => {
    const res: PaginateDTO<GameAttributes> | any = await getGames(pageData, limit);
    if (res?.status === 200) {
      if (res.data) {
        return { items: res.data.rows, total: res.data.count };
      } else {
        return { items: [], total: 0 };
      }
    } else {
      // openSnackbar(i18n.errorTitle, i18n.errorMsgGetDataCampus, "error");
      return { items: [], total: 0 };
    }
  };

  const handleChange = (_e: any, state: number) => {
    setStatus(state);
    setRefresh(!refresh)
  };

  const tabs: Tabs[] = [
    {
      title: i18n.gamesList,
      state: states.game,
      visible: true,
    },
    {
      title: i18n.campusList,
      state: states.campus,
      visible: true,
    },
  ];

  function handleIndex(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  /*
   * get campus data
   */
  const fetchDataCampus: PaginateDTO<CampusAttributes> | any = async (
    pageData: number,
    limit: number,
    field: string,
    orderData: number,
    filter: any
  ) => {
    const res: PaginateDTO<CampusAttributes> | any = await getCampus(pageData, limit);
    if (res?.status === 200) {
      if (res.data) {
        return { items: res.data.rows, total: res.data.count };
      } else {
        return { items: [], total: 0 };
      }
    } else {
      // openSnackbar(i18n.errorTitle, i18n.errorMsgGetDataCampus, "error");
      return { items: [], total: 0 };
    }
  };

  const getData = async (
    pageData: number,
    limit: number,
    field: string,
    orderData: number,
    filter: any
  ) => {
    if (status === states.game) {
      return await getDataGames(pageData, limit, field, orderData, filter);
    } else {
      return await fetchDataCampus(pageData, limit, field, orderData, filter);
    }
  };

  return {
    getData,
    refresh,
    actions,
    handleChange,
    tabs,
    handleIndex,
    status,
  };
};

export default ViewModel;
