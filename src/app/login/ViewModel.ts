import React from "react";
import { loginUser, loginUserGoogle } from "@/app/services/userService";
import useAlert from "@/components/molecules/alert/AlertComponent";
import { useRouter } from "next/navigation";
import i18n from "@/i18n/i18n-es.json";
import routes from "@/routes/routes";
import { setLogin } from "@/utils/utils";
import { UserBase } from "@/utils/interfaces/interfaces";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { GoogleUser } from "@/utils/types";
require("../../firebase");

const provider = new GoogleAuthProvider();

const ViewModel = () => {
  const auth = getAuth();
  const { AlertComponent, openSnackbar } = useAlert();
  const { push } = useRouter();
  const submitLogin = async (data: any) => {
    const res: UserBase | any = await loginUser(data.email, data.password);
    if (res?.status === 200) {
      openSnackbar(i18n.titleSuccessLogin, i18n.msgSuccessLogin, "success");
      redirectUser(res.data);
      return;
    }
    openSnackbar(i18n.errorTitle, i18n.errorMsgLogin, "error");
  };

  const redirectUser = (user: UserBase) => {
    setTimeout(() => {
      // si es de tipo admin vamos al backoffice
      setLogin(user);
      if (user.role?.id !== 1) {
        push(routes.backoffice);
      } else {
        push(routes.backoffice);
      }
    }, 500);
  };

  const submitLoginGoogle = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // enviar al back para obtener un token valido
        const user: GoogleUser = result.user;
        let res = await loginUserGoogle(user);
        if (res.status === 200) {
          openSnackbar(i18n.titleSuccessLogin, i18n.msgSuccessLogin, "success");
          redirectUser(res.data);
        }
      })
      .catch(() => {
        openSnackbar(i18n.errorTitle, i18n.errorMsgLogin, "error");
      });
  };

  // useEffect(() => {
  //   validateSession();
  // }, []);

  return {
    submitLogin,
    AlertComponent,
    submitLoginGoogle,
  };
};

export default ViewModel;
