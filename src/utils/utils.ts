import jwt_decode from "jwt-decode";
import { CampusIds, Day, UserBase, WeekDays } from "./interfaces/interfaces";
import routes from "@/routes/routes";

export const storageKeys = {
  userInfo: "userInfo",
};

export const setLogin = (res: UserBase) => {
  localStorage.setItem("userInfo", JSON.stringify(res));
};

/**
 * Get current token
 * @return {string}
 */
export function getToken() {
  const userInfo = localStorage.getItem(storageKeys.userInfo);
  const session = JSON.parse(userInfo || "{}");
  return session?.token || null;
}

/**
 * Validate the session, if not token or token is not valid
 * redirect to login page
 */
export const validateSession = () => {
  const token = getToken();
  const path = location.pathname;
  if (path === routes.login || path.includes(routes.changePassword)) return;
  if (path !== routes.login && !token) {
    localStorage.clear();
    window.location.href = routes.login;
    return false;
  }
  try {
    let decoded: any = jwt_decode(token);
    let now = new Date().getTime() / 1000;
    if (now > decoded.exp) {
      localStorage.clear();
      window.location.href = routes.login;
      return;
    }
  } catch {
    localStorage.clear();
    window.location.href = routes.login;
    return;
  }
};

export const errorTypes = {
  required: "required",
};

/**
 * Get error message from error or helper text
 */
export const getErrorMessage = (error: any, helperText: string) => {
  const isErrorRequired = error && error.type === errorTypes.required;
  const messageRequired = isErrorRequired ? helperText : error?.message;
  const message = error ? messageRequired : "";
  return message;
};

/**
 * Get quantity of decimals on number
 */
export const getQuantiyOfDecimalInNumber = (value: any) => {
  return (value?.toString().split(".")[1] || "").length;
};

/**
 * Get determinate if a number or string type number is greater than
 * a target
 */
export const isGreaterThanAllowed = (value: string, target: number) => {
  return Number(value) > target;
};

/**
 * Get determinate if a number or string type number is less than
 * a target
 */
export const isLessThanAllowed = (value: string, target: number) => {
  return Number(value) < target;
};

export const inputPropsDefault = (classes: any) => {
  return {
    shrink: true,
    classes: {
      asterisk: classes.asteriskColor,
      root: classes.cssLabel,
      focused: classes.cssFocused,
      error: classes.cssError,
    },
  };
};

export const useStylesInputLabel = () => ({
  asteriskColor: {
    color: "rgba(245, 0, 87, 1)",
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: "#000 !important",
    },
  },
  cssLabel: {
    fontWeight: "400",
  },
  cssFocused: {
    color: "#000 !important",
  },
  cssError: {
    // color: `${theme.palette.error.main} !important`,
  },
});

export const defaultInputPropsStepper = { step: 0.01, min: 0, max: 100, lang: "en-US"}

export const variantTypes = {
  outlined: 'outlined',
  text: 'text',
  contained: 'contained',
  filled: 'filled',
  standard: 'standard',
  popover: 'popover',
  paper: 'paper',
  email: 'email',
  number: 'number'
}

export const weekDays: WeekDays[] = [
  {label: "Lunes", value: Day.Lunes},
  {label: "Martes", value: Day.Martes},
  {label: "Miercoles", value: Day.Miercoles},
  {label: "Jueves", value: Day.Jueves},
  {label: "Viernes", value: Day.Viernes},
  {label: "Sabado", value: Day.Sabado},
  {label: "Domingo", value: Day.Domingo},
]

export const campusIds: CampusIds[] = [
  {label: "Banco nacion", value: 1},
  {label: "Colegiales", value: 2},
]
