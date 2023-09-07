"use client";
import MaterialButton from "@/components/atom/Buttons";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { containerLoginStyles, containerStyles } from "./contants";
import ViewModel from "./ViewModel";
import { formConst } from "@/constants";
import i18n from "@/i18n/i18n-es.json";
import InputStepper from "@/components/atom/Input/InputStepper";
import Select from "@/components/atom/selects/select";

const CreateGame = () => {
  const {
    control,
    handleSubmit,
    formState: { isLoading },
    watch,
  } = useForm();
  const {
    submitGame,
    AlertComponent,
    propsStepper,
    dataCampus,
    loadingCampus,
    dataDays,
    loadingDays,
    initHour,
    dataTypes,
    loadingTypes,
    gridMeasures,
  } = ViewModel(watch);
  const { game } = formConst;

  return (
    <>
      <div style={containerStyles}>
        <div style={containerLoginStyles}>
          <Grid container spacing={4}>
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
              inputProps={{ ...propsStepper, min: Number(initHour || 0) + 1 }}
            />
            <Select
              id={game.totalPlayers}
              label={i18n.playersQuantity}
              required={true}
              control={control}
              placeholder={i18n.playersQuantityPlaceholder}
              helperText={i18n.playersQuantityHelperText}
              loading={loadingTypes}
              options={dataTypes || []}
              fullWidth
              gridMeasures={gridMeasures}
            />
            <Select
              id={game.day}
              control={control}
              label={i18n.labelDay}
              placeholder={i18n.placeholderDay}
              options={dataDays || []}
              helperText={i18n.dayHelperText}
              loading={loadingDays}
              required={true}
              fullWidth
              gridMeasures={gridMeasures}
            />
            <Select
              id={game.campusId}
              control={control}
              label={i18n.labelCampus}
              placeholder={i18n.placeholderCampus}
              options={dataCampus || []}
              helperText={i18n.campusIdHelperText}
              loading={loadingCampus}
              required={true}
              fullWidth
              gridMeasures={gridMeasures}
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

export default CreateGame;
