import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage } from "@/client/pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
