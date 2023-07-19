import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  text: {
    fontSize: '16px',
    lineHeight: '150%',
    letterSpacing: '0.15px',
  },
  textContainer: {
    paddingBottom: '0px !important',
    '& .MuiBox-root': {
      marginBottom: '0px !important',
    },
    textAlign: 'left',
  },
  buttonContainer: {
    marginTop: '6px',
  },
})
