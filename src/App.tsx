import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { GameDetails } from "./pages/GameDetails";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Cart } from "./pages/Cart";
import { Dashboard } from "./pages/Dashboard";
import LayoutWithHeader from "./components/LayoutWithHeader";
import { AuthProvider } from "./auth/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<LayoutWithHeader />}>
            <Route path="/" element={<Home />} />
            <Route path="game/:id" element={<GameDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
