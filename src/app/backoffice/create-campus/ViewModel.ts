import React from "react";
import { createGame } from "@/app/services/gameService";
import useAlert from "@/components/molecules/alert/AlertComponent";
import { useRouter } from "next/navigation";
import i18n from "@/i18n/i18n-es.json";
import routes from "@/routes/routes";
import { CampusAttributes } from "@/utils/interfaces/interfaces";
import { formConst } from "@/constants";
import { createCampus } from "@/app/services/campusService";

const ViewModel = () => {
  const { AlertComponent, openSnackbar } = useAlert();
  const { push } = useRouter();

  const { campus } = formConst;
  const submitCampus = async (data: any) => {
    const body: CampusAttributes = formateDataGame(data);
    const res: CampusAttributes | any = await createCampus(body);
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
    [campus.address]: true,
  };

  const manageValueFromOtherKey = {
    [campus.lat]: campus.address,
    [campus.lng]: campus.address,
  };

  const formateDataGame = (data: any) => {
    let body: any = {};
    Object.values(campus).forEach((name) => {
      if (manageWithValue[name]) {
        body[name] = data[name]?.value;
      } else if (manageValueFromOtherKey[name]) {
        body[name] = data[manageValueFromOtherKey[name]]
          ? data[manageValueFromOtherKey[name]][name]
          : 0;
      } else {
        body[name] = data[name];
      }
    });
    return body;
  };

  return {
    submitCampus,
    AlertComponent,
  };
};

export default ViewModel;
