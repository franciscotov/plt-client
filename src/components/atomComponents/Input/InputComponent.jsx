import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'
import NumberFormat from 'react-number-format'

const useStyles = makeStyles(theme => ({
  asterikColor: {
    color: '#f44336',
  },
  root: {
    margin: theme.spacing(1),
  },
  textField: {
    minWidth: '100% !important',
    float: 'left',
  },
  textClass: {
    height: '1rem',
    visibility: 'hidden',
  },
  textClassError: {
    height: '1rem',
  },
  inputDetail: {
    width: 'fit-content',
    fontSize: 12,
    color: '#000000bf',
  },
  texts: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        })
      }}
      thousandSeparator={'.'}
      decimalSeparator={','}
      isNumericString
      prefix={'$ '} //"$"
    />
  )
}

const InputComponent = ({
  id,
  label,
  value,
  onChange,
  error,
  required,
  fullWidth,
  readOnly,
  type,
  disabled,
  formatText,
  inputRef,
  helperText,
  placeholder,
  multiline,
  rows,
  className,
  restrictionsText,
  inputProps,
}) => {
  const classes = useStyles()
  const InputProps = formatText
    ? {
        ...inputProps,
        readOnly: readOnly,
        inputComponent: NumberFormatCustom,
      }
    : {
        ...inputProps,
        readOnly: readOnly,
      }
  return (
    <>
      <TextField
        id={id}
        label={label}
        variant="outlined"
        value={value}
        disabled={disabled}
        onChange={onChange}
        required={required}
        fullWidth={fullWidth}
        placeholder={placeholder}
        InputLabelProps={{
          shrink: true,
          classes: {
            asterisk: classes.asterikColor,
          },
        }}
        inputProps={InputProps}
        type={type}
        className={`${classes.textField} ${className}`}
        inputRef={inputRef}
        error={!!error}
        helperText={
          <div className={classes.texts}>
            <span
              className={error ? classes.textClassError : classes.textClass}
            >
              {helperText}
            </span>
            {restrictionsText && (
              <span className={classes.inputDetail}>{restrictionsText}</span>
            )}
          </div>
        }
        multiline={multiline}
        rows={rows}
      />
    </>
  )
}

export default InputComponent
