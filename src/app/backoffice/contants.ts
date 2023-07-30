import { formConst } from "@/constants";
import { Column, Day, GameAttributes } from "@/utils/interfaces/interfaces";
import { CSSProperties } from "react";

const { game: gameNames } = formConst;

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
  day: Day.Lunes,
};

export const Columns: Column[] = [
  {
    text: "Name",
    tag: gameNames.name,
    sort: true,
  },
  {
    text: "ID",
    tag: gameNames.id,
  },
  {
    text: "Hora de inicio",
    tag: gameNames.initHour,
  },
  {
    text: "Hora de fin",
    tag: gameNames.endHour,
  },
  {
    text: "Jugadores",
    tag: gameNames.playersQuantity,
  },
];
