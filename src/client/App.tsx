import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { HomePage, GamePage } from "@/client/pages";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/game/:id" element={<GamePage />} />
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
