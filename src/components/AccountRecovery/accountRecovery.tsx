import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  useMediaQuery,
  Button,
  CircularProgress,
} from "@mui/material";
import { useForm, SubmitHandler, FieldValue, FieldValues } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import Email from "../atom/Input/Email";
// import API from '../../api/api';

import LogoTuten from "./../../img/tuten.png";
// import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import axios from "axios";
import Image from "next/image";
// import { GOOGLE_CAPTCHA_API_KEY } from "../../util/consts";
// import { FormData } from '../../util/types';

export default function AccountRecovery(): JSX.Element {
  const { control, handleSubmit } = useForm();
  const [progress, setProgress] = useState(false);
  const isMobile = useMediaQuery("(max-width:960px)");
  const [errorAccountRecovery, setErrorAccountRecovery] = useState<Error>();

  // const { executeRecaptcha } = useGoogleReCaptcha();
  const { executeRecaptcha } = { executeRecaptcha: false };

  const history = useHistory();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${'GOOGLE_CAPTCHA_API_KEY'}`;
    document.body.appendChild(script);
    return () => {
      const badge = document.querySelector(".grecaptcha-badge");
      if (badge) {
        // @ts-ignore
        document.body.removeChild(badge.parentNode);
      }
      script.remove();
    };
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (dataForm) => {
    if (!executeRecaptcha) return console.log("Execute recaptcha");

    setProgress(true);
    try {
      // @ts-ignore
      let captcha = await window.grecaptcha.execute(
        `${'GOOGLE_CAPTCHA_API_KEY'}`,
        { action: "submit" }
      );
      const { email } = dataForm;

      // const res = await API.post<RequestChangePasswordResponse>(
      //   '/auth/request-change-password',
      //   {},
      //   {
      //     headers: { email, captcha },
      //   }
      // );

      const res = { data: { expiresInMinutes: {} } };

      const { expiresInMinutes } = res.data;
      setProgress(false);
      history.push({
        pathname: "/login",
        state: {
          type: "success",
          body: `Se envió el elance al correo electrónico. Tiempo de caducidad: ${expiresInMinutes} minutos.`,
        },
      });
    } catch (err) {
      setProgress(false);
      if (axios.isAxiosError(err))
        setErrorAccountRecovery(
          new Error(err.response?.data?.message || err.message)
        );
    }
  };

  return (
    <Grid
      container
      spacing={4}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Box marginBottom={8}>
          <Typography align="left" variant="h4" gutterBottom>
            Recuperar clave
          </Typography>
          <Typography align="left" variant="body1">
            Ingresa la dirección de correo electrónico que utilizas para acceder
            a nuestra plataforma.
          </Typography>
        </Box>
        <Grid item xs={12}>
          <Email
            id="email"
            label="usuario o correo electronico"
            control={control}
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between">
            {!isMobile && (
              <Grid item xs={5}>
                <Box mt={5}>
                  <Button
                    component={Link}
                    to="/"
                    size="large"
                    variant="outlined"
                    color="primary"
                    fullWidth
                  >
                    Cancelar
                  </Button>
                </Box>
              </Grid>
            )}
            <Grid item xs={isMobile ? 12 : 5}>
              <Box mt={isMobile ? 2 : 5}>
                <Button
                  size={isMobile ? "medium" : "large"}
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSubmit(onSubmit)}
                >
                  {progress ? (
                    <CircularProgress size={25} style={{ color: "white" }} />
                  ) : (
                    "Enviar"
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        {isMobile && (
          <Grid item xs={12}>
            <Box mt={-3}>
              <Button
                component={Link}
                to="/"
                variant="outlined"
                color="primary"
                fullWidth
              >
                Cancelar
              </Button>
            </Box>
          </Grid>
        )}
        <Grid item xs={12}>
          <Box marginBottom={30} mt={isMobile ? -2 : 7}></Box>
        </Grid>
        <Grid item xs={12}>
          <Image src={LogoTuten} alt="Logo de tuten" />
        </Grid>
      </Grid>
    </Grid>
  );
}

type RequestChangePasswordResponse = {
  expiresInMinutes: number;
};
