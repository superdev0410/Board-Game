import { Button, Flex } from "@radix-ui/themes"

const HomePage = () => {
  return (
    <Flex className="flex-col gap-10 justify-center items-center w-screen h-screen">
      <Button size="4">New Game</Button>
      <Button size="4">Saved Game</Button>
    </Flex>
  )
}

export default HomePage;
