import React, { useState, useRef, useEffect } from 'react'
import {
  DialogTitle,
  IconButton,
  styled,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Typography,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { MaterialButton } from '../../atomComponents/Buttons'
import { useStyles } from './styles'

const BootstrapDialog = styled(Dialog)(({ theme, st }) => ({
  '& .MuDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialog-paperWidthSm': {
    width: `${st.width} !important`,
    height: `${st.height} !important`,
    maxWidth: 'none !important',
  },
  '& .MuiBackdrop-root': {
    backgroundColor: '#80808066',
  },
  '& .MuiTypography-body1': {
    color: 'black',
  },
}))

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  '&.MuiDialogActions-root': {
    padding: theme.spacing(3),
  },
}))

const BootstrapDialogTitle = props => {
  const { children, handleClose, other } = props
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '2rem',
          fontFamily: 'Roboto',
        }}
      >
        {children}
        {handleClose ? (
          <div
            style={{
              width: '2rem',
              display: 'flex',
              fontFamily: 'Roboto',
              justifyContent: 'flex-start',
              alignItems: 'flex-start !important',
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                color: theme => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        ) : null}
      </div>
    </DialogTitle>
  )
}
const DialogComponent = ({
  open, //Abrir/cerrar modal
  setOpen, //Cambiar estado modal
  alwaysOpen, //Mantener el modal abierto
  title, //Titulo Principal del modal
  modalSize, //Tamaño en ancho del modal
  contentSize, //Tamaño en alto del modal
  msg, //Contenido del body del modal
  buttons, //Arreglo de botones del modal
  reset,
}) => {
  const classes = useStyles()
  const [scroll] = useState('paper')

  const handleClose = () => {
    if (!alwaysOpen) setOpen(false)
  }

  const descriptionElementRef = useRef(null)
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
    return () => reset && reset()
  }, [open])
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        st={{
          width: modalSize || 'fit-content',
          height: contentSize || 'fit-content',
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          handleClose={handleClose}
        >
          <Typography component="div">{title}</Typography>
        </BootstrapDialogTitle>
        <DialogContent
          dividers={scroll === 'paper'}
          className={classes.dialogContentText}
        >
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            component="div"
          >
            {msg}
          </DialogContentText>
        </DialogContent>
        {buttons !== undefined ? (
          <StyledDialogActions>
            {buttons?.map((btn, i) => (
              <MaterialButton
                text={btn.text}
                onClick={() => btn.action()}
                key={i}
                disabled={btn.disabled}
                variant={btn.variant}
                style={{ margin: '10px 0 0 10px', backgroundColor: 'red' }}
              />
            ))}
          </StyledDialogActions>
        ) : (
          ''
        )}
      </BootstrapDialog>
    </div>
  )
}

export default DialogComponent
