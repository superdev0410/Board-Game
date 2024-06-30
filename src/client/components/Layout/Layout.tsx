import { Flex } from "@radix-ui/themes";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Flex className="flex-col w-screen h-screen p-5">
      <Outlet />
    </Flex>
  )
}

export default Layout;