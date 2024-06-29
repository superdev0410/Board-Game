import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Flex, Table, Heading, Button, Container, Box } from "@radix-ui/themes";
import { v4 as uuid } from "uuid";

import { Game } from "@/client/utils/type";
import { getGame } from "@/client/utils/api";
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

  const fetchData = useCallback(async (id: string) => {
    try {
      const data = await getGame(id);
      setGame(data);
    } catch (error) {
      toast.error(error?.toString());
      console.error(error);
    }
  }, []);

  const newGame = useCallback(() => {
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
  }, []);

  useEffect(() => {
    if (id) {
      fetchData(id);
    } else {
      newGame();
    }
  }, [id]);

  return (
    <Container size="2" className="h-screen flex flex-col justify-center">
      <Flex className="flex-col gap-3 items-center">
        <Flex className="w-full justify-evenly items-center">
          <Heading>Current Player: {game.currentPlayer}</Heading>
          <Button size="2">Save</Button>
        </Flex>

        <Table.Root className="w-fit border-collapse">
          <Table.Body>
            {
              game.board.map((row, rowIndex) => (
                <Table.Row key={rowIndex}>
                  {
                    row.map((col, colIndex) => (
                      <Table.Cell
                        key={colIndex}
                        className="border-2"
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
    </Container>
  )
}

export default GamePage;
