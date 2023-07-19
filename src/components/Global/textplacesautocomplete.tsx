import React, { useState } from 'react'
import { TextField } from '@material-ui/core'

import { useStyles } from '../../styles/Global'
import PlacesAutocomplete from 'react-places-autocomplete'

type ChangeEventHandler = React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>

interface TextProps {
  name: string
}

export default function TextPlacesAutoComplete(props: TextProps): JSX.Element {
  const classes = useStyles()
  const [address, setAddress] = useState("");
  const handleSelect = async (value:any) => {
    setAddress(value);
  };

  // @ts-ignore
  return (
   <div>
                    <PlacesAutocomplete
                      value={address}
                      onChange={setAddress}
                      onSelect={handleSelect}
                    >{({ getInputProps,suggestions,getSuggestionItemProps,loading}) =>(
                      <div>
                        <TextField
                          id='direccion'
                          fullWidth
                          variant="outlined"
                          label="Dirección"
                          required
                          {...getInputProps({ placeholder: "Dirección (máx. 100 caracteres)" })}
                          InputLabelProps={{
                            shrink: true,
                            classes: {
                              asterisk: classes.asterikColor
                            }
                          }}
                        />
                        <div>
                          {loading ? <div>...loading</div> :null }
                          {suggestions.map((suggestion) => {
                            const style = suggestion.active
                              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                              : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                              <div {...getSuggestionItemProps(suggestion, {style})}>
                                {suggestion.description}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                    </PlacesAutocomplete>
   </div>
  )
}