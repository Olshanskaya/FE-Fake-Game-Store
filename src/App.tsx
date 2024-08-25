import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { GameDetails } from "./pages/GameDetails";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="game/:id" element={<GameDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
