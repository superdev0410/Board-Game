import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { Layout } from "@/client/components";
import { HomePage, GamePage, GameListPage } from "@/client/pages";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />  
            <Route path="game" element={<GamePage />} />
            <Route path="gamelist" element={<GameListPage />} />
            <Route path="game/:id" element={<GamePage />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer
        newestOnTop
        closeOnClick
        autoClose={1000}
        position="top-center"
        transition={Bounce}
      />
    </>
  );
};

export default App;
