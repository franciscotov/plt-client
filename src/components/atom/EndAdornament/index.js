import React from 'react'
import { makeStyles, CircularProgress, IconButton } from '@mui/material'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

const useStyles = makeStyles(theme => {
  return {
    iconButton: {
      color: theme.palette.action.active,
      transform: 'scale(1, 1)',
      transition: theme.transitions.create(['transform', 'color'], {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeInOut,
      }),
      position: 'absolute',
      right: '-7px',
    },
    icon: {
      transition: theme.transitions.create(['opacity'], {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeInOut,
      }),
    },
  }
})

const CustomEndAdornament = props => {
  const { loading, params } = props
  const classes = useStyles()
  return (
    <>
      {loading ? <CircularProgress color="inherit" size={20} /> : null}
      <IconButton
        className={classes.iconButton}
        disabled={params?.props.children[1]?.props.disabled}
      >
        <ArrowDropDownIcon
          classes={{ root: classes.icon }}
          onClick={params?.props.children[1]?.props.onClick}
        />
      </IconButton>
    </>
  )
}

export default CustomEndAdornament
