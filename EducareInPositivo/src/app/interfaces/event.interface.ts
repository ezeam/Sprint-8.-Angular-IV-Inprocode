/*
export interface Event {
  id?: number;
  title: string;
  color: string;
  start: Date;
  end: Date;
}
*/

export interface Event {
  id?: number;
  from: Date;
  to: Date;
}
