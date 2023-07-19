import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
import { FormattedMessage } from 'react-intl'

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '408px',
    marginTop: '16px',
    marginBottom: '16px',
    '& .MuiAlert-icon': {
      alignItems: 'center',
      paddingTop: '16px !important',
    },
    '& .MuiAlert-message': {
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '143%',
      letterSpacing: '0.15px',
      color: 'rgba(13, 60, 97, 1)',
      textAlign: 'left',
      width: '342px',
    },
  },
}))

export const PasswordRequirementAlert = props => {
  const classes = useStyles()

  return (
    <Alert className={classes.root} severity="info">
      <FormattedMessage {...props.message} />
    </Alert>
  )
}
