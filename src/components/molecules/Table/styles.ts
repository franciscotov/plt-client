// import { makeStyles } from '@mui/material'
// import { convertHexToRGB } from "../../util/util";
export const useStyles = () => {
  // let c = convertHexToRGB(theme.palette.primary.main);
  let c = "#fafafa";
  return {
    containerTable: {
      ...scrollbarStyles,
    },
    tableRow: {
      "&.Mui-selected, &.Mui-selected:hover": {
        backgroundColor: `rgba(${c},0.08)`,
      },
    },
    tableRowClick: {
      "&.Mui-selected, &.Mui-selected:hover": {
        backgroundColor: `rgba(${c},0.08)`,
        "& a": {
          color: "#002FC5 !important",
          textDecoration: "underline",
        },
      },
      "&.MuiTableRow-hover": {
        "&.MuiTableRow-hover:hover": {
          "& a": {
            color: "#002FC5 !important",
            textDecoration: "underline",
          },
        },
        a: {
          color: "red !important",
        },
      },
    },
    tableCell: {
      "$hover:hover &": {
        color: "pink",
      },
    },
    hover: {
      "&:hover": {
        backgroundColor: `rgba(${c},0.08) !important`,
      },
    },
    table: {
      fontFamily: "Roboto",
      minWidth: 650,
    },
    row: {
      cursor: "pointer",
      "& .actions": {
        visibility: "hidden",
      },
      "&:hover .actions": {
        visibility: "visible !important",
      },
    },
    rowHover: {
      backgroundColor: "rgba(0, 0, 0, 0.04) !important",
    },
    cell: {
      padding: "0",
      lineHeight: "24px",
      overflow: "hidden",
      maxWidth: "200px",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    sortable: {
      cursor: "pointer",
    },
    icon: {
      height: 14,
      transition: "transform .5s ease-in-out",
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
    noData: {
      marginTop: "20px",
      textAlign: "center",
    },
    noDataText: {
      fontSize: 20,
      fontWeight: 500,
      paddingBottom: 2,
    },
    inactive: {
      color: "rgba(0, 0, 0, 0.38) !important",
    },
    link: {
      textDecoration: "none",
      color: "rgba(0, 0, 0, 0.87)",
      "&:hover": {
        color: "#002FC5 !important",
        textDecoration: "underline",
        cursor: "pointer",
        fontWeight: 500,
        fontSize: "14px",
      },
    },
    text: {
      fontWeight: "700 !important",
      backgroundColor: "#FFFFFF",
      padding: "1px 8px 1px 12px !important",
    },
    containerLoading: {
      width: "100%",
      minHeight: "260px",
      fontSize: "14px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    readButtons: {
      fontFamily: "Roboto",
      fontSize: 12,
      fontWeight: 400,
      lineHeight: "12px",
      margin: "0px 5px",
      textTransform: "none",
      border: "1px solid rgba(0, 0, 0, 0.08)",
      borderRadius: "5px",
      padding: "4px 10px",
    },
    selectorButton: {
      textTransform: "capitalize",
      fontSize: 14,
      padding: "0px 2px 0px 0px",
      fontWeight: 400,
      lineHeight: "20.02px",
      color: "rgba(0, 0, 0, 0.87)",
      letterSpacing: "0.15px",
    },
    containerCheckbox: {
      margin: "auto",
      width: "fit-content",
    },
    tableCellCheckbox: {
      backgroundColor: `rgba(${c},0.08)`,
    },
    tableCellCheckboxHover: {
      "&:hover": { backgroundColor: `rgba(${c},0.04)` },
    },
    indeterminate: {
      // color: theme.palette.primary.main,
      "&.MuiCheckbox-root": {
        // color: theme.palette.primary.main,
      },
    },
    containerItemHeader: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    checkboxArrayCell: {
      padding: "1px 8px 1px 12px !important",
    },
    checkboxArrayContainerTable: {
      maxHeight: 250,
      ...scrollbarStyles,
    },
    rootCheckbox: {
      padding: 5,
      // color: theme.palette.action.active || "rgba(0,0,0, 0.54)",
    },
    cellHeader: {
      padding: "8px 8px 8px 0px",
      fontWeight: "700",
    },
    rejectedAlert: {
      width: "606px !important",
      height: "45px",
      marginTop: "5px",
      radius: "4px",
      padding: "6px, 16px, 6px, 16px",
      gap: "12px",
    },
    rootCheckboxHeader: {
      // color: theme.palette.action.active || "rgba(0,0,0, 0.54)",
    },
    warning: {
      color: "#FF9800",
    },
    warningError: {
      color: "#F44336",
    },
  };
};

const scrollbarStyles = {
  "&::-webkit-scrollbar": {
    width: "10px",
    height: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "4px",
    background: "rgba(0, 0, 0, 0.75)",
  },
  "&::-webkit-scrollbar-thumb:active": {
    background: "rgba(0, 0, 0, 0.60)",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "rgba(0, 0, 0, 0.60)",
  },
  "&::-webkit-scrollbar-track": {
    background: "#F9F9F9",
    padding: "4px",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    transform: "rotate(-90deg)",
  },
};
