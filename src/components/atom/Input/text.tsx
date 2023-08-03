import React from "react";
import { Control, Controller } from "react-hook-form";
import { Grid, TextField } from "@mui/material";
import { useStyles } from "../../../styles/Global";

interface TextProps {
  id: string;
  label: string;
  required: boolean;
  fullWidth: boolean;
  readOnly: boolean;
  control: Control;
  helperText: string;
  xs: number;
  md: number;
}

export default function Text(props: TextProps): JSX.Element {
  const classes = useStyles();
  const {
    control,
    id,
    helperText,
    label,
    required,
    fullWidth,
    readOnly,
    xs,
    md,
  } = props;

  return (
    <Grid item xs={xs} md={md}>
      <Controller
        name={id}
        control={control}
        defaultValue={""}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            id={id}
            label={label}
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            required={required}
            fullWidth={fullWidth}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: readOnly,
            }}
          />
        )}
        rules={{
          required: helperText,
        }}
      />
    </Grid>
  );
}
