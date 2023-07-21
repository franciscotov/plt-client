import { makeStyles, Chip } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'

const styles = makeStyles(() => ({
  chip: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 90,
    margin: '0',
    // backgroundColor: 'green',
    boxSizing: 'content-box',
    float: 'left',
    // lineHeight: '0rem',
  },
}))

const ChipComponent = ({ label, onDelete, index, style }) => {
  const classes = styles()

  return (
    <>
      <Chip
        deleteIcon={
          <CancelIcon onMouseDown={event => event.stopPropagation()} />
        }
        style={style}
        className={classes.chip}
        key={index}
        label={label}
        onDelete={onDelete}
      />
    </>
  )
}

export default ChipComponent
