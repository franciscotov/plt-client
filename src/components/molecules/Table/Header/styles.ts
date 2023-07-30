// import { makeStyles } from '@material-ui/core'

export const useStyles = () => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },
  title: {
    fontWeight: "500",
    color: "black",
  },
  textHeader: {
    fontWeight: "700 !important",
    backgroundColor: "#FFFFFF",
    padding: "10px 6px 10px 8px !important",
  },
  icon: {
    height: 14,
    transition: "transform .5s ease-in-out",
  },
  sortable: {
    cursor: "pointer",
  },
  disabledMargin: {
    marginRight: "0px !important",
  },
});
