import React from "react";
import { createGame } from "@/services/gameService";
import useAlert from "@/components/molecules/alert/AlertComponent";
import { useRouter } from "next/navigation";
import i18n from "@/i18n/i18n-es.json";
import routes from "@/routes/routes";
import { GameAttributes, UserBase } from "@/utils/interfaces/interfaces";
import { formConst } from "@/constants";

const ViewModel = () => {
  const { AlertComponent, openSnackbar } = useAlert();
  const { push } = useRouter();

  const { game } = formConst;
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

  const manageWithValue = {
    [game.day]: true,
    [game.campusId]: true,
  };

  const convertValue = {
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
  };
};

export default ViewModel;
