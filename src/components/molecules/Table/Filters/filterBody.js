import React, { useState, useEffect } from 'react'
import { array, shape, string, func, bool, any, object } from 'prop-types'
import {
  Divider,
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { MaterialButton } from '../../atomComponents/Buttons/index'
import { useStyles } from './styles'
import { FilterInput } from './filterInput'
import DateFnsUtils from '@date-io/date-fns'
import { add } from 'date-fns'
import { useSnackbar } from 'notistack'
import esLocale from 'date-fns/locale/es'
import noDataFound from '../../../assets/images/no-data-found.svg'
import { useTranslation } from 'react-i18next'
import { translationKeys } from './constants'

// eslint-disable-next-line react/prop-types
const ListBody = ({
  value,
  list,
  tag,
  filters,
  setFilters,
  popupState,
  isTarget,
  isUnique,
  setRefresh,
}) => {
  const { t } = useTranslation()
  const classes = useStyles()
  const [specific, setSpecific] = useState('')
  const [checkeds, setCheckeds] = useState(value)

  const addCheckeds = (newValue, closePopup, clean) => {
    const copy = JSON.parse(JSON.stringify(filters))
    copy.selecteds?.forEach(el => {
      // se coloca condición para filtros que pueden modificar otros filtros
      if (isTarget && el.controlledBy && el.controlledBy.includes(tag))
        el.config.value = []

      if (el.tag == tag) {
        el.config.value = newValue
      }
    })
    setCheckeds(newValue)
    if (setRefresh) {
      if (!isTarget) {
        setFilters(copy)
        setRefresh(false)
      } else setRefresh(isTarget, newValue[0], tag, copy)
    } else setFilters(copy)
    if (clean) {
      setSpecific('')
    }

    if (closePopup) {
      popupState.close()
    }
  }

  const handleToggle = valueData => {
    const copy = JSON.parse(JSON.stringify(checkeds))
    if (isUnique) {
      setCheckeds([valueData])
    } else {
      if (copy.includes(valueData)) {
        setCheckeds(copy.filter(el => el != valueData))
      } else {
        copy.push(valueData)
        setCheckeds(copy)
      }
    }
  }

  return (
    <>
      {list.length > 5 && (
        <>
          <Box style={{ padding: '0px 16px', marginBottom: 10 }}>
            <FilterInput
              value={specific}
              variant={'button'}
              onChange={e => setSpecific(e.target.value)}
            />
          </Box>
          <Divider />
        </>
      )}
      <Box className={classes.list}>
        <List>
          {list
            .filter(el =>
              el.label?.toLowerCase().includes(specific.toLowerCase()),
            )
            .sort((a, b) => a.label.localeCompare(b.label))
            .map((filter, index) => (
              <ListItem
                key={index}
                dense
                button
                onClick={() => handleToggle(filter.value)}
                className={`${
                  checkeds.includes(filter.value)
                    ? classes.listItemSelected
                    : classes.listItem
                }`}
              >
                {!isUnique && (
                  <ListItemIcon className={classes.checkboxListIcon}>
                    <Checkbox
                      edge="start"
                      checked={checkeds.includes(filter.value)}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        'aria-labelledby': `checkbox-list-label-${filter.index}`,
                      }}
                      className={classes.checkboxSecond}
                      classes={{ root: classes.rootCheckbox }}
                    />
                  </ListItemIcon>
                )}
                <ListItemText
                  className={'listItemTextFilterBody'}
                  id={`checkbox-list-label-${filter.index}`}
                  primary={filter.label}
                />
              </ListItem>
            ))}
          {list.filter(el =>
            el.label?.toLowerCase().includes(specific.toLowerCase()),
          ).length === 0 && (
            <Grid container>
              <Grid item container justify="center" alignItems="center">
                <img className={classes.noDataImage} src={noDataFound} />
              </Grid>
              <Grid item container justify="center" alignItems="center">
                <Typography className={classes.noDataText}>
                  {t(translationKeys.notResults)}
                </Typography>
              </Grid>
            </Grid>
          )}
        </List>
      </Box>
      <Divider />
      <Box className={classes.buttons}>
        <MaterialButton
          id="DROP_FILTERS"
          text={t(translationKeys.clearAll)}
          variant="outlined"
          onClick={() => addCheckeds([], false, true)}
        />
        <MaterialButton
          id="ADD_FILTERS"
          text={t(translationKeys.showResults)}
          style={{ marginRight: 'unset' }}
          onClick={() => addCheckeds(checkeds, true, false)}
        />
      </Box>
    </>
  )
}

