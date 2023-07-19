"use client";
import Password from "@/components/Global/password";
import Text from "@/components/Global/text";
import MaterialButton from "@/components/atomComponents/Buttons";
import { Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { containerLoginStyles, containerStyles } from "./contants";
import ViewModel from "./ViewModel";
import { formConst } from "@/constants";
import i18n from "@/i18n/i18n-es.json"

const Backoffice = () => {
  const { control, handleSubmit, formState: { errors, isLoading }, } = useForm();
  const { submitLogin } = ViewModel();
  const { login } = formConst;
  return (
    <div style={containerStyles}>
      <div style={containerLoginStyles}>
        <Grid container spacing={4}>
          Backoffice
        </Grid>
      </div>
    </div>
  );
};

export default Backoffice;
