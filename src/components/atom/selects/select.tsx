"use client";
import React, { useState } from "react";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";
import i18n from "@/i18n/i18n-es.json";
import { GridMeasuresProps } from "@/utils/interfaces/interfaces";

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
  fullWidth?: boolean;
  gridMeasures?: GridMeasuresProps;
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

const Select = (props: SelectProps): JSX.Element => {
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
    fullWidth = false,
    gridMeasures = { xs: 12, sm: 12, md: 12 },
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

  const { sm, xs, md }: GridMeasuresProps = gridMeasures;

  return (
    <Grid item xs={xs} md={md} sm={sm}>
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
              getOptionLabel={(option) => (option.label ? `${option.label} ${option.value}` : "")}
              inputValue={inputValue || value?.label || ""}
              onInputChange={(_e, newvalue) => {
                setInputValue(newvalue);
                if (!newvalue) onChange(newvalue);
              }}
              onClose={() => setInputValue("")}
              fullWidth={fullWidth}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  id={params.id}
                  disabled={params.disabled}
                  size={params.size}
                  inputProps={params.inputProps}
                  label={label}
                  placeholder={placeholder}
                  variant={"outlined"}
                  inputRef={ref}
                  helperText={error ? helperText : ""}
                  error={!!error}
                  fullWidth={fullWidth}
                  InputLabelProps={{
                    shrink: true,
                    classes: {
                      asterisk: classes.asterikColor.color,
                      root: classes.rootLabel.color,
                    },
                  }}
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
              onChange={(_e, optionSelected) => {
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
