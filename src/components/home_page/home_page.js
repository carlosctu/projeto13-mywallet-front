import { useNavigate } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import {
  deleteTransaction,
  getTransactions,
  removeSession,
} from "../../services/api";
import { useEffect, useRef, useState } from "react";
import {
  LogInOutline,
  AddCircleOutline,
  CloseOutline,
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
import { motion } from "framer-motion";
import SnackBar from "../snackbar/snackBar";

var formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function HomePage() {
  const [transactions, setTransactions] = useState([]);
  const [userBalance, setBalance] = useState(0);
  const [render, setRender] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    setName(auth.name);
    setBalance(0);
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
  }, [render]);
  function handleLogout() {
    removeSession()
      .then(() => {
        localStorage.removeItem("auth");
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
    >
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
            <UserTransactions
              setBalance={setBalance}
              setRender={setRender}
              transactions={transactions}
            />
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
    </motion.div>
  );
}

function UserTransactions({ setBalance, setRender, transactions }) {
  const snackBarRef = useRef();
  const SnackbarType = {
    success: "success",
    wrong: "wrong",
  };
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
                  <p>{formatter.format(transaction.value)}</p>
                  <CloseOutline
                    onClick={() => {
                      //const confirm = window.confirm(
                      //`Deseja deletar a transação ${transaction.description}?`
                      //);
                      //if (confirm) {
                      deleteTransaction(transaction._id)
                        .then(() => {
                          snackBarRef.current.show();
                          setBalance(0);
                          setRender((oldValue) => !oldValue);
                        })
                        .catch((err) => console.log(err));
                      //  }
                    }}
                    color={"#00000"}
                    height="20px"
                    width="20px"
                  />
                </TransactionValue>
              </Transaction>
            );
          })}
        </DisplayUserTransactions>
      ) : (
        <span>Não há registros de entrada ou saída</span>
      )}
      <SnackBar
        ref={snackBarRef}
        message="Transação deletada com sucesso!"
        type={SnackbarType.wrong}
      />
    </>
  );
}
