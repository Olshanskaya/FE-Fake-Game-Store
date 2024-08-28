import { logIn } from "@/api/auth";
import { LoggedInUser, User } from "@/types/user";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type UserContextType = {
  user: User | null;
  token: string | null;
  logInUser: (email: string, password: string) => void;
  logOut: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (user && token) {
      setToken(token);
      setUser(JSON.parse(user));
    }
    setIsReady(true);
  }, []);

  const logInUser = async (email: string, password: string) => {
    await logIn({ email, password })
      .then((res) => {
        localStorage.setItem("token", res.data?.token || "");
        localStorage.setItem("user", JSON.stringify(res.data?.user));
        setToken(res.data?.token || "");
        setUser(res.data?.user || null);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ user, token, logInUser, logOut, isLoggedIn }}>
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
