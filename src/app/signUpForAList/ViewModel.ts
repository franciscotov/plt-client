import React, { useState, useEffect } from "react";
import { loginUser } from "@/app/services/userService";
import useAlert from "@/components/molecules/alert/AlertComponent";
import { useRouter } from "next/navigation";
import i18n from "@/i18n/i18n-es.json";
import routes from "@/routes/routes";
import { setLogin } from "@/utils/utils";
import {
  SelectAttributes,
  UserBase,
} from "@/utils/interfaces/interfaces";
import { fetchDataCampus, fetchDataList } from "../services/fetchData";
import { signUpPlayerToList } from "../services/playerListService";
import { formConst } from "@/constants";
const { list } = formConst;

const ViewModel = (watch: any) => {
  const { AlertComponent, openSnackbar } = useAlert();
  const { push } = useRouter();
  const [dataCampus, setDataCampus] = useState<[] | null>(null);
  const [loadingCampus, setLoadingCampus] = useState(true);
  const [dataList, setDataList] = useState<[] | null>(null);
  const [loadingList, setLoadingList] = useState(false);
  const campusSeleted: SelectAttributes = watch(list.campus);

  const submitSignUpPlayerToList = async (data: any) => {
    const res: UserBase | any = await signUpPlayerToList(data.list.value);
    if (res?.status === 200) {
      openSnackbar(i18n.titleSuccessLogin, i18n.msgSuccessLogin, "success");
      setTimeout(() => {
        const userdata = res.data;
        // si es de tipo admin vamos al backoffice
        setLogin(res.data);
        if (userdata.role.id !== 1) {
          push(routes.backoffice);
        } else {
          push(routes.signUpForAList);
        }
      }, 500);
      return;
    }
    openSnackbar(i18n.errorTitle, i18n.errorMsgLogin, "error");
  };

  useEffect(() => {
    if (!dataCampus) {
      fetchDataCampus(setDataCampus, setLoadingCampus, openSnackbar);
    }
  });

  useEffect(() => {
    if (!dataList && campusSeleted) {
      setLoadingList(true);
      fetchDataList(
        setDataList,
        setLoadingList,
        openSnackbar,
        campusSeleted.value
      );
    }
  }, [campusSeleted]);

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
