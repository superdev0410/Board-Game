import { Game, GameName } from "@/server/models/game"

let games: Record<string, Game> = {};

export const getAllGames = (): GameName[] => {
  return Object.keys(games).map((id) => ({ id: id, name: games[id].name }));
}

export const getGame = (id: string): Game => {
  return games[id];
}

export const updateGame = (game: Game) => {
  games[game.id] = game;
}