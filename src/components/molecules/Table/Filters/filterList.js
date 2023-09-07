import React, { useEffect, useState } from 'react'
import {
  Box,
  Divider,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  List,
} from '@mui/material'
import { useStyles } from './styles'
import { FilterInput } from './filterInput'
import { array, func, shape } from 'prop-types'
import { MaterialButton } from '../../atomComponents/Buttons/index'
import { useTranslation } from 'react-i18next'
import { translationKeys } from './constants'
import { filtersTagEvents } from '../../../util/constants'

const reducer = (a, b) => ({ checked: a.checked && b.checked })

const FilterList = ({
  filters,
  filtersInfo = { keyword: '', selecteds: [] },
  setFilters,
  handleClose,
  setRefresh,
}) => {
  const { t } = useTranslation()
  const classes = useStyles()
  const [specific, setSpecific] = useState('')
  const [filterList, setFilterList] = useState(
    filters?.filter(el => el.visible),
  )

  const handleToggle = tag => () => {
    const copy = JSON.parse(JSON.stringify(filterList))
    const index = copy.indexOf(copy.find(el => el.tag == tag))
    copy[index].checked = !copy[index].checked
    setFilterList(copy)
  }

  const checkAllOptions = () => {
    const copy = JSON.parse(JSON.stringify(filterList))
    copy.forEach(el => (el.checked = !filterList.reduce(reducer).checked))
    setFilterList(copy)
  }

  const deleteFilters = () => {
    const copy = JSON.parse(JSON.stringify(filtersInfo))
    copy.selecteds = []
    if (setRefresh) {
      setFilters(copy)
      setRefresh(false)
    } else setFilters(copy)
  }

  const addFilters = () => {
    const copy = JSON.parse(JSON.stringify(filtersInfo))
    const newSelectedTags = filterList
      ?.filter(el => el.checked)
      .map(el => el.tag)
    const currentSelectedTags = copy.selecteds
      ?.filter(el => el.checked)
      .map(el => el.tag)
    const filtersThatStays =
      copy.selecteds != undefined
        ? copy.selecteds.filter(el => newSelectedTags?.includes(el.tag))
        : []
    const newFilters = filterList
      ?.filter(el => el.checked)
      ?.filter(el => !currentSelectedTags?.includes(el.tag))
    copy.selecteds = [...filtersThatStays, ...newFilters]
    // add to handle filters dependencies
    if (setRefresh) {
      setRefresh(true, null, filtersTagEvents.addFilters, copy)
    } else setFilters(copy)
    handleClose()
  }

  useEffect(() => {
    const tags = filtersInfo.selecteds?.map(el => el.tag)
    const copy = JSON.parse(JSON.stringify(filterList))
    copy.forEach(el => (el.checked = tags?.includes(el.tag)))
    setFilterList(copy)
  }, [filtersInfo])

  return (
    <Box className={classes.popover}>
      {/** Mostrar el buscador en los filtros */}
      {filterList.length > 5 && (
        <>
          <Box style={{ padding: '0px 16px', marginBottom: 10, width: '100%' }}>
            <FilterInput
              onChange={e => setSpecific(e.target.value)}
              value={specific}
              style={{
                height: 40,
                fontSize: 14,
              }}
              variant={'button'}
            />
          </Box>
          <Divider />
        </>
      )}
      <Box className={classes.list}>
        <List>
          {/** Seleccionar todos */}
          {filterList.length > 5 && (
            <ListItem
              dense
              button
              onClick={checkAllOptions}
              className={
                filterList.reduce(reducer).checked
                  ? classes.listItemSelected
                  : classes.listItem
              }
            >
              <ListItemIcon className={classes.checkboxListIcon}>
                <Checkbox
                  edge="start"
                  checked={filterList.reduce(reducer).checked}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': 'checkbox-list-label-all' }}
                  className={classes.checkboxSelectAll}
                  classes={{ root: classes.rootCheckbox }}
                />
              </ListItemIcon>
              <ListItemText
                id={'checkbox-list-label-all'}
                primary={t(translationKeys.selectAll)}
                className={'listItemTextFilterBody'}
              />
            </ListItem>
          )}
          {/** Filtros mostrados */}
          {filterList
            ?.filter(el =>
              el.label.toLowerCase()?.includes(specific.toLowerCase()),
            )
            .sort((a, b) => a.label.localeCompare(b.label))
            .map((filter, index) => (
              <ListItem
                key={index}
                dense
                button
                onClick={handleToggle(filter.tag)}
                className={
                  filter.checked ? classes.listItemSelected : classes.listItem
                }
              >
                <ListItemIcon className={classes.checkboxListIcon}>
                  <Checkbox
                    edge="start"
                    checked={filter.checked}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      'aria-labelledby': `checkbox-list-label-${filter.tag}`,
                    }}
                    className={classes.checkboxMain}
                    classes={{ root: classes.rootCheckbox }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={`checkbox-list-label-${filter.tag}`}
                  primary={filter.label}
                  className={'listItemTextFilterBody'}
                />
              </ListItem>
            ))}
        </List>
      </Box>
      <Divider />
      <Box className={classes.buttons}>
        <MaterialButton
          id="DROP_FILTERS"
          text={t(translationKeys.clearAll)}
          variant="outlined"
          onClick={deleteFilters}
        />
        <MaterialButton
          id="ADD_FILTERS"
          text={t(translationKeys.showFilters)}
          onClick={addFilters}
        />
      </Box>
    </Box>
  )
}

FilterList.propTypes = {
  filters: array,
  filtersInfo: shape(),
  setFilters: func,
}

export { FilterList }
