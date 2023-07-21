"use client";
import Password from "@/components/atom/Input/password";
import Text from "@/components/atom/Input/text";
import MaterialButton from "@/components/atom/Buttons";
import { Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { containerLoginStyles, containerStyles } from "./contants";
import ViewModel from "./ViewModel";
import { formConst } from "@/constants";
import i18n from "@/i18n/i18n-es.json";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm();
  const { submitLogin, AlertComponent } = ViewModel();
  const { login } = formConst;
  return (
    <>
      <div style={containerStyles}>
        <div style={containerLoginStyles}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Text
                id={login.email}
                label={i18n.emailLabel}
                required={true}
                fullWidth={true}
                readOnly={false}
                control={control}
                helperText={i18n.emailHelperText}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Password
                id={login.password}
                label={i18n.passwordLabel}
                control={control}
                required={true}
                fullWidth={true}
                readOnly={false}
                helperText={i18n.passwordHelperText}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <MaterialButton
                color="primary"
                text={i18n.send}
                onClick={handleSubmit(submitLogin)}
                disabled={isLoading}
              />
            </Grid>
          </Grid>
        </div>
        <AlertComponent />
      </div>
    </>
  );
};

export default Login;
