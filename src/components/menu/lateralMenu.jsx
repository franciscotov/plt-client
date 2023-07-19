import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import { createStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/ArrowForward";
import TuneIcon from "@material-ui/icons/Tune";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import DirectionsIcon from "@material-ui/icons/Directions";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DetalleServicio from "../../pages/DetalleServicio/detalleServicio";
import Collapse from "@material-ui/core/Collapse";
import { Badge } from "@material-ui/core";
import Example from "../../pages/Example/example";
import { Redirect } from "react-router-dom";
import RescheduleService from "../../pages/RescheduleService/rescheduleService";
import Planning from "../../pages/Planning/Planning";
import ServiceMaintainer from "../../pages/serviceMantainer/ServiceMaintainer";
import OffersTray from "../../pages/OffersTray/OffersTray";
import Professionals from "../../pages/Professional/Professionals";
import {
  NotificationsModal,
  NotificationsErrorModal,
  NotificationsActivationModal,
  NotificationsBanner,
  NotificationsStepperModal,
} from "../NotificationsModal";
import { NotificationContext } from "../../contexts/NotificationContext/NotificationContext";
import { useDispatch, useSelector } from "react-redux";
import {
  setInitOffers,
  offersHaveBeenViewed,
} from "../../ducks/Actions/OffersActions";
import AIRPaymentsProvidersPage from "../../pages/paymentsToProvidersMF/PaymentsToProvidersMF";
import { viewsKeys } from "../../util/consts";

const drawerWidth = 240;
const pages = {
  BANDEJA_DE_OFERTAS: "Bandeja de ofertas",
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      position: "relative",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
      position: "relative",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    drawerNotificationButton: {
      position: "absolute",
      bottom: "25px",
    },
    drawerButtonDisabled: {
      color: "rgba(0, 0, 0, 0.26)",
    },
    forceEnabledColor: {
      opacity: "1 !important",
    },
    notificationBadge: {
      transform: "scale(.75) translate(5px, 3px)",
    },
  })
);

