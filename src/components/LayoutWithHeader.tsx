import { Outlet } from "react-router-dom";
import { Header } from "./navigation/Header";

const LayoutWithHeader = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default LayoutWithHeader;
