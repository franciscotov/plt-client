import { makeStyles } from '@mui/material'

export const useStyles = makeStyles(theme => ({
  container: {
    padding: '8px 16px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    boxShadow: 'none',
  },
  currentFilters: {
    padding: '16px 16px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -15,
    marginBottom: 25,
    justifyContent: 'flex-start',
    '& > div': {
      whiteSpace: 'nowrap',
    },
    boxShadow: 'none',
  },
  popover: {
    paddingTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItem: 'center',
    justifyContent: 'space-between',
    minWidth: '340px',
    maxHeight: '320px',
  },
  list: {
    overflow: 'auto',
    maxHeight: 250,
  },
  listItem: {
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main}14`,
    },
  },
  listItemSelected: {
    backgroundColor: `${theme.palette.primary.main}14`,
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main}14`,
    },
  },
  fontSize14: {
    width: '100%',
    '&  span': {
      fontSize: 14,
    },
    '&  input': {
      fontSize: 14,
    },
  },
  fontSize14WithRange: {
    width: 'auto',
    '&  span': {
      fontSize: 14,
    },
    '&  input': {
      fontSize: 14,
    },
  },
  endDateIndeterminate: {
    justifyContent: 'end',
    '&  span': {
      fontSize: 14,
    },
    '&  input': {
      fontSize: 14,
    },
  },
  buttons: {
    display: 'flex',
    padding: '16px',
    alignItem: 'center',
    justifyContent: 'space-between',
    '& > button': {
      fontSize: 13,
    },
    '& > button:first-of-type': {
      // marginRight: '1em'
    },
  },
  grow: {
    flexGrow: 1,
  },
  checkboxSelectAll: {
    padding: '0px',
    margin: '0px 11px 0px 0px',
  },
  checkboxMain: {
    padding: '0px',
    margin: '0px 11px 0px 0px',
  },
  checkboxSecond: {
    padding: '0px',
    margin: '0px 11px 0px 0px',
  },
  checkboxListIcon: {
    minWidth: '0px',
  },
  noDataText: {
    width: '200px',
    textAlign: 'center',
  },
  noDataImage: {
    width: '100px',
  },
  paper: {
    overflowY: 'hidden',
  },
  rootCheckbox: {
    color: theme.palette.action.active || 'rgba(0,0,0, 0.54)',
  },
  filterButtonsRoot: {
    color: theme.palette.highContrast ? theme.palette.primary.main : '#000 !important',
  },
}))
