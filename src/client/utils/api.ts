import axios from "axios";

import { Game } from "@/client/utils/type";

export const getGame = async (id: string): Promise<Game> => {
  const res = await axios.get(`/api/games/${id}`);
  return res.data;
}