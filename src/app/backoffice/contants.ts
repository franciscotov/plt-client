import { Day, GameAttributes } from "@/utils/interfaces/interfaces";
import { CSSProperties } from "react";

export const containerStyles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "6rem",
  minHeight: "100vh",
};

export const containerLoginStyles: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  padding: "1rem",
  minHeight: "70vh",
};

export const game: GameAttributes = {
  name: "name",
  type: 5,
  date: 1,
  initHour: 20,
  endHour: 21,
  campusId: 1,
  day: Day.Lunes
};
