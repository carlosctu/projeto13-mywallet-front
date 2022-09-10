import styled from "styled-components";
import { theme } from "../utils/theme";
import { useNavigate } from "react-router-dom";
import {
  LogInOutline,
  AddCircleOutline,
  RemoveCircleOutline,
} from "react-ionicons";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Header>
        <span>Olá, Fulano</span>
        <LogInOutline
          color="#FFFFFF"
          title="logoff"
          height="30px"
          width="28px"
          onClick={() => {
            localStorage.removeItem("auth");
            navigate("/");
          }}
        />
      </Header>
      <Transactions>
        <span>Não há registros de entrada ou saída</span>
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
  align-items: center;
  justify-content: center;
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