ListBody.propTypes = {
  value: array,
  list: array,
  onClick: func,
  newValue: array,
  isTarget: bool,
  isUnique: bool,
  setRefresh: func,
}

ListBody.defaultProps = {
  isTarget: false,
  isUnique: false,
  setRefresh: null,
}

const generateDate = startDate => {
  if (startDate) return startDate
  else return new Date()
}
const generateCopyTag = (
  copy,
  tag,
  startDateData,
  endDateData,
  rangeData,
  undefinedEndDateData,
) => {
  copy.selecteds?.forEach(el => {
    if (el.tag == tag) {
      el.config.startDate = startDateData
      el.config.endDate = endDateData
      el.config.range = rangeData
      el.config.undefinedEndDate = undefinedEndDateData
    }
  })
  return copy
}

const DateBody = ({
  singleDateLabel,
  startDateLabel,
  endDateLabel,
  startDate,
  endDate,
  range = false,
  tag,
  filters,
  setFilters,
  undefinedEndDate = false,
  popupState,
}) => {
  const { t } = useTranslation()
  const classes = useStyles()
  const start = generateDate(startDate)
  const [isRange, setIsRange] = useState(range)
  const [firstDate, setFirstDate] = useState(start)
  const [secondDate, setSecondDate] = useState(endDate)
  const [isOpenFirstDate, setIsOpenFirstDate] = useState(false)
  const [isOpenSecondDate, setIsOpenSecondDate] = useState(false)
  const [isUndefinedEndDate, setUndefinedEndDate] = useState(undefinedEndDate)
  const { enqueueSnackbar } = useSnackbar()

  const singleDateLabelValue =
    singleDateLabel || t(translationKeys.enterCreatedAt)
  const startDateLabelValue = startDateLabel || t(translationKeys.startDate)
  const endDateLabelValue = endDateLabel || t(translationKeys.endDate)

  const updateDate = (
    clean,
    startDateData,
    endDateData,
    rangeData,
    undefinedEndDateData,
    closePopup = false,
  ) => {
    const copy = JSON.parse(JSON.stringify(filters))
    if (rangeData && !endDateData && !undefinedEndDateData) {
      enqueueSnackbar(t(translationKeys.mustChooseTheEndDate), {
        variant: 'error',
      })
      return
    }
    generateCopyTag(
      copy,
      tag,
      startDateData,
      endDateData,
      rangeData,
      undefinedEndDateData,
    )

    setFilters(copy)
    if (closePopup) {
      popupState.close()
    }

    if (clean) {
      setFirstDate(null)
      setSecondDate(null)
      setUndefinedEndDate(false)
      setIsRange(false)
    }
  }

  useEffect(() => {
    if (isUndefinedEndDate) setSecondDate(null)
  }, [isUndefinedEndDate])

  return (
    <>
      <Box p={2}>
        <FormControlLabel
          style={{ display: 'flex' }}
          className={classes.fontSize14}
          control={
            <Switch
              checked={isRange}
              id="isRange "
              onChange={() => setIsRange(!isRange)}
              name="isRange"
            />
          }
          label={t(translationKeys.rangeDate)}
        />
        <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
          <Grid container justifyContent="space-between">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              placeholder="DD/MM/AAAA"
              inputVariant="outlined"
              className={
                isRange ? classes.fontSize14WithRange : classes.fontSize14
              }
              format="dd/MM/yyyy"
              margin="dense"
              id="start-date"
              style={{ fontsize: 14 }}
              label={isRange ? startDateLabelValue : singleDateLabelValue}
              value={firstDate}
              onChange={date => {
                setFirstDate(date)
                setIsOpenFirstDate(false)
              }}
              invalidDateMessage={t(translationKeys.invalidDate)}
              maxDateMessage={t(translationKeys.maxDateMessage)}
              minDateMessage={t(translationKeys.minDateMessage)}
              InputLabelProps={{ shrink: true }}
              KeyboardButtonProps={{
                onFocus: () => setIsOpenFirstDate(true),
              }}
              PopoverProps={{
                disableRestoreFocus: true,
                onClose: () => setIsOpenFirstDate(false),
              }}
              InputProps={{
                onFocus: () => setIsOpenFirstDate(true),
              }}
              open={isOpenFirstDate}
            />

            {isRange && (
              <KeyboardDatePicker
                disableToolbar
                style={{ marginLeft: 10, fontsize: 14 }}
                variant="inline"
                className={classes.fontSize14WithRange}
                inputVariant="outlined"
                placeholder={
                  isUndefinedEndDate
                    ? t(translationKeys.indefiniteDate)
                    : 'DD/MM/AAAA'
                }
                format="dd/MM/yyyy"
                margin="dense"
                id="end-date"
                minDate={add(firstDate, { days: 1 })}
                label={
                  isUndefinedEndDate
                    ? t(translationKeys.indefiniteDate)
                    : endDateLabelValue
                }
                value={secondDate}
                disabled={isUndefinedEndDate}
                onChange={date => {
                  setSecondDate(date)
                  setIsOpenSecondDate(secondDate == null)
                }}
                invalidDateMessage={t(translationKeys.invalidDate)}
                maxDateMessage={t(translationKeys.maxDateMessage)}
                minDateMessage={t(translationKeys.minDateMessage)}
                InputLabelProps={{ shrink: true }}
                KeyboardButtonProps={{
                  onFocus: () => setIsOpenSecondDate(true),
                }}
                PopoverProps={{
                  disableRestoreFocus: true,
                  onClose: () => setIsOpenSecondDate(false),
                }}
                InputProps={{
                  onFocus: () => setIsOpenSecondDate(true),
                }}
                open={isOpenSecondDate}
              />
            )}
          </Grid>
        </MuiPickersUtilsProvider>

        {isRange && (
          <Grid container justifyContent="flex-end">
            <FormControlLabel
              className={classes.endDateIndeterminate}
              control={
                <Checkbox
                  checked={isUndefinedEndDate}
                  onChange={() => setUndefinedEndDate(!isUndefinedEndDate)}
                  name="haveEndDate"
                  classes={{ root: classes.rootCheckbox }}
                />
              }
              label={t(translationKeys.indefiniteEndDate)}
            />
          </Grid>
        )}
      </Box>
      <Divider />
      <Box className={classes.buttons}>
        <MaterialButton
          id="DROP_FILTERS"
          text={t(translationKeys.clearAll)}
          variant="outlined"
          onClick={() => updateDate(true, null, null, false)}
        />
        <MaterialButton
          id="ADD_FILTERS"
          text={t(translationKeys.showResults)}
          style={{ marginRight: 'unset' }}
          onClick={() =>
            updateDate(
              false,
              firstDate,
              secondDate,
              isRange,
              isUndefinedEndDate,
              true,
            )
          }
        />
      </Box>
    </>
  )
}

