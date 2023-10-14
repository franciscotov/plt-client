"use client";
import React from "react";
import { createGame } from "@/app/services/gameService";
import useAlert from "@/components/molecules/alert/AlertComponent";
import { useRouter } from "next/navigation";
import i18n from "@/i18n/i18n-es.json";
import routes from "@/routes/routes";
import {
  GameAttributes,
  GridMeasuresProps,
} from "@/utils/interfaces/interfaces";
import { formConst } from "@/constants";
import { FetchDataCampus, FetchDataDays, FetchDataTypes } from "@/app/services/fetchData";

const ViewModel = (watch: any) => {
  const { AlertComponent, openSnackbar } = useAlert();
  const { push } = useRouter();

  const gridMeasures: GridMeasuresProps = { sm: 6, md: 6, xs: 12 };

  const { game } = formConst;
  const initHour = watch(game.initHour);
  const submitGame = async (data: any) => {
    const body: GameAttributes = formateDataGame(data);
    const res: any = await createGame(body);
    if (res?.status === 200) {
      openSnackbar(
        i18n.titleSuccessCreateGame,
        i18n.msgSuccessCreateGame,
        "success"
      );
      setTimeout(() => {
        push(routes.backoffice);
      }, 500);
      return;
    }
    openSnackbar(i18n.errorTitle, i18n.errorMsgCreateGame, "error");
  };

  /*
   * get campus data
   */
  const {
    data: dataCampus,
    isLoading: loadingCampus,
  } = FetchDataCampus();

  /*
   * get days data
   */
  const {
    data: dataDays,
    isLoading: loadingDays,
  } = FetchDataDays();

   /*
   * get types data
   */
  const {
    data: dataTypes,
    isLoading: loadingTypes,
  } = FetchDataTypes();

  const manageWithValue = {
    [game.day]: true,
    [game.campusId]: true,
    [game.totalPlayers]: true,
  };

  const formateDataGame = (data: any) => {
    let body: any = {};
    Object.values(game).forEach((name) => {
      if (manageWithValue[name]) {
        body[name] = data[name]?.value;
      } else {
        body[name] = data[name];
      }
    });
    return body;
  };

  const propsStepper = { step: 1, min: 0, max: 24, lang: "en-US" };

  return {
    submitGame,
    AlertComponent,
    propsStepper,
    dataCampus,
    loadingCampus,
    dataDays,
    loadingDays,
    initHour,
    dataTypes,
    loadingTypes,
    gridMeasures,
  };
};

export default ViewModel;
