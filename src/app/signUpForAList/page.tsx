"use client";
import MaterialButton from "@/components/atom/Buttons";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { containerLoginStyles, containerStyles } from "./contants";
import ViewModel from "./ViewModel";
import { formConst } from "@/constants";
import i18n from "@/i18n/i18n-es.json";
import Select from "@/components/atom/selects/select";

const SignUpForAList = () => {
  const {
    control,
    handleSubmit,
    formState: { isLoading },
    watch
  } = useForm();
  const { submitSignUpPlayerToList, AlertComponent, dataCampus, loadingCampus, dataList, loadingList } =
    ViewModel(watch);
  const { list } = formConst;
  return (
    <>
      <div style={containerStyles}>
        <div style={containerLoginStyles}>
          <Grid container spacing={4}>
            <Select
              id={list.campus}
              control={control}
              label={i18n.labelCampus}
              placeholder={i18n.placeholderCampus}
              options={dataCampus || []}
              helperText={i18n.campusIdHelperText}
              loading={loadingCampus}
              required={true}
              fullWidth={true}
            />
            <Select
              id={list.list}
              control={control}
              label={i18n.labelList}
              placeholder={i18n.placeholderList}
              options={dataList || []}
              helperText={i18n.listIdHelperText}
              loading={loadingList}
              required={true}
              fullWidth
            />
            <Grid item xs={12} md={12}>
              <MaterialButton
                color="primary"
                text={i18n.send}
                onClick={handleSubmit(submitSignUpPlayerToList)}
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

export default SignUpForAList;
