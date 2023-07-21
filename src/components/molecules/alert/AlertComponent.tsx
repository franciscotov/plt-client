import React, { useState, forwardRef } from "react";
import { Snackbar, AlertTitle } from "@mui/material";
import MuiAlert, { AlertProps, AlertColor } from "@mui/material/Alert";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useAlert = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("error");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const openSnackbar = (
    title: string,
    message: string,
    severity: AlertColor
  ) => {
    setSeverity(severity);
    setOpen(true);
    setTitle(title);
    setMessage(message);
  };

  const AlertComponent = () => {
    return (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {<AlertTitle>{title}</AlertTitle>}
          {message}
        </Alert>
      </Snackbar>
    );
  };
  return { AlertComponent, openSnackbar };
};

export default useAlert;
