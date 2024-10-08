import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { GameDetails } from "./pages/GameDetails";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Cart } from "./pages/Cart";
import { Dashboard } from "./pages/Dashboard";
import LayoutWithHeader from "./components/LayoutWithHeader";
import { AuthProvider } from "./auth/AuthProvider";
import { MyAccount } from "./pages/MyAccount";
import { VerifyEmail } from "./pages/VerifyEmail";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ReserParrwors";


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
            <Route path="/me" element={<MyAccount />} />
          </Route>
          <Route path="/auth/verify/:token" element={<VerifyEmail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
