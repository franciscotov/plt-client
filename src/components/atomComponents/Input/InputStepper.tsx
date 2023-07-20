/**
 * Input component with controler and grid, use exclusive
 * to number data type with variable step
 */
import React from "react";
import { Grid, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import i18n from "@/i18n/i18n-es.json";
import {
  getErrorMessage,
  getQuantiyOfDecimalInNumber,
  isGreaterThanAllowed,
  isLessThanAllowed,
  inputPropsDefault,
  useStylesInputLabel,
  defaultInputPropsStepper,
  variantTypes,
} from "@/utils/utils";

interface InputStepperProps {
  id: string;
  label: string;
  readOnly: boolean;
  control: Control;
  helperText: string;
  placeholder?: string;
  inputProps?: any;
  classesGrid?: any;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

const InputStepper = ({
  control,
  id,
  label,
  helperText,
  placeholder = "",
  inputProps = { ...defaultInputPropsStepper },
  classesGrid = {},
  required = false,
  disabled = false,
  fullWidth = true,
}: InputStepperProps) => {
  const classesInput = useStylesInputLabel();
  const decimalQuantity = getQuantiyOfDecimalInNumber(inputProps.step);
  const minValue = inputProps.min;
  const maxValue = inputProps.max;

  const handleOnChange = (e: any, onChange: any) => {
    const greaterThanAllowed = isGreaterThanAllowed(e.target.value, maxValue);
    const lessThanAllowed = isLessThanAllowed(e.target.value, minValue);
    if (isNaN(e.target.valueAsNumber)) {
      e.target.value = minValue;
    } else if (greaterThanAllowed) {
      e.target.value = maxValue;
    } else if (lessThanAllowed) {
      e.target.value = minValue;
    }
    onChange(e);
  };

  return (
    <Grid item xs={12} sm={6} md={4} className={classesGrid?.grid}>
      <Controller
        name={id}
        control={control}
        render={({
          field: { onChange, value, ref },
          fieldState: { error },
        }) => {
          return (
            <TextField
              type={variantTypes.number}
              value={value || ""}
              variant={"outlined"}
              inputRef={ref}
              onChange={(e: any) => handleOnChange(e, onChange)}
              label={label}
              inputProps={inputProps}
              placeholder={placeholder || i18n.placeholderDefaultEnter}
              disabled={disabled}
              InputLabelProps={{
                ...inputPropsDefault(classesInput),
              }}
              required={required}
              helperText={getErrorMessage(error, helperText)}
              error={!!error}
              fullWidth={fullWidth}
            />
          );
        }}
        rules={{
          required: required,
          validate: {
            validDecimal: (value) => {
              const decimalCount = getQuantiyOfDecimalInNumber(value);
              if (decimalCount > decimalQuantity) {
                return i18n.helperTextNumberWithManyDecimals;
              }
            },
            greaterThanAllowed: (value) => {
              const greaterThanAllowed = isGreaterThanAllowed(value, maxValue);
              if (greaterThanAllowed) {
                return i18n.helperTextGreaterThanAllowed;
              }
            },
            lessThanAllowed: (value) => {
              const lessThanAllowed = isLessThanAllowed(value, minValue);
              if (lessThanAllowed) {
                return i18n.helperTextLessThanAllowed;
              }
            },
            noTaNumber: (value) => {
              if (isNaN(Number(value)) && value !== undefined) {
                return i18n.helperTextNoTaNumber;
              }
            },
          },
        }}
      />
    </Grid>
  );
};

export default InputStepper;
