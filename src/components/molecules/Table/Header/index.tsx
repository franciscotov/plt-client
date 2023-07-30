import React, { useState } from "react";
import { Box, Typography, TableCell } from "@mui/material";
import MaterialButton from "@/components/atom/Buttons";
import { useStyles } from "./styles";
import { useStyles as useTableStyles } from "../styles";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { any, bool, func, string } from "prop-types";

const TableHeader = (props: any) => {
  const classes = useStyles();
  const {
    title,
    action,
    buttonText,
    variantButton,
    disabledButton,
    hiddenButton,
    showSecondButton,
    actionSecondButton,
    variantSecondButton,
    secondButtonText,
  } = props;

  return (
    <Box className={"classes.header"}>
      <Typography className={"classes.title"}>{title}</Typography>
      <div>
        {showSecondButton && (
          <MaterialButton
            text={secondButtonText}
            onClick={actionSecondButton}
            variant={variantSecondButton}
            disabled={disabledButton}
          />
        )}
        {!hiddenButton && (
          <MaterialButton
            text={buttonText}
            onClick={action}
            variant={variantButton}
            disabled={disabledButton}
            // overrideClasses={classes.disabledMargin}
          />
        )}
      </div>
    </Box>
  );
};

TableHeader.propTypes = {
  title: any,
  buttonText: any,
  action: func,
};

const TableColHeader = (props: any) => {
  const classes = useTableStyles();
  const [showArrows, setShowArrows] = useState(false);
  const {
    sort = false,
    text,
    handleSort,
    orderBy,
    order,
    field,
    width,
  } = props;
  if (!sort || !field)
    return (
      <TableCell
        className={"classes.textHeader"}
        style={{
          minWidth: width ? width : "auto",
        }}
      >
        {text}
      </TableCell>
    );
  const nextOrder = (value: number) => {
    if (value === 0) return 1;
    if (value === 1) return 2;
    if (value === 2) return 0;
  };

  return (
    <TableCell
      className={`${classes.sortable} ${classes.textHeader}`}
      onClick={() => handleSort(field, nextOrder(order))}
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
      style={{
        minWidth: width ? width : "auto",
      }}
    >
      {text}
      <ArrowDownwardIcon
        className={"classes.icon"}
        style={{
          visibility: showArrows
            ? 'visible'
            : orderBy != field || order == 2
            ? 'hidden'
            : 'visible',
          transform: `rotate(${order < 2 ? order * 180 : 0}deg)`,
        }}
      />
    </TableCell>
  );
};

export { TableHeader, TableColHeader };
