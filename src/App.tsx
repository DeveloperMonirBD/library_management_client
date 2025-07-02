import { Outlet } from "react-router";
import Navbar from "./components/Layout/Navbar";

function App() {

  return (
      <>
      <Navbar />
      <Outlet />
      </>
  );
}

export default App
