import styled from "styled-components";
import { theme } from "../utils/theme";
import { useNavigate } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import {
  LogInOutline,
  AddCircleOutline,
  RemoveCircleOutline,
} from "react-ionicons";
import { getTransactions, removeSession } from "../services/api";
import { useEffect, useState } from "react";

var formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function HomePage() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    getTransactions()
      .then((response) => {
        const UserTransactions = response.data;
        setTransactions(UserTransactions);
        if (UserTransactions !== 0) {
          UserTransactions.map((transaction) => {
            return transaction.type === "income"
              ? setBalance(
                  (userBalance) =>
                    (userBalance += parseFloat(transaction.value))
                )
              : setBalance(
                  (userBalance) =>
                    (userBalance -= parseFloat(transaction.value))
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
        <span>Olá, Fulano</span>
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
          <p>{formatter.format(balance)}</p>
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

const Wrapper = styled.div`
  background-color: ${theme.background};
  padding: 25px;
  color: ${theme.text};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
const Header = styled.div`
  font-family: "Raleway", sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 32px;
  font-weight: 400;
  line-height: 50.37px;
  margin-bottom: 24px;
  span {
    font-size: 25px;
    line-height: 28.52px;
    font-weight: 700;
  }
  svg {
    display: flex;
  }
`;
const Transactions = styled.div`
  width: 100%;
  height: 70%;
  margin-bottom: 26px;
  background-color: #ffffff;
  color: #868686;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  span {
    width: 180px;
    height: 46px;
    text-align: center;
    font-size: 18px;
    line-height: 23.48px;
    font-weight: 300;
  }
`;
const TransactionsButtons = styled.div`
  width: 100%;
  height: 114px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 15px;
`;
const Button = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: #a328d6;
  border: none;
  border-radius: 5px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  line-height: 23.48px;
  cursor: pointer;
  div {
    width: 64px;
    height: 40px;
    font-size: 17px;
    line-height: 20px;
  }
`;
const DisplayUserTransactions = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 23px;
`;
const Transaction = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const TransactionInformation = styled.div`
  display: flex;
  column-gap: 15px;
`;
const Date = styled.div`
  color: #c6c6c6;
`;
const Description = styled.div`
  color: #000000;
`;
const TransactionValue = styled.div`
  margin-left: 40px;
  color: ${(props) => props.color};
`;
const Balance = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  z-index: 1;
  position: absolute;
  background-color: #a328d6;
  padding: 0 25px 0 25px;
  bottom: 0;
  left: 0;
  color: #000000;
  font-size: 22px;
`;
