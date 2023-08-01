import { formConst } from "@/constants";
import { Column, Day, GameAttributes } from "@/utils/interfaces/interfaces";
import { states } from "@/utils/utils";
import { CSSProperties } from "react";
import i18n from "@/i18n/i18n-es.json";

const { game: gameNames, campus } = formConst;

export const containerStyles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "6rem",
  minHeight: "90vh",
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

export const Columns = (status: number): Column[] => [
  {
    text: i18n.columnsName,
    tag: gameNames.name,
    sort: true,
  },
  {
    text: i18n.columnsId,
    tag: gameNames.id,
  },
  {
    text: i18n.columnsInitHour,
    tag: gameNames.initHour,
    visible: status === states.game,
  },
  {
    text: i18n.columnsEndHour,
    tag: gameNames.endHour,
    visible: status === states.game,
  },
  {
    text: i18n.columnsPlayersQuantity,
    tag: gameNames.playersQuantity,
    visible: status === states.game,
  },
  {
    text: i18n.columnsAdress,
    tag: campus.address,
    visible: status === states.campus,
  },
];