DateBody.propTypes = {
  singleDateLabel: string,
  startDateLabel: string,
  range: bool,
  tag: string,
  filters: array,
  setFilters: func,
  endDateLabel: string,
  endDate: any,
  startDate: any,
  undefinedEndDate: bool,
}

const FilterPopoverBody = ({
  type = '',
  config,
  tag,
  filters,
  setFilters,
  popupState,
  isTarget,
  isUnique,
  setRefresh,
}) => {
  const classes = useStyles()
  return (
    <Box className={classes.popover}>
      {type.toLowerCase() == 'list' && (
        <ListBody
          {...config}
          tag={tag}
          filters={filters}
          setFilters={setFilters}
          popupState={popupState}
          isTarget={isTarget}
          isUnique={isUnique}
          setRefresh={setRefresh}
        />
      )}
      {type.toLowerCase() == 'date' && (
        <DateBody
          {...config}
          tag={tag}
          filters={filters}
          setFilters={setFilters}
          popupState={popupState}
        />
      )}
    </Box>
  )
}

FilterPopoverBody.propTypes = {
  type: string,
  config: shape(),
  tag: string,
  filters: object,
  setFilters: func,
  isTarget: bool,
  isUnique: bool,
  setRefresh: func,
}

FilterPopoverBody.defaultProps = {
  isTarget: false,
  isUnique: false,
  setRefresh: null,
}

export { FilterPopoverBody }
