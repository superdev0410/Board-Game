import { useState, useEffect } from "react";
import { Table, Flex, Button, Heading } from "@radix-ui/themes";
import { Link } from "react-router-dom";

import { getGameNames } from "@/client/utils/api";
import { GameName } from "@/client/utils/type";

const GameListPage = () => {
  const [names, setNames] = useState<GameName[]>([]);

  const fetchData = async () => {
    const data = await getGameNames();
    setNames(data);
  }

  useEffect(() => {
    fetchData();    
  }, []);
  return (
    <Flex className="flex-col w-80 self-center gap-6">
      <Button className="self-end"><Link to="/">Back</Link></Button>
      <Table.Root size="3">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className="text-center">
              <Heading>Saved Games</Heading>
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            names.map((name) => (
              <Table.Row key={name.id}>
                <Table.RowHeaderCell>
                  <Link to={`/game/${name.id}`}>{name.name}</Link>
                </Table.RowHeaderCell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table.Root>
    </Flex>
  )
}

export default GameListPage;
