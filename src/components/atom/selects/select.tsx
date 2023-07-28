"use client";
import React, { useState } from "react";
import { Autocomplete, CircularProgress, Grid, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import CustomEndAdornament from "../EndAdornament";
import i18n from "@/i18n/i18n-es.json";

interface SelectProps {
  id: string;
  control: Control;
  options?: OptionProps[];
  disabled?: boolean;
  label: string;
  placeholder: string;
  required?: boolean;
  helperText?: string;
  validate?: any;
  loading?: boolean;
  classesGrid?: any;
}

interface OptionProps {
  value: string | number;
  label: string;
}

const useStyles = () => ({
  asterikColor: {
    color: "#f44336",
  },
  rootLabel: {
    color: "rgba(0, 0, 0, 0.75)",
  },
});

const Select = (props: SelectProps) => {
  const {
    id,
    control,
    options = [],
    disabled = false,
    label,
    placeholder,
    required = false,
    helperText = "",
    validate = () => {},
    loading = false,
    classesGrid = {},
  } = props;
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const getOptionSelected = (option: OptionProps, anotherOption: OptionProps) =>
    option.value === anotherOption.value;

  const getOptions = () => {
    let optionsFiltered = options.filter((item: OptionProps) => item.label);
    return optionsFiltered.sort((a: any, b: any) =>
      a.label.localeCompare(b.label)
    );
  };

  return (
    <Grid item xs={12} sm={6} md={4} className={classesGrid?.grid}>
      <Controller
        name={id}
        control={control}
        render={({
          field: { onChange, ref, value },
          fieldState: { error },
        }) => {
          return (
            <Autocomplete
              placeholder={placeholder || i18n.commonLabel}
              getOptionLabel={(option) => (option.label ? option.label : "")}
              inputValue={inputValue || value?.label || ""}
              onInputChange={(_e, newvalue) => {
                setInputValue(newvalue);
                if (!newvalue) onChange(newvalue);
              }}
              onClose={() => setInputValue("")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required={required}
                  InputLabelProps={{
                    shrink: true,
                    classes: {
                      asterisk: classes.asterikColor.color,
                      root: classes.rootLabel.color,
                    },
                  }}
                  label={label}
                  placeholder={placeholder}
                  variant={"outlined"}
                  inputRef={ref}
                  helperText={error ? helperText : ""}
                  error={!!error}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
              onChange={(e, optionSelected) => {
                // if (takeEvent) onChange(e);
                if (optionSelected) onChange(optionSelected);
              }}
              options={getOptions()}
              disabled={disabled}
              loading={loading}
              noOptionsText={i18n.commonLabelNoOptions}
              getOptionDisabled={(option: any) => option.disabled}
            />
          );
        }}
        rules={{ required: required, validate: validate }}
      />
    </Grid>
  );
};

export default Select;
