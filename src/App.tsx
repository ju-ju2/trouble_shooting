import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import "./scss/main.scss";
import GlobalContext from "context/GlobalContext";

function App() {
  return (
    <BrowserRouter>
      <GlobalContext>
        <Router />
      </GlobalContext>
    </BrowserRouter>
  );
}

export default App;