export default function LateralMenu() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { offers, offersCounter } = useSelector((state) => state.offers);
  const [availableOffers, setAvailableOffers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(<Example />);
  const [namePage, setNamePage] = React.useState("Portal Proveedores");

  const [openOptionOperation, setOpenOptionOperation] = React.useState(false);
  const [openOptionReport, setOpenOptionReport] = React.useState(false);
  const [openOptionPayment, setOpenOptionPayment] = React.useState(false);
  const [openOptionAdminist, setOpenOptionAdminist] = React.useState(false);

  const [redirect, setRedirect] = React.useState(false);

  const {
    setNotificationsStepperModalOpen,
    setNotificationsModalOpen,
    setNotificationsErrorModalOpen,
    setNotificationsActivationModalOpen,
    AlertComponentNotification,
  } = useContext(NotificationContext);

  const isNotificationsActive =
    localStorage.getItem("notificationsActive") === "true";

  const [visibleNotificationBanner, setVisibleNotificationBanner] = useState(
    !isNotificationsActive
  );

  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      const isGranted = permission == "granted";
      localStorage.setItem("notificationsActive", isGranted.toString());
      setVisibleNotificationBanner(!isGranted);
    });
  }, []);

  useEffect(() => {
    const restOffers = offers?.filter((offer) => offer.show);
    if (restOffers) setAvailableOffers(restOffers);
    if (isNotificationsActive) setNotificationsModalOpen(true);
  }, [offers]);

  useEffect(() => {
    if (namePage === pages.BANDEJA_DE_OFERTAS) dispatch(offersHaveBeenViewed());
  }, [namePage]);

  if (redirect) {
    return <Redirect to={{ pathname: "/login" }} />;
  }

  function clickData(name, props) {
    switch (name) {
      case viewsKeys.notification:
        setPage(<Example />); //Page
        setNamePage("Notificación"); //Name Page
        break;
      case viewsKeys.opServicios:
        setPage(<DetalleServicio clickData={clickData} info={props} />); //Page
        setNamePage("Operación Servicios"); //Name Page
        break;
      case viewsKeys.adminServicios:
        setPage(<ServiceMaintainer clickData={clickData} />); //Page
        setNamePage("Servicios"); //Name Page
        break;
      case viewsKeys.reporteServicios:
        setPage(<Example />); //Page
        setNamePage("Reporte Servicios"); //Name Page
        break;
      case viewsKeys.servicePaymentProviderMf:
        setPage(<AIRPaymentsProvidersPage clickData={clickData} />); //Page
        setNamePage("Pagos"); //Name Page
        break;
      case "admin-datos-generales":
        setPage(<Example />); //Page
        setNamePage("Administración Datos Generales"); //Name Page
        break;
      case "admin-sucursal":
        setPage(<Example />); //Page
        setNamePage("Administración Sucursal"); //Name Page
        break;
      case "reschedule-service":
        setPage(<RescheduleService />); //Page
        setNamePage("Reasignar servicio"); //Name Page
        break;
      case "planning":
        setPage(<Planning />); //Page
        setNamePage("Planificación"); //Name Page
        break;
      case "offers":
        setPage(<OffersTray />);
        setNamePage(pages.BANDEJA_DE_OFERTAS);
        dispatch(offersHaveBeenViewed());
        break;
      case "professionals":
        setPage(<Professionals />); //Page
        setNamePage("Administración Profesionales"); //Name Page
        break;
      default:
        setPage(<Example />); //Page
        setNamePage("Cerrar Sesión"); //Name Page
        break;
    }
  }

  function clickDesplegable(info) {
    switch (info) {
      case "operation":
        setOpenOptionOperation(!openOptionOperation);
        break;
      case "reportes":
        setOpenOptionReport(!openOptionReport);
        break;
      case "payments":
        setOpenOptionPayment(!openOptionPayment);
        break;
      case "administracion":
        setOpenOptionAdminist(!openOptionAdminist);
        break;
    }
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNotificationButton = () => {
    if (!isNotificationsActive) {
      setNotificationsActivationModalOpen(true);
    } else if (availableOffers?.length > 0) {
      setNotificationsModalOpen(true);
    } else {
      setNotificationsErrorModalOpen(true);
    }
  };

  const handleActivarNotificaciones = async () => {
    if (Notification.permission == "denied") {
      setNotificationsStepperModalOpen(true);
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission == "granted") {
      localStorage.setItem("notificationsActive", "true");
      setVisibleNotificationBanner(false);
    }
  };

  const handleRedirectToOffers = () => {
    setPage(<OffersTray />);
    setNamePage(pages.BANDEJA_DE_OFERTAS);
    dispatch(offersHaveBeenViewed());
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {namePage}
          </Typography>
          {visibleNotificationBanner ? (
            <NotificationsBanner
              setVisibleNotificationBanner={setVisibleNotificationBanner}
              handleActivarNotificaciones={handleActivarNotificaciones}
            />
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        <ListItem button onClick={() => clickDesplegable("operation")}>
          <ListItemIcon>
            <DirectionsIcon />
          </ListItemIcon>
          <ListItemText primary="Operaciones" />
          {openOptionOperation ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openOptionOperation} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              onClick={() => clickData(viewsKeys.adminServicios)}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Servicios" />
            </ListItem>

            <ListItem
              button
              className={classes.nested}
              onClick={() => clickData("planning")}
            >
              <ListItemIcon>
                <AllInboxIcon />
              </ListItemIcon>
              <ListItemText primary="Planificación" />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              onClick={() => clickData("offers")}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Ofertas" />
            </ListItem>
          </List>
        </Collapse>
        <Divider />
        <Collapse in={openOptionReport} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              onClick={() => clickData(viewsKeys.reporteServicios)}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Servicios" />
            </ListItem>
          </List>
        </Collapse>
        <Divider />
        <ListItem button onClick={() => clickDesplegable("payments")}>
          <ListItemIcon>
            <AllInboxIcon />
          </ListItemIcon>
          <ListItemText primary="Pagos" />
          {openOptionPayment ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openOptionPayment} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              onClick={() => clickData(viewsKeys.servicePaymentProviderMf)}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Proveedores" />
            </ListItem>
          </List>
        </Collapse>
        <Divider />
        <ListItem button onClick={() => clickDesplegable("administracion")}>
          <ListItemIcon>
            <TuneIcon />
          </ListItemIcon>
          <ListItemText primary="Administración" />
          {openOptionAdminist ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openOptionAdminist} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              onClick={() => clickData("professionals")}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Profesionales" />
            </ListItem>
          </List>
        </Collapse>
        <Divider />
        <ListItem
          button
          onClick={() => {
            localStorage.clear();
            dispatch(setInitOffers());
            setRedirect(true);
          }}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" />
        </ListItem>
        <ListItem
          button
          disabled={namePage === pages.BANDEJA_DE_OFERTAS}
          className={`${classes.drawerNotificationButton} ${
            namePage === pages.BANDEJA_DE_OFERTAS && isNotificationsActive
              ? classes.forceEnabledColor
              : ""
          }`}
          onClick={handleNotificationButton}
        >
          <ListItemIcon>
            <Badge
              badgeContent={offersCounter}
              color="error"
              classes={{ badge: classes.notificationBadge }}
            >
              <NotificationsIcon
                className={`${
                  !isNotificationsActive ? classes.drawerButtonDisabled : ""
                }`}
              />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Notificaciones" />
        </ListItem>
      </Drawer>
      <div
        style={{
          width: "100%",
          minHeight: "100%",
          height: "90vh",
          display: "grid",
          background: "#F8F8F8",
        }}
        className="containter-page"
      >
        {page}
      </div>
      <AlertComponentNotification />
      <NotificationsStepperModal />
      <NotificationsErrorModal />
      <NotificationsActivationModal
        handleActivarNotificaciones={handleActivarNotificaciones}
      />
      {availableOffers?.length <= 0 ? (
        <NotificationsErrorModal />
      ) : (
        <NotificationsModal handleRedirectToOffers={handleRedirectToOffers} />
      )}
    </div>
  );
}
