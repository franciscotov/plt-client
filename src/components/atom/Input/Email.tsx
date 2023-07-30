import React from "react";
import { Controller, Control, FieldValues } from "react-hook-form";
import i18n from "@/i18n/i18n-es.json";
import { TextField } from "@mui/material";
import { useStyles } from "@/styles/Global";

export function validateEmail(email: string) {
  return new RegExp(
    "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"
  ).test(email);
}

interface EmailProps {
  id: string;
  control: Control<FieldValues, object>;
  defaultValue: string;
  label: string;
  required?: boolean;
  fullWidth?: boolean;
}

export default function Email(props: EmailProps): JSX.Element {
  const {
    id,
    control,
    defaultValue,
    label,
    required = false,
    fullWidth = true,
  } = props;
  const classes = useStyles();

  return (
    <Controller
      name={id}
      control={control}
      defaultValue={defaultValue}
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
        />
      )}
      rules={{
        required: i18n.emailRequired,
        validate: {
          validateEmail: (v) => validateEmail(v) || i18n.emailInvalidFormat,
        },
      }}
    />
  );
}
