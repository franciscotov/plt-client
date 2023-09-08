import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useStyles } from "../../../styles/Global";

type ChangeEventHandler = React.ChangeEventHandler<
  HTMLInputElement | HTMLTextAreaElement
>;

interface PasswordProps {
  id: string;
  label: string;
  required: boolean;
  fullWidth: boolean;
  readOnly: boolean;
  control: Control | any;
  helperText: string;
}

export default function Password(props: PasswordProps): JSX.Element {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
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
          type={showPassword ? "text" : "password"}
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
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  onMouseDown={(event) => {
                    event.preventDefault();
                  }}
                  edge="end"
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
      rules={{
        required: helperText,
      }}
    />
  );
}
