"use client";
import React, { useState, useEffect } from "react";
import { createGame } from "@/app/services/gameService";
import useAlert from "@/components/molecules/alert/AlertComponent";
import { useRouter } from "next/navigation";
import i18n from "@/i18n/i18n-es.json";
import routes from "@/routes/routes";
import {
  DaysAttributes,
  GameAttributes,
  GridMeasuresProps,
  PaginateDTO,
} from "@/utils/interfaces/interfaces";
import { formConst } from "@/constants";
import { getDays } from "@/app/services/daysService";
import { getTypes } from "@/app/services/gameTypeService";
import { fetchDataCampus } from "@/app/services/fetchData";

const ViewModel = (watch: any) => {
  const { AlertComponent, openSnackbar } = useAlert();
  const { push } = useRouter();
  const [dataCampus, setDataCampus] = useState<[] | null>(null);
  const [dataDays, setDataDays] = useState<[] | null>(null);
  const [dataTypes, setDataTypes] = useState<[] | null>(null);
  const [loadingCampus, setLoadingCampus] = useState(true);
  const [loadingDays, setLoadingDays] = useState(true);
  const [loadingTypes, setLoadingTypes] = useState(true);

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
   * get days data
   */
  const fetchDataDays: PaginateDTO<DaysAttributes> | any = async () => {
    const res: PaginateDTO<DaysAttributes> | any = await getDays(0, 10);
    if (res?.status === 200) {
      if (res.data) {
        setLoadingDays(false);
        const formatedRows = res.data.rows;
        setDataDays(formatedRows);
      } else {
        setDataDays([]);
      }
    } else {
      openSnackbar(i18n.errorTitle, i18n.errorMsgGetDataDays, "error");
      setLoadingDays(false);
      setDataDays([]);
    }
  };

  /*
   * get types data
   */
  const fetchDataTypes: PaginateDTO<DaysAttributes> | any = async () => {
    const res: PaginateDTO<DaysAttributes> | any = await getTypes(0, 100);
    if (res?.status === 200) {
      if (res.data) {
        setLoadingTypes(false);
        const formatedRows = res.data.rows;
        setDataTypes(formatedRows);
      } else {
        setDataTypes([]);
      }
    } else {
      openSnackbar(i18n.errorTitle, i18n.errorMsgGetDataDays, "error");
      setLoadingTypes(false);
      setDataTypes([]);
    }
  };

  useEffect(() => {
    if (!dataCampus) {
      fetchDataCampus(setDataCampus, setLoadingCampus, openSnackbar);
    }
    if (!dataDays) {
      fetchDataDays();
    }
    if (!dataTypes) {
      fetchDataTypes();
    }
  });

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
