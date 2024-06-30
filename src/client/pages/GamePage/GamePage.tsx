import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Flex, Table, Heading, Button, Box } from "@radix-ui/themes";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

import { Game } from "@/client/utils/type";
import { getGame, saveGame } from "@/client/utils/api";
import { checkWinningCondition } from "@/client/utils/helper";
import { SaveModal } from "@/client/components";
import "@/client/pages/GamePage/GamePage.style.css";

const GamePage = () => {
  const { id } = useParams();
  const [game, setGame] = useState<Game>({
    id: "",
    name: "",
    board: [[]],
    result: false,
    currentPlayer: 1
  });
  const [isSaving, setSaving] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const fetchData = async (id: string) => {
    try {
      const data = await getGame(id);
      setGame(data);
    } catch (error) {
      toast.error(error?.toString());
      console.error(error);
    }
  };

  const newGame = () => {
    const newBoard = new Array(10);
    for (let i = 0; i < 10; i++) {
      newBoard[i] = (new Array(10)).fill(0);
    }

    setGame({
      id: uuid(),
      name: "",
      currentPlayer: 1,
      result: false,
      board: newBoard
    });
  };

  const onClickCell = useCallback((row: number, col: number) => {
    setGame((prev) => {
      if (prev && prev.board[row][col] === 0 && !prev.result) {
        const updatedBoard = new Array(10);
        for (let i = 0; i < 10; i++) {
          updatedBoard[i] = [...prev.board[i]];
        }
        updatedBoard[row][col] = prev.currentPlayer;
        const result = checkWinningCondition(updatedBoard, prev.currentPlayer);
        if (result) {
          toast(`Player ${prev.currentPlayer} win!`)
        }
        return {
          ...prev,
          currentPlayer: result ? prev.currentPlayer : 3 - prev.currentPlayer,
          board: updatedBoard,
          result: result
        };
      }
      return prev;
    })
  }, []);

  const saveGameData = async (game: Game) => {
    try {
      setSaving(true);
      await saveGame(game);
      toast.success("Save game successfully");
    } catch (error) {
      toast.error(error?.toString());
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const onClickSave = useCallback(() => {
    if (game.name) {      
      saveGameData(game);
    } else {
      setOpen(true);
    }
  }, [game]);

  const onClickClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (id) {
      fetchData(id);
    } else {
      newGame();
    }
  }, [id]);

  return (
    <>
      <Flex className="flex-col gap-5 items-center h-full w-full">
        <Flex className="w-full justify-evenly">
          {
            game.name.length > 0 &&
            <Heading>Game: {game.name}</Heading>
          }
          <Heading>
            {game.result ? "Winner: " : "Player: "}
            {game.currentPlayer}
          </Heading>
          <Flex className="gap-5">
            {
              !(game.result && game.name) &&
              <Button size="2" loading={isSaving} onClick={onClickSave}>Save</Button>
            }
            <Button size="2"><Link to="/">Back</Link></Button>
          </Flex>
        </Flex>
  
        <Table.Root size="1" className="w-fit border-collapse">
          <Table.Body>
            {
              game.board.map((row, rowIndex) => (
                <Table.Row key={rowIndex}>
                  {
                    row.map((col, colIndex) => (
                      <Table.Cell
                        key={colIndex}
                        className="border-2"
                        onClick={() => onClickCell(rowIndex, colIndex)}
                      >
                        <Box className={`stone stone-${col}`} />
                      </Table.Cell>
                    ))
                  }
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table.Root>
      </Flex>

      <SaveModal isOpen={isOpen} game={game} onClose={onClickClose} />
    </>
  )
}

export default GamePage;
