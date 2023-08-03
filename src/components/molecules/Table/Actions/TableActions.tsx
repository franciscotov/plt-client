import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  MenuItem,
  Menu,
  IconButton,
  ListItemText,
  styled,
} from "@mui/material";
import { useStyles } from "./styles";

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: "0 0px",
  height: "auto",
  [theme.breakpoints.up("sm")]: {
    padding: "8px 8px",
  },
}));

const TableActions = (props: any) => {
  const classes = useStyles();
  const { active, index, row, actions } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    active(index, true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    active(index, false);
    setAnchorEl(null);
  };

  const handleAction = (action: any, r: any, close: boolean = true) => {
    action(r);
    if (close) handleClose();
  };

  return (
    <div
      className="actions"
      style={{ visibility: anchorEl ? "visible" : "visible" }}
    >
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={(e) => {
          e.stopPropagation();
          handleClick(e);
        }}
        sx={classes.buttonActions}
      >
        <MoreHorizIcon className="actions" />
      </IconButton>
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={(e: Event) => {
          e.stopPropagation();
          handleClose();
        }}
      >
        {actions(row)
          .filter(({ visible = true }) => visible)
          .map((row: any, index: number) => {
            const { text, action, close } = row;
            return (
              <StyledMenuItem
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAction(action, row, close);
                }}
              >
                <ListItemText sx={classes.actionText} primary={text} />
              </StyledMenuItem>
            );
          })}
      </Menu>
    </div>
  );
};

export { TableActions };
