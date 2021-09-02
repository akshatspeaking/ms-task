import logo from "./logo.svg";
import "./App.css";
import ViewUsers from "./components/ViewUsers";
import { useState } from "react";
import AddUser from "./components/AddUser";

function App() {
  const [activeScreen, setActiveScreen] = useState("list");

  function toggleScreen() {
    activeScreen === "list" ? setActiveScreen("form") : setActiveScreen("list");
  }

  return activeScreen === "list" ? (
    <ViewUsers toggleScreen={(toggleScreen, activeScreen)} />
  ) : (
    <AddUser toggleScreen={toggleScreen} />
  );
}

export default App;
