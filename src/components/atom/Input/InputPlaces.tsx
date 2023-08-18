import React from "react";
import { useStyles } from "../../../styles/Global";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { Grid, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import i18n from "@/i18n/i18n-es.json";
import { inputPropsDefault } from "@/utils/utils";

const useOwnStyles = () => ({
  sugerencias: {
    position: "absolute",
    zIndex: 2,
    boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    width: "56%",
    "@media(maxWidth: 959px)": {
      width: "100% !important",
    },
  },
  sugerenciasHidden: {
    display: "none",
  },
  rootInput: {
    "& .MuiInputBase-input": {
      padding: "18.5px 14px",
    },
  },
});

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
  const ownClasses = useOwnStyles();
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

  const generateClassSuggestion = (suggestions: any, loading: any) => {
    if (suggestions?.length === 0 && !loading) {
      return ownClasses.sugerenciasHidden;
    } else {
      return ownClasses.sugerencias;
    }
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
            googleCallbackName="myCallbackFunc"
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
                  InputLabelProps={{
                    ...inputPropsDefault(classes),
                  }}
                  inputProps={{
                    maxLength: 100,
                  }}
                  InputProps={{ classes: { root: ownClasses.rootInput } }}
                  error={!!error}
                  helperText={error && error?.message}
                  inputRef={ref}
                />
                <Grid
                  item={true}
                  md={7}
                  xs={12}
                  sx={{ ...generateClassSuggestion(suggestions, loading) }}
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
