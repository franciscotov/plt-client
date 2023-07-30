import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
  iconSearch: {
    color: theme.palette.primary.main,
  },
  iconButton: {
    backgroundColor: theme.palette.background.default,
    borderRadius: '0px 4px 4px 0px',
    border: `1px solid ${theme.palette.primary.main}`,
    padding: '7px',
    width: '38px',
    '&:hover': {
      backgroundColor: theme.palette.background.default,
      borderRadius: '0px 4px 4px 0px',
      border: `1px solid ${theme.palette.primary.main}`,
      padding: '7px',
      width: '38px',
    },
    display: 'inline',
  },
  rootVariantButton: {
    borderRadius: '4px 0px 0px 4px',
  },
  rootVariantButtonSecond: {
    borderRadius: '4px 0px 0px 4px',
  },
  inputVariantButton: {
    padding: '10px 16px',
    width: '350px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  rootTextField: {
    maxWidth: '350px',
  },
}))
