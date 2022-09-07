import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "../utils/globalStyles";
import FontStyles from "../utils/fontStyles";
import LoginPage from "./login_page";
import React from "react";
import RegisterPage from "./register_page";
import HomePage from "./home_page";
import IncomePage from "./income_page";
import OutcomePage from "./outcome_page";

export default function App() {
  return (
    <BrowserRouter>
      <FontStyles />
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/income" element={<IncomePage />} />
        <Route path="/outcome" element={<OutcomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
