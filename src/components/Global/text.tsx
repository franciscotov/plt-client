import React from "react";
import { FieldError } from "react-hook-form";
import { TextField } from '@mui/material'

import { useStyles } from "../../styles/Global";

type ChangeEventHandler = React.ChangeEventHandler<
  HTMLInputElement | HTMLTextAreaElement
>;

interface TextProps {
  id: string;
  label: string;
  value: string;
  onChange: ChangeEventHandler;
  error: FieldError | undefined;
  required: boolean;
  fullWidth: boolean;
  readOnly: boolean;
}

export default function Text(props: TextProps): JSX.Element {
  const classes = useStyles();

  return (
    <TextField
      id={props.id}
      label={props.label}
      variant="outlined"
      value={props.value}
      onChange={props.onChange}
      error={!!props.error}
      helperText={props.error ? props.error.message : null}
      required={props.required}
      fullWidth={props.fullWidth}
      InputLabelProps={{
        shrink: true,
        classes: {
          asterisk: classes.asterikColor.color,
        },
      }}
      InputProps={{
        readOnly: props.readOnly,
      }}
    />
  );
}
