import { makeStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'
import * as React from 'react'

const useStyles = makeStyles(() => ({
  asterikColor: {
    color: '#f44336',
  },
  rootLabel: {
    color: 'rgba(0, 0, 0, 0.75) !important',
  },
}))

export default function SelectAutoComplete({
  params,
  error,
  helperText,
  required,
  label,
  placeholder,
  variant,
  inputRef,
}) {
  const classes = useStyles()
  return (
    <TextField
      {...params}
      required={required}
      InputLabelProps={{
        shrink: true,
        classes: {
          asterisk: classes.asterikColor,
          root: classes.rootLabel,
        },
      }}
      label={label}
      placeholder={placeholder}
      variant={variant}
      inputRef={inputRef}
      helperText={error ? helperText : ''}
      error={!!error}
    />
  )
}
