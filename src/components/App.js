import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "../utils/globalStyles";
import LoginPage from "../components/splash_page/login_page";
import React from "react";
import RegisterPage from "../components/splash_page/register_page";
import IncomePage from "./transactions_page/income_page";
import OutcomePage from "./transactions_page/outcome_page";
import ProtectedRoute from "../utils/routes/protected_route";
import HomePage from "./home_page/home_page";
import PublicRoute from "../utils/routes/public_route";

export default function App() {
  return (
    <BrowserRouter>
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
        <Route
          path="/home"
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          }
        />
        <Route
          path="/income"
          element={
            <PublicRoute>
              <IncomePage />
            </PublicRoute>
          }
        />
        <Route
          path="/outcome"
          element={
            <PublicRoute>
              <OutcomePage />
            </PublicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
