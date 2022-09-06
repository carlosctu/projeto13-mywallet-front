import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "../utils/globalStyles";
import FontStyles from "../utils/fontStyles";
import LoginPage from "./login_page";
import React from "react";
import RegisterPage from "./register_page";

export default function App() {
  return (
    <BrowserRouter>
      <FontStyles />
      <GlobalStyle />
      <Routes>
        <LoginPage />
        <RegisterPage />
      </Routes>
    </BrowserRouter>
  );
}
