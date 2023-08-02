import React, { useState } from "react";
import { Box, Typography, TableCell } from "@mui/material";
import MaterialButton from "@/components/atom/Buttons";
import { useStyles } from "./styles";
import { useStyles as useTableStyles } from "../styles";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

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
    <Box sx={{ ...classes.header }}>
      <Typography sx={{ ...classes.title }}>{title}</Typography>
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
        style={{
          minWidth: width ? width : "auto",
        }}
        sx={{
          ...classes.cellHeader,
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
      onClick={() => handleSort(field, nextOrder(order))}
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
      style={{
        minWidth: width ? width : "auto",
      }}
      sx={{
        ...classes.cellHeader,
        ...classes.sortable,
      }}
    >
      {text}
      <ArrowDownwardIcon
        style={{
          visibility: showArrows
            ? "visible"
            : orderBy != field || order == 2
            ? "hidden"
            : "visible",
          transform: `rotate(${order < 2 ? order * 180 : 0}deg)`,
        }}
        sx={{
          ...classes.icon,
        }}
      />
    </TableCell>
  );
};

export { TableHeader, TableColHeader };
