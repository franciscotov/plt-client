import React, { useState, useEffect } from "react";
import { loginUser } from "@/app/services/userService";
import useAlert from "@/components/molecules/alert/AlertComponent";
import { useRouter } from "next/navigation";
import i18n from "@/i18n/i18n-es.json";
import routes from "@/routes/routes";
import { setLogin } from "@/utils/utils";
import { SelectAttributes, UserBase } from "@/utils/interfaces/interfaces";
import { FetchDataCampus, FetchDataList } from "../services/fetchData";
import { signUpPlayerToList } from "../services/playerListService";
import { formConst } from "@/constants";
const { list } = formConst;

const ViewModel = (watch: any) => {
  const { AlertComponent, openSnackbar } = useAlert();
  const { push } = useRouter();
  const campusSeleted: SelectAttributes = watch(list.campus);

  const handleData = (res: any) => {
    if (res?.status === 200) {
      openSnackbar(i18n.titleSuccessLogin, i18n.msgSuccessLogin, "success");
      setTimeout(() => {
        push(routes.root);
      }, 500);
      return;
    }
    openSnackbar(i18n.errorTitle, i18n.errorMsgLogin, "error");
  };

  const submitSignUpPlayerToList = async (data: any) => {
    const res: UserBase | any = await signUpPlayerToList(data.list.value);
    handleData(res);
  };

  const { data: dataCampus, isLoading: loadingCampus } = FetchDataCampus();

  const { data: dataList, isLoading: loadingList } = FetchDataList({
    campusId: campusSeleted?.value,
  });

  return {
    submitSignUpPlayerToList,
    AlertComponent,
    loadingCampus,
    dataCampus,
    dataList,
    loadingList,
  };
};

export default ViewModel;
