import { Router, Response, Request } from "express";

import { getAllGames, getGame, updateGame } from "@/server/controllers/game";

const apiRouter = Router();

apiRouter.get("/games", async (_: Request, res: Response) => {
  try {
    res.json(getAllGames());
  } catch (error) {
    res.status(500).send(error?.toString());
    console.error(error);
  }
});

apiRouter.get("/games/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    res.json(getGame(id));
  } catch (error) {
    res.status(500).send(error?.toString());
    console.error(error);
  }
});

apiRouter.post("/games", async (req : Request, res: Response) => {
  try {
    const game = req.body;
    updateGame(game);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error?.toString());
  }  
});

export default apiRouter;
