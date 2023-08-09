import React from "react";
import { loginUser } from "@/app/services/userService";
import useAlert from "@/components/molecules/alert/AlertComponent";
import { useRouter } from "next/navigation";
import i18n from "@/i18n/i18n-es.json";
import routes from "@/routes/routes";
import { setLogin } from "@/utils/utils";
import { RoleI, UserBase } from "@/utils/interfaces/interfaces";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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
      setLogin(user)
      if (user.role?.id !== 1) {
        push(routes.backoffice);
      } else {
        push(routes.backoffice);
      }
    }, 500);
  };

  const submitLoginGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const role: RoleI = {id: 2, value: "user", label: "User"}
        const user: UserBase = {email: result.user.email|| "", name: result.user.displayName || "", lastname: result.user.displayName || "", token: await result.user.getIdToken() || "", google: true, role};
        console.log(user, "user232323");
        redirectUser(user)
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
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
