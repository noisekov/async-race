export interface IdataCar {
  color: string;
  id: number;
  name: string;
}

export interface IdataWinner extends IdataCar {
  id: number;
  time: number;
  wins: number;
}

export interface IObjectWinners<T> {
  [index: number]: T;
}
