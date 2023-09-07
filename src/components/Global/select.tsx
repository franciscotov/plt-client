import React from 'react'
import { FieldError } from 'react-hook-form'
import { TextField, MenuItem } from '@mui/material'

import { useStyles } from '../../styles/Global'

type ChangeEventHandler = React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>

interface SelectProps {
    id: string 
    label: string 
    value :string 
    onChange :ChangeEventHandler 
    error: FieldError | undefined 
    data: any
    required :boolean 
    fullWidth :boolean 
}

export default function Select(props: SelectProps): JSX.Element {
  const classes = useStyles()

  return (
    <TextField
        id={props.id}
        select
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
                asterisk: classes.asterikColor.color
            }
        }}
    >
        {props.data.map((option: any) => {
            return (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            )
        })}
    </TextField>
  )
}