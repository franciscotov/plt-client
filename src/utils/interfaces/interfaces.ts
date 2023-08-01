export interface UserBase {
  name: string;
  lastname: string;
  token: string;
  email: string;
  role: string;
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

export interface DaysAttributes {
  id?: number;
  value: string;
  label: string;
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

export enum Day {
  Lunes = "lunes",
  Martes = "martes",
  Miercoles = "miercoles",
  Jueves = "jueves",
  Viernes = "viernes",
  Sabado = "sabado",
  Domingo = "domingo",
}

export interface WeekDays {
  label: string;
  value: string;
}

export interface CampusIds {
  label: string;
  value: number;
}
