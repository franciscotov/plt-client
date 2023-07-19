import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, MenuItem } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  asterikColor: {
    color: '#f44336',
  },
  textField: {
    //margin: theme.spacing(0.5, 1, 0.5, 1),
    minWidth: '100% !important',
    textAlign: 'left',
  },
  paper: {
    overflowY: 'auto',
    maxHeight: '400px',
  },
}))

export default function Select({
  id,
  label,
  value,
  onChange,
  error,
  data,
  required,
  fullWidth,
  disabled,
  placeholder,
  helperText,
}) {
  const classes = useStyles()
  return (
    <TextField
      id={id}
      select
      label={label}
      variant="outlined"
      value={value || placeholder}
      onChange={onChange}
      error={!!error}
      helperText={error ? helperText : null}
      required={required}
      fullWidth={fullWidth}
      className={`${classes.textField}`}
      InputLabelProps={{
        shrink: true,
        classes: {
          asterisk: classes.asterikColor,
        },
      }}
      disabled={disabled}
      SelectProps={{
        MenuProps: {
          classes: {
            paper: classes.paper,
          },
        },
      }}
    >
      {placeholder ? (
        <MenuItem value={placeholder} disabled>
          {placeholder}
        </MenuItem>
      ) : null}
      {data?.map(option => {
        return (
          <MenuItem
            key={option.value}
            value={option.value}
            id={id}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        )
      })}
    </TextField>
  )
}
