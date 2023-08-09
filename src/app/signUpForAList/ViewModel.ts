import React from "react";
import { loginUser } from "@/app/services/userService";
import useAlert from "@/components/molecules/alert/AlertComponent";
import { useRouter } from "next/navigation";
import i18n from "@/i18n/i18n-es.json";
import routes from "@/routes/routes";
import { setLogin } from "@/utils/utils";
import { UserBase } from "@/utils/interfaces/interfaces";

const ViewModel = () => {
  const { AlertComponent, openSnackbar } = useAlert();
  const { push } = useRouter();
  const submitLogin = async (data: any) => {
    const res: UserBase | any = await loginUser(data.email, data.password);
    if (res?.status === 200) {
      openSnackbar(i18n.titleSuccessLogin, i18n.msgSuccessLogin, "success");
      setTimeout(() => {
        const userdata = res.data
        // si es de tipo admin vamos al backoffice
        setLogin(res.data);
        if(userdata.role.id !== 1) {
          push(routes.backoffice);
        } else {
          push(routes.signUpForAList);
        }
      }, 500);
      return;
    }
    openSnackbar(i18n.errorTitle, i18n.errorMsgLogin, "error");
  };

  // useEffect(() => {
  //   validateSession();
  // }, []);

  return {
    submitLogin,
    AlertComponent,
  };
};

export default ViewModel;