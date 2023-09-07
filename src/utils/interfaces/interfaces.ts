export interface UserBase {
  name: string;
  lastname: string;
  token: string;
  email: string;
  role?: RoleI;
  google: boolean;
}

export interface UserAttributes extends UserBase {
  id: number;
  address: boolean;
  dni: string;
  phoneNumber: string;
  secretOtp: string;
  salt: string;
  newsletter: boolean;
  newPassword?: string;
}

export interface GameAttributes {
  id?: number;
  name: string;
  type: number;
  initHour: number;
  endHour: number;
  day: Day;
  date?: number;
  campusId?: number;
}

export interface CampusAttributes {
  id?: number;
  name: string;
  adress: string;
  lat: number;
  lng: number;
}

export interface DaysAttributes extends SelectAttributes {
  id?: number;
}

export interface PaginateDTO<T> {
  count: number;
  rows: T[];
}

export interface Column {
  text: string;
  tag: string;
  visible?: boolean;
  quantity?: boolean;
  sort?: boolean;
  width?: string;
}

export interface Tabs {
  title: string;
  state: number;
  visible: boolean;
}

export interface GameTypeAttributes extends SelectAttributes{
  id: number;
}

export enum Day {
  Lunes = "1",
  Martes = "2",
  Miercoles = "3",
  Jueves = "4",
  Viernes = "5",
  Sabado = "6",
  Domingo = "7",
}

export interface SelectAttributes {
  label: string;
  value: number | string;
}

export interface CampusIds extends SelectAttributes {
}

export interface RoleI extends SelectAttributes {
  id: number;
}

export interface GridMeasuresProps {
  xs: number;
  md: number;
  sm: number;
}

export interface ListAttributes {
  id: number;
  name: string;
  totalPlayers: number;
  playersQuantity: number;
  initHour: number;
  endHour: number;
  active: boolean;
  gameId?: number;
}

export interface List {
  listId: number;
  campusId: number;
  playerId: number;
}
