import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Alert, AlertTitle } from '@material-ui/lab'
import { IconButton, Collapse, Snackbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

interface SnackbarAlertProps {
    title: string 
    body: string
    type: "error" | "success" | "info" | "warning" | undefined
    open: boolean
    onClose: any 
}

export default function SnackbarAlert(props: SnackbarAlertProps): JSX.Element {
  const classes = useStyles()

  return (
    <div className={classes.root}>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={6000} open={props.open} onClose={props.onClose}>
            <Collapse in={props.open}>
                <Alert
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        props.onClose(false)
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                severity={props.type}
                variant="filled"
                >
                    <AlertTitle>{props.title}</AlertTitle>
                    {props.body}
                </Alert>
            </Collapse>
        </Snackbar>
    </div>
  )
}