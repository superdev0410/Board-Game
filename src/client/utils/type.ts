export interface Game {
  id: string;
  name: string;
  currentPlayer: number;
  board: number[][];
  result: Boolean;
}

export interface GameName {
  id: string;
  name: string;
}