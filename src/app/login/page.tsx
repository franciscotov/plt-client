"use client";
import React from "react";
import Password from "@/components/atom/Input/password";
import MaterialButton from "@/components/atom/Buttons";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { containerLoginStyles, containerStyles } from "./contants";
import ViewModel from "./ViewModel";
import { formConst } from "@/constants";
import i18n from "@/i18n/i18n-es.json";
import Email from "@/components/atom/Input/Email";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { isLoading },
  } = useForm();
  const { submitLogin, AlertComponent, submitLoginGoogle } = ViewModel();
  const { login } = formConst;
  return (
    <>
      <div style={containerStyles}>
        <div style={containerLoginStyles}>
          <Grid container spacing={4}>
            <Email
              id={login.email}
              label={i18n.emailLabel}
              required={true}
              fullWidth={true}
              control={control}
              defaultValue=""
            />
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
            <Grid item xs={12} md={12}>
              <MaterialButton
                color="primary"
                text={i18n.loginWithGoogle}
                onClick={submitLoginGoogle}
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
