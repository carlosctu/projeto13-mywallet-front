import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "../utils/globalStyles";
import FontStyles from "../utils/fontStyles";
import LoginPage from "../components/splash_page/login_page";
import React from "react";
import RegisterPage from "../components/splash_page/register_page";
import HomePage from "./home_page";
import IncomePage from "./income_page";
import OutcomePage from "./outcome_page";
import ProtectedRoute from "../utils/routes/protected_route";

export default function App() {
  return (
    <BrowserRouter>
      <FontStyles />
      <GlobalStyle />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route path="/home" element={<HomePage />} />
        <Route path="/income" element={<IncomePage />} />
        <Route path="/outcome" element={<OutcomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
//<Route path="/register" element={<RegisterPage />} />
