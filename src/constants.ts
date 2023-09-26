import { CSSProperties } from "react";

export const formConst = {
  login: {
    email: "email",
    password: "password",
  },
  game: {
    id: "id",
    name: "name",
    day: "dayValue",
    initHour: "initHour",
    endHour: "endHour",
    totalPlayers: "totalPlayers",
    campusId: "campusId",
  },
  campus: {
    name: "name",
    address: "address",
    lng: "lng",
    lat: "lat",
  },
  list: {
    list: "list",
    campus: "campus",
  },
};

export const containerNavbar: CSSProperties = {
  // display: "abso",
  // justifyContent: "center",
  // alignItems: "center",
  position: "absolute",
  width: '100%',
  padding: "1rem",
  minHeight: "10vh",
  backgroundColor: "blue",
};
