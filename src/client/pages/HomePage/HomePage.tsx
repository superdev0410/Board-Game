import { Button, Flex } from "@radix-ui/themes";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Flex className="flex-col gap-10 max-w-64 self-center justify-center h-full ">
      <Button size="4">
        <Link to="/game">New Game</Link>
      </Button>
      <Button size="4">
        <Link to="/gamelist">Saved Game</Link>
      </Button>
    </Flex>
  )
}

export default HomePage;
