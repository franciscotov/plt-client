import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { TextField } from "@mui/material";
import { useStyles } from "../../../styles/Global";

interface TextProps {
  id: string;
  label: string;
  required: boolean;
  fullWidth: boolean;
  readOnly: boolean;
  control: Control;
  helperText: string;
}

export default function Text(props: TextProps): JSX.Element {
  const classes = useStyles();
  const { control, id, helperText, label, required, fullWidth, readOnly } =
    props;

  return (
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
            classes: {
              asterisk: classes.asterikColor.color,
            },
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
  );
}
