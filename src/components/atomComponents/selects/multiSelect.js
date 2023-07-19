import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import { TextField } from '@material-ui/core'
import ChipComponent from '../Chip/ChipComponent'

const useStyles = makeStyles(() => ({
  asterikColor: {
    color: '#f44336',
  },
  noWrap: {
    '& > div': {
      textOverflow: 'unset !important',
      overflow: 'unset !important',
      whiteSpace: 'unset !important',
      lineHeight: '2.3em',
    },
  },
  container: {
    '& > div': {
      paddingBottom: '13.5px !important',
      paddingTop: '13.5px !important',
    },
  },
}))

export const MultipleSelect = ({
  id,
  label,
  values = [],
  onChange,
  error,
  data,
  required,
  fullWidth,
  disabled,
  noWrap = false,
  // handleDelete,
}) => {
  const classes = useStyles()

  let handleDelete = (ArrValues, value, cb) => {
    ArrValues = ArrValues.filter(val => val.value !== value.value)
    cb({ target: { value: ArrValues } })
  }

  return (
    <TextField
      id={id}
      select
      label={label}
      variant="outlined"
      value={values}
      onChange={onChange}
      error={!!error}
      helperText={error ? error.message : null}
      required={required}
      fullWidth={fullWidth}
      InputLabelProps={{
        shrink: true,
        classes: {
          asterisk: classes.asterikColor,
        },
      }}
      SelectProps={{
        multiple: true,
        className: ` ${noWrap && values.length > 0 ? classes.noWrap : ''} ${
          values.length > 0 ? classes.container : ''
        }`,
        renderValue: selected => (
          <>
            {selected.map((value, i) => {
              return (
                <ChipComponent
                  key={i}
                  style={{ marginInline: 0, margin: '0px' }}
                  label={value.label ? value.label : value}
                  onDelete={() => handleDelete(values, value, onChange)}
                  index={i}
                />
              )
            })}
          </>
        ),
      }}
      disabled={disabled}
    >
      {data.map(option => {
        return (
          <MenuItem key={option.value} value={option} id={id}>
            <Checkbox
              checked={
                values.indexOf(option.value) > -1 ||
                values.some(val => val.label === option.label)
              }
              style={{ color: '#002FC5' }}
            />
            <ListItemText primary={option.label} />
          </MenuItem>
        )
      })}
    </TextField>
  )
}
