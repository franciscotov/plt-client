import jwt_decode from "jwt-decode";
import { UserBase } from "./interfaces/interfaces";
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
