import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (!auth) return <Navigate to="/" />;
  return children;
}
