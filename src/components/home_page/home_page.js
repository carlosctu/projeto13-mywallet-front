import { useNavigate } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import { getTransactions, removeSession } from "../../services/api";
import { useEffect, useState } from "react";
import {
  LogInOutline,
  AddCircleOutline,
  RemoveCircleOutline,
} from "react-ionicons";
import {
  Wrapper,
  Header,
  Transaction,
  Transactions,
  TransactionsButtons,
  DisplayUserTransactions,
  TransactionInformation,
  Date,
  Description,
  TransactionValue,
  Balance,
  CurrentBalance,
  Button,
} from "./styles";

var formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function HomePage() {
  const [transactions, setTransactions] = useState([]);
  const [userBalance, setBalance] = useState(0);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    setName(auth.name);
    getTransactions()
      .then((response) => {
        const UserTransactions = response.data;
        setTransactions(UserTransactions);
        if (UserTransactions !== 0) {
          UserTransactions.map((transaction) => {
            return transaction.type === "income"
              ? setBalance(
                  (balanace) => (balanace += parseFloat(transaction.value))
                )
              : setBalance(
                  (balanace) => (balanace -= parseFloat(transaction.value))
                );
          });
        }
      })
      .catch((err) => console.log(err));
  }, []);
  function handleLogout() {
    removeSession()
      .then(() => {
        localStorage.removeItem("auth");
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <Wrapper>
      <Header>
        <span>{`Olá, ${name}`}</span>
        <LogInOutline
          color="#FFFFFF"
          title="logoff"
          height="30px"
          width="28px"
          onClick={handleLogout}
        />
      </Header>
      <Transactions>
        {transactions ? (
          <UserTransactions transactions={transactions} />
        ) : (
          <MutatingDots height={80} width={80} />
        )}
        <Balance>
          <p>Saldo</p>
          <CurrentBalance>{formatter.format(userBalance)}</CurrentBalance>
        </Balance>
      </Transactions>
      <TransactionsButtons>
        <Button
          onClick={() => {
            navigate("/income");
          }}
        >
          <AddCircleOutline
            color="#FFFFFF"
            title="income"
            height="30px"
            width="30px"
          />
          <div>Nova entrada</div>
        </Button>
        <Button
          onClick={() => {
            navigate("/outcome");
          }}
        >
          <RemoveCircleOutline
            color="#FFFFFF"
            title="income"
            height="30px"
            width="30px"
          />
          <div>Nova saída</div>
        </Button>
      </TransactionsButtons>
    </Wrapper>
  );
}

function UserTransactions({ transactions }) {
  return (
    <>
      {transactions.length > 0 ? (
        <DisplayUserTransactions>
          {transactions.map((transaction, index) => {
            return (
              <Transaction key={index}>
                <TransactionInformation>
                  <Date>{transaction.date}</Date>
                  <Description>{transaction.description}</Description>
                </TransactionInformation>
                <TransactionValue
                  color={transaction.type === "income" ? "#03AC00" : "#C70000"}
                >
                  {formatter.format(transaction.value)}
                </TransactionValue>
              </Transaction>
            );
          })}
        </DisplayUserTransactions>
      ) : (
        <span>Não há registros de entrada ou saída</span>
      )}
    </>
  );
}
