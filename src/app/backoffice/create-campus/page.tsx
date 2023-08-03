"use client";
import Text from "@/components/atom/Input/Text";
import MaterialButton from "@/components/atom/Buttons";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { containerLoginStyles, containerStyles } from "./contants";
import ViewModel from "./ViewModel";
import { formConst } from "@/constants";
import i18n from "@/i18n/i18n-es.json";
import InputPlaces from "@/components/atom/Input/InputPlaces";

const CreateCampus = () => {
  const {
    control,
    handleSubmit,
    formState: { isLoading },
  } = useForm();
  const { submitCampus, AlertComponent } = ViewModel();
  const { campus } = formConst;

  return (
    <>
      <div style={containerStyles}>
        <div style={containerLoginStyles}>
          <Grid container spacing={4}>
            <Text
              id={campus.name}
              label={i18n.campusName}
              required={true}
              fullWidth={true}
              readOnly={false}
              control={control}
              helperText={i18n.campusNameHelperText}
              xs={12}
              md={12}
            />
            <InputPlaces
              id={campus.address}
              label={i18n.campusAddress}
              control={control}
              required={true}
              placeholder={i18n.campusAddressPlaceholder}
            />
            <Grid item xs={12} md={12}>
              <MaterialButton
                color="secondary"
                text={i18n.back}
                onClick={() => history.back()}
                disabled={isLoading}
                sx={{ marginRight: "10px" }}
              />
              <MaterialButton
                color="primary"
                text={i18n.createGame}
                onClick={handleSubmit(submitCampus)}
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

export default CreateCampus;
