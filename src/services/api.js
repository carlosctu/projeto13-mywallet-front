import axios from "axios";

const baseURL = "http://localhost:5000";

function createHeaders() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = {
    headers: { Authorization: `Bearer ${auth.token}` },
  };
  return config;
}

function signUp(body) {
  const promise = axios.post(`${baseURL}/auth/sign-uup`, body);
  return promise;
}
function signIn(body) {
  const promise = axios.post(`${baseURL}/auth/sign-in`, body);
  return promise;
}
function getTransactions() {
  const config = createHeaders();
  const promise = axios.get(`${baseURL}/transactions`, config);
  return promise;
}
function newTransactionIncome(body) {
  const config = createHeaders();
  const promise = axios.post(`${baseURL}/transactions/incomes`, body, config);
  return promise;
}
function newTransactionOutcome(body) {
  const config = createHeaders();
  const promise = axios.post(`${baseURL}/transactions/outcomes`, body, config);
  return promise;
}
function removeSession() {
  const config = createHeaders();
  const promise = axios.delete(`${baseURL}/session/log-out`, config);
  return promise;
}
export {
  signUp,
  signIn,
  getTransactions,
  newTransactionIncome,
  newTransactionOutcome,
  removeSession,
};
