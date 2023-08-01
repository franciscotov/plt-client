"use client";
import React, { useState, useEffect } from "react";
import { createGame } from "@/app/services/gameService";
import useAlert from "@/components/molecules/alert/AlertComponent";
import { useRouter } from "next/navigation";
import i18n from "@/i18n/i18n-es.json";
import routes from "@/routes/routes";
import {
  CampusAttributes,
  DaysAttributes,
  GameAttributes,
  PaginateDTO,
} from "@/utils/interfaces/interfaces";
import { formConst } from "@/constants";
import { getCampus } from "@/app/services/campusService";
import { getDays } from "@/app/services/daysService";

const ViewModel = (watch: any) => {
  const { AlertComponent, openSnackbar } = useAlert();
  const { push } = useRouter();
  const [dataCampus, setDataCampus] = useState<[] | null>(null);
  const [dataDays, setDataDays] = useState<[] | null>(null);
  const [loadingCampus, setLoadingCampus] = useState(true);
  const [loadingDays, setLoadingDays] = useState(true);

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
  const fetchDataCampus: PaginateDTO<CampusAttributes> | any = async () => {
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

  useEffect(() => {
    if (!dataCampus) {
      fetchDataCampus();
    }
    if (!dataDays) {
      fetchDataDays();
    }
  });

  const manageWithValue = {
    [game.day]: true,
    [game.campusId]: true,
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
  };
};

export default ViewModel;
