"use client";
import Text from "@/components/atomComponents/Input/text";
import MaterialButton from "@/components/atomComponents/Buttons";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { containerLoginStyles, containerStyles } from "./contants";
import ViewModel from "./ViewModel";
import { formConst } from "@/constants";
import i18n from "@/i18n/i18n-es.json";
import InputStepper from "@/components/atomComponents/Input/InputStepper";
import Select from "@/components/atomComponents/selects/select";
import { campusIds, weekDays } from "@/utils/utils";

const Backoffice = () => {
  const {
    control,
    handleSubmit,
    formState: { isLoading },
  } = useForm();
  const { submitGame, AlertComponent, propsStepper } = ViewModel();
  const { game } = formConst;

  return (
    <>
      <div style={containerStyles}>
        <div style={containerLoginStyles}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <Text
                id={game.name}
                label={i18n.gameName}
                required={true}
                fullWidth={true}
                readOnly={false}
                control={control}
                helperText={i18n.gameNameHelperText}
              />
            </Grid>
            <InputStepper
              id={game.initHour}
              label={i18n.initHour}
              required={true}
              fullWidth={true}
              readOnly={false}
              control={control}
              helperText={i18n.initHourHelperText}
              inputProps={propsStepper}
            />
            <InputStepper
              id={game.endHour}
              label={i18n.endHour}
              required={true}
              fullWidth={true}
              readOnly={false}
              control={control}
              helperText={i18n.endHourHelperText}
              inputProps={propsStepper}
            />
            <InputStepper
              id={game.playersQuantity}
              label={i18n.playersQuantity}
              required={true}
              fullWidth={true}
              readOnly={false}
              control={control}
              helperText={i18n.playersQuantityHelperText}
              inputProps={propsStepper}
            />
            <Select
              id={game.day}
              control={control}
              label={i18n.labelDay}
              placeholder={i18n.placeholderDay}
              options={weekDays}
              helperText={i18n.dayHelperText}
            />
            <Select
              id={game.campusId}
              control={control}
              label={i18n.labelCampus}
              placeholder={i18n.placeholderCampus}
              options={campusIds}
              helperText={i18n.campusIdHelperText}
            />
            <Grid item xs={12} md={12}>
              <MaterialButton
                color="primary"
                text={i18n.createGame}
                onClick={handleSubmit(submitGame)}
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

export default Backoffice;
