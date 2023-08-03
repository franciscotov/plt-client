import React, { useState } from "react";
import { Box, TableCell } from "@mui/material";
import { useStyles as useTableStyles } from "../styles";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import MaterialButton from "@/components/atom/Buttons";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "auto",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => {
  console.log(theme.breakpoints.values, "theme");
  return {
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
    },
  };
});

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: "80px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

export type SearchAppBarProps = {
  textButton: string;
  onClickButton: (...args: any[]) => any;
  placeholderSearch: string;
  onKeyDown: (...args: any[]) => any;
};

const SearchAppBar = (props: SearchAppBarProps) => {
  const { textButton, onClickButton, placeholderSearch, onKeyDown } = props;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ flexGrow: 1, borderRadius: "5px 5px 0 0", boxShadow: "none" }}
      >
        <StyledToolbar>
          <MaterialButton
            text={textButton}
            onClick={onClickButton}
            size="small"
          />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={placeholderSearch}
              inputProps={{ "aria-label": "search" }}
              onKeyDown={onKeyDown}
            />
          </Search>
        </StyledToolbar>
      </AppBar>
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

export { SearchAppBar, TableColHeader };
