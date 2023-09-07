import React, { useState } from 'react'
import { array, bool, func, shape } from 'prop-types'
import { useStyles } from './styles'
import {
  Card,
  Popover,
  Button,
  Badge,
  ButtonGroup,
  Grid,
  Tooltip,
} from '@mui/material'
import FilterListIcon from '@material-ui/icons/FilterList'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { FilterList } from './filterList'
import { FilterInput } from './filterInput'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { FilterPopoverBody } from './filterBody'
import ClearIcon from '@material-ui/icons/Clear'
import { useTranslation } from 'react-i18next'
import { translationKeys } from './constants'
import { filtersTagEvents } from '../../../util/constants'

export const parseFilters = (filters = { keyword: '', selecteds: [] }) => {
  const parsedFilters = {}

  filters.selecteds.forEach(el => {
    if (el.type === 'list' && el.config.value?.length > 0) {
      parsedFilters[el.tag] = el.config.value
    } else if (el.config.startDate) {
      if (el.config.range) {
        parsedFilters[el.config.startDateTag] = new Date(
          el.config.startDate,
        ).toISOString()
        if (el.config.endDate) {
          parsedFilters[el.config.endDateTag] = new Date(
            el.config.endDate,
          ).toISOString()
        }
      } else {
        parsedFilters[el.tag] = new Date(el.config.startDate).toISOString()
      }
    }
  })
  if (filters.keyword) parsedFilters.keyword = filters.keyword

  return parsedFilters
}
const generateOpen = open => {
  if (open) return 'simple-popover'
  else return undefined
}
const TableFilter = ({
  filters = { keyword: '', selecteds: [] },
  setFilters,
  filterList,
  showKeywordInput = true,
  placeholderInput = 'Buscar',
  widthInput,
  variantInput,
  setRefresh,
}) => {
  const { t } = useTranslation()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [keyword, setKeyword] = useState(null)
  const data = {
    setRefresh: setRefresh,
    classes: classes,
  }

  const updateFilterKeyword = value => {
    const copy = JSON.parse(JSON.stringify(filters))
    copy.keyword = value
    if (setRefresh) setRefresh(true, value, filtersTagEvents.keyword, copy)
    else setFilters(copy)
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const id = generateOpen(open)

  const getVariant = ({ value, startDate }) => {
    if (
      (value == null || value == undefined || value?.length == 0) &&
      startDate == null
    )
      return 'outlined'

    return 'contained'
  }

  const clearFilters = () => {
    const copy = JSON.parse(JSON.stringify(filters))
    copy.selecteds = []
    if (setRefresh) setRefresh(true, '', filtersTagEvents.clearFilters, copy)
    else setFilters(copy)
  }

  const getOnChangeFilterInputByVariant = key => {
    if (variantInput === 'default') updateFilterKeyword(key)
    else setKeyword(key)
  }

  const getValueInputByVariant = () => {
    if (variantInput === 'default') return filters.keyword
    else return keyword
  }

  const generateLength = e => {
    if (e.type == 'list' && e.config.value?.length > 0) {
      let res = e.config.value?.length
      return `${res}`
    } else return ''
  }

  return (
    <>
      <Card className={classes.container}>
        {filterList && (
          <>
            <Button
              aria-describedby={id}
              style={{ height: 40, fontSize: 13 }}
              className={classes.filterButtonsRoot}
              onClick={handleClick}
            >
              <Badge
                badgeContent={filters.selecteds?.length}
                style={{ marginRight: 15 }}
                overlap="rectangular"
              >
                <FilterListIcon />
              </Badge>
              {t(translationKeys.allFilters)}
              <ExpandMoreIcon style={{ marginLeft: 15 }} />
            </Button>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              classes={{
                paper: classes.paper,
              }}
            >
              <FilterList
                filters={filterList}
                filtersInfo={filters}
                setFilters={setFilters}
                handleClose={handleClose}
                setRefresh={setRefresh}
              />
            </Popover>
          </>
        )}
        <div className={classes.grow} />
        {showKeywordInput && (
          <FilterInput
            value={getValueInputByVariant() || ''}
            onChange={e => getOnChangeFilterInputByVariant(e.target.value)}
            placeholder={placeholderInput}
            style={{ width: widthInput }}
            variant={variantInput}
            updateFilterKeyword={updateFilterKeyword}
            keyword={keyword}
          />
        )}
      </Card>
      {filters.selecteds?.length > 0 && (
        <Card className={classes.currentFilters}>
          {renderCard(
            filters,
            getVariant,
            generateLength,
            setFilters,
            open,
            '1',
            data,
          )}
          <Tooltip
            title={t(translationKeys.clearAllFilters)}
            placement="left"
            arrow
          >
            <ClearIcon onClick={clearFilters} style={{ cursor: 'pointer' }} />
          </Tooltip>
        </Card>
      )}
    </>
  )
}

const renderCard = (
  filters,
  getVariant,
  generateLength,
  setFilters,
  open,
  option,
  data,
) => {
  return (
    <Grid container spacing={1}>
      {filters.selecteds.map((el, i) => (
        <Grid key={i} item>
          <PopupState variant="popover" popupId="demo-popup-popover">
            {popupState => (
              <>
                <ButtonGroup
                  {...bindTrigger(popupState)}
                  variant={getVariant(el.config)}
                  color="primary"
                  aria-label="split button"
                >
                  <Button style={{ fontSize: 13 }}>{`${
                    el.label
                  } ${generateLength(el)}`}</Button>
                  <Button
                    style={{ fontSize: 13 }}
                    color="primary"
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="menu"
                  >
                    <ArrowDropDownIcon />
                  </Button>
                </ButtonGroup>
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  classes={
                    option === '1'
                      ? {
                          paper: data.classes.paper,
                        }
                      : ''
                  }
                >
                  <FilterPopoverBody
                    tag={el.tag}
                    filters={filters}
                    setFilters={setFilters}
                    config={el.config}
                    type={el.type}
                    popupState={popupState}
                    isTarget={el.isTarget}
                    isUnique={el.isUnique}
                    setRefresh={data.setRefresh}
                  />
                </Popover>
              </>
            )}
          </PopupState>
        </Grid>
      ))}
    </Grid>
  )
}

TableFilter.propTypes = {
  filters: shape(),
  setFilters: func,
  filterList: array,
  showKeywordInput: bool,
  setRefresh: func,
}

TableFilter.defaultProps = {
  variantInput: 'default',
  setRefresh: null,
}

export { TableFilter }

const TableFilterStatus = ({
  filters = { keyword: '', selecteds: [] },
  setFilters,
}) => {
  const classes = useStyles()
  const [anchorEl] = useState(null)

  const open = Boolean(anchorEl)

  const getVariant = res => {
    if (
      (res.value == null || res.value == undefined || res.value?.length == 0) &&
      res.startDate == null
    )
      return 'outlined'

    return 'contained'
  }
  const generateLength = el => {
    if (el.type == 'list' && el.config.value?.length > 0) {
      let res = el.config.value?.length
      return `${res}`
    } else return ''
  }
  return (
    <>
      <div className={classes.currentFilters}>
        {renderCard(
          classes,
          filters,
          getVariant,
          generateLength,
          setFilters,
          open,
          '2',
        )}
      </div>
    </>
  )
}

TableFilterStatus.propTypes = {
  filters: shape(),
  setFilters: func,
}

export { TableFilterStatus }
