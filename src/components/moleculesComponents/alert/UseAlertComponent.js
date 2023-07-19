import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'
import { Alert, AlertTitle } from '@material-ui/lab'

const useStyles = makeStyles(theme => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    '& .MuiIconButton-root': {
      alignSelf: 'start',
    },
  },
  snackClass: {
    transform: 'none !important',
  },
  modalSnackClass: {
    position: 'unset',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '60px',
    marginTop: '20px',
    '& .MuiAlert-root': {
      width: '100% !important',
    },
  },
}))

const severityTypes = {
  error: 'error',
  warning: 'warning',
  success: 'success',
  info: 'info',
}

const UseAlertComponent = () => {
  const classes = useStyles()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarTitle, setSnackbarTitle] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState(severityTypes.error)
  const [isModalAlert, setIsModalAlert] = useState(false)
  const [duration, setDuration] = useState(null)

  const openSnackbar = (message, severity, title, isModal, durationToSet) => {
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
    setSnackbarTitle(title)
    setSnackbarMessage(message)
    if (isModal) setIsModalAlert(true)
    else setIsModalAlert(false)
    durationToSet && setDuration(durationToSet)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setDuration(null)
    setSnackbarOpen(false)
  }
  const style = {
    textAlign: 'left',
    width: '480px',
  }

  const AlertComponent = () => {
    return (
      <div className={classes.root}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={snackbarOpen}
          autoHideDuration={duration || 4000}
          onClose={handleClose}
          className={`${
            isModalAlert ? classes.modalSnackClass : classes.snackClass
          }`}
        >
          <Alert
            variant={isModalAlert ? 'standard' : 'filled'}
            onClose={handleClose}
            severity={snackbarSeverity}
            style={style}
          >
            {snackbarTitle && <AlertTitle>{snackbarTitle}</AlertTitle>}
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    )
  }
  return { AlertComponent, openSnackbar, severityTypes }
}

export default UseAlertComponent
