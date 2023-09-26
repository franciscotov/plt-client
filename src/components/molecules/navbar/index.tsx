"use client";
import MaterialButton from "@/components/atom/Buttons";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { containerNavbar } from "../../../constants";
// import ViewModel from "./ViewModel";
import { formConst } from "@/constants";
import i18n from "@/i18n/i18n-es.json";
import Select from "@/components/atom/selects/select";

const Navbar = () => {
  const {
    control,
    handleSubmit,
    formState: { isLoading },
    watch,
  } = useForm();
  //   const { submitSignUpPlayerToList, AlertComponent, dataCampus, loadingCampus, dataList, loadingList } =
  //     ViewModel(watch);
  const { list } = formConst;
  return (
    <div style={containerNavbar}>
      {/* <div style={containerLoginStyles}>
      </div> */}
    </div>
  );
};

export default Navbar;
