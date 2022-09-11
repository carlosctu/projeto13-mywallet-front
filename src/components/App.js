import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "../utils/globalStyles";
import FontStyles from "../utils/fontStyles";
import LoginPage from "../components/splash_page/login_page";
import React, { useState } from "react";
import RegisterPage from "../components/splash_page/register_page";
import HomePage from "./home_page";
import IncomePage from "./income_page";
import OutcomePage from "./outcome_page";
import ProtectedRoute from "../utils/routes/protected_route";
import { UserContext } from "../utils/providers/userContext";

export default function App() {
  const [name, setName] = useState();
  return (
    <BrowserRouter>
      <FontStyles />
      <GlobalStyle />
      <UserContext.Provider
        value={{
          name: name,
          setName: setName,
        }}
      >
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
      </UserContext.Provider>
    </BrowserRouter>
  );
}
//<Route path="/register" element={<RegisterPage />} />
