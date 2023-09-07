import React from 'react'
import {
  TextField,
  InputAdornment,
  Tooltip,
  IconButton,
} from '@mui/material'
import SearchIcon from '@material-ui/icons/Search'
import { func, any, shape } from 'prop-types'
import { useStyles } from './filterInputStyles'
import { useTranslation } from 'react-i18next'
import { translationKeys } from './constants'

const FilterInput = ({
  value,
  onChange,
  style,
  placeholder,
  variant,
  updateFilterKeyword,
  keyword = '',
}) => {
  const { t } = useTranslation()
  const classes = useStyles()
  const generateClassRoot = (v, p) => {
    if (v) {
      if (p === 'Buscar') return classes.rootVariantButtonSecond
      else return classes.rootVariantButton
    } else return ''
  }

  const placeholderValue = placeholder || t(translationKeys.search)

  return (
    <>
      <Tooltip title={placeholderValue} arrow>
        <TextField
          variant="outlined"
          value={value}
          onChange={onChange}
          placeholder={placeholderValue}
          style={style}
          InputProps={{
            style: {
              height: 40,
              width: '100%',
              fontSize: 14,
            },
            endAdornment:
              variant === 'default' ? (
                <InputAdornment position="end">
                  <SearchIcon style={{ color: 'rgba(0, 0, 0, 0.54)' }} />
                </InputAdornment>
              ) : null,
            classes: {
              root: generateClassRoot(variant, placeholder),
              input: variant == 'button' ? classes.inputVariantButton : '',
            },
          }}
          onKeyPress={e => {
            const key = e.key || e.code
            if (variant == 'button' && key === 'Enter') {
              updateFilterKeyword(keyword)
            }
          }}
          classes={{ root: classes.rootTextField }}
        />
      </Tooltip>
      {variant == 'button' && (
        <IconButton
          onClick={() => updateFilterKeyword(keyword)}
          classes={{
            root: classes.iconButton,
          }}
          className="MuiButtonBaseFilter"
        >
          <SearchIcon className={classes.iconSearch} />
        </IconButton>
      )}
    </>
  )
}

FilterInput.propTypes = {
  value: any,
  onChange: func,
  style: shape(),
}

export { FilterInput }
