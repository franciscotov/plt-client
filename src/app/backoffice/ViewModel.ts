import React, { useState } from "react";
import i18n from "@/i18n/i18n-es.json";
import {
  CampusAttributes,
  GameAttributes,
  PaginateDTO,
  Tabs,
} from "@/utils/interfaces/interfaces";
import { getGames, updateGame } from "../services/gameService";
import { getCampus, updateCampus } from "../services/campusService";
import { states } from "@/utils/utils";
import useAlert from "@/components/molecules/alert/AlertComponent";

const ViewModel = () => {
  const [status, setStatus] = useState(1);
  const [refresh, setRefresh] = useState(true);
  const { AlertComponent, openSnackbar } = useAlert();
  const actions = (rowData: any) => [
    {
      text: rowData.active ? i18n.deactivateGame : i18n.activateGame,
      close: true,
      visible: true,
      action: async (row: any) => {
        return await updateGameData(rowData);
      },
    },
  ];

  /*
   * update game data
   */
  const updateGameData = async (rowData: any) => {
    rowData.active = !rowData.active;
    let res: GameAttributes | any = null;
    if (status === states.game) res = await updateGame(rowData);
    else res = await updateCampus(rowData);
    if (res?.status === 200) {
      openSnackbar(i18n.titleSuccess, i18n.msgSuccessUpdateGame, "success");
      setRefresh(!refresh);
    } else {
      openSnackbar(i18n.errorTitle, i18n.errorMsgUpdateGame, "error");
      setRefresh(!refresh);
    }
  };

  /*
   * get games data
   */
  const getDataGames = async (
    pageData: number,
    limit: number,
    field: string,
    orderData: number,
    filter: any
  ) => {
    const res: PaginateDTO<GameAttributes> | any = await getGames(
      pageData,
      limit
    );
    if (res?.status === 200) {
      if (res.data) {
        return { items: res.data.rows, total: res.data.count };
      } else {
        return { items: [], total: 0 };
      }
    } else {
      openSnackbar(i18n.errorTitle, i18n.errorMsgGetDataGame, "error");
      return { items: [], total: 0 };
    }
  };

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
    const res: PaginateDTO<CampusAttributes> | any = await getCampus(
      pageData,
      limit
    );
    if (res?.status === 200) {
      if (res.data) {
        return { items: res.data.rows, total: res.data.count };
      } else {
        return { items: [], total: 0 };
      }
    } else {
      openSnackbar(i18n.errorTitle, i18n.errorMsgGetDataCampus, "error");
      return { items: [], total: 0 };
    }
  };

  const handleChange = (_e: any, state: number) => {
    setStatus(state);
    setRefresh(!refresh);
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
    status,
    AlertComponent,
  };
};

export default ViewModel;
