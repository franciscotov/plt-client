import React, { useState } from "react";
import { useStyles } from "../../../styles/Global";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { Grid, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import i18n from "@/i18n/i18n-es.json";

type ChangeEventHandler = React.ChangeEventHandler<
  HTMLInputElement | HTMLTextAreaElement
>;

interface TextProps {
  id: string;
  control: Control;
  label: string;
  required: boolean;
  placeholder: string;
}

interface PlacesAutocompleteProps {
  getInputProps: any;
  suggestions: any;
  getSuggestionItemProps: any;
  loading: boolean;
}

const InputPlaces = (props: TextProps): JSX.Element => {
  const { id, control, label, required, placeholder } = props;
  const classes = useStyles();
  const handleSelect = async (value: any, onChange: any) => {
    const results = await geocodeByAddress(value);
    if (onChange) {
      let selectedValue: any = {
        value: value,
        lat: (await getLatLng(results[0])).lat,
        lng: (await getLatLng(results[0])).lng,
      };
      onChange(selectedValue);
    }
  };

  // const classesInput = useStylesInputLabel();
  const generateClassSuggestion = (suggestions: any, loading: any) => {
    // if (suggestions?.length === 0 && !loading) {
    //   return classes.sugerenciasHidden;
    // } else {
    //   if (props.isModal) {
    //     return classes.sugerencias2;
    //   } else return classes.sugerencias;
    // }
  };

  return (
    <Grid xs={12} sm={6} md={6} item>
      <Controller
        name={id}
        control={control}
        render={({
          field: { onChange, value, ref },
          fieldState: { error },
        }) => (
          <PlacesAutocomplete
            value={value && value.value ? value.value : value || ""}
            onChange={onChange}
            onSelect={(value: any) => handleSelect(value, onChange)}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }: PlacesAutocompleteProps) => (
              <div>
                <TextField
                  id={id}
                  fullWidth
                  variant="outlined"
                  label={label}
                  required={required}
                  placeholder={placeholder}
                  {...getInputProps({})}
                  // InputLabelProps={{
                  //   ...inputPropsDefault(classesInput),
                  // }}
                  inputProps={{
                    maxLength: 100,
                  }}
                  InputProps={{ classes: { root: "classes.rootInput" } }}
                  error={!!error}
                  helperText={
                    <span
                      className={
                        error ? "classes.textClassError" : "classes.textClass"
                      }
                    >
                      {error && error?.message}
                    </span>
                  }
                  inputRef={ref}
                />
                <Grid
                  className={"generateClassSuggestion(suggestions, loading)"}
                  item={true}
                  md={7}
                  xs={12}
                >
                  {loading ? <div>{i18n.loading}</div> : null}
                  {suggestions.map((suggestion: any) => {
                    const style = suggestion.active
                      ? {
                          backgroundColor: "#fafafa",
                          cursor: "pointer",
                          padding: "10px",
                        }
                      : {
                          backgroundColor: "#ffffff",
                          cursor: "pointer",
                          padding: "10px",
                        };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, { style })}
                        key={suggestion.placeId}
                      >
                        {suggestion.description}
                      </div>
                    );
                  })}
                </Grid>
              </div>
            )}
          </PlacesAutocomplete>
        )}
        rules={{
          required: true,
          validate: (value) => {
            if (!value) {
              return i18n.helperTextAddress;
            }
            if (!value?.value) {
              return i18n.helperTextAddressIncorrect;
            }
          },
        }}
      />
    </Grid>
  );
};

export default InputPlaces;
