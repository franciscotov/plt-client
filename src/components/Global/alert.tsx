import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Alert as AlertComponent, AlertTitle } from '@material-ui/lab'
import { Collapse, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

interface AlertProps {
  variant?: 'outlined' | 'filled'
  type?: 'error' | 'success' | 'info' | 'warning'
  title?: string
  body: string
  onClose?(): void
}

export default function Alert(props: AlertProps) {
  const classes = useStyles()
  const [open, setOpen] = useState(true)

  useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <AlertComponent
          variant={props.variant}
          severity={props.type}
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                setOpen(false)
                props.onClose && props.onClose()
              }}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
        >
          {props.title && <AlertTitle>{props.title}</AlertTitle>}
          {props.body}
        </AlertComponent>
      </Collapse>
    </div>
  )
}
