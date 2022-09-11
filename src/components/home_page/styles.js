import styled from "styled-components";
import { theme } from "../../utils/theme";

export const Wrapper = styled.div`
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
export const Header = styled.div`
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
export const Transactions = styled.div`
  width: 100%;
  height: 70%;
  padding-bottom: 20px;
  margin-bottom: 26px;
  background-color: #ffffff;
  color: #868686;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: scroll;
  span {
    width: 180px;
    height: 46px;
    text-align: center;
    font-size: 18px;
    line-height: 23.48px;
    font-weight: 300;
  }
`;
export const TransactionsButtons = styled.div`
  width: 100%;
  height: 114px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 15px;
`;
export const Button = styled.div`
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
export const DisplayUserTransactions = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  overflow: scroll;
  flex-direction: column;
  align-items: flex-start;
  padding: 23px;
`;
export const Transaction = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const TransactionInformation = styled.div`
  display: flex;
  column-gap: 15px;
`;
export const Date = styled.div`
  color: #c6c6c6;
`;
export const Description = styled.div`
  color: #000000;
`;
export const TransactionValue = styled.div`
  margin-left: 40px;
  color: ${(props) => props.color};
`;
export const Balance = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  z-index: 1;
  position: absolute;
  background-color: #7858a6;
  padding: 0 25px 0 25px;
  bottom: 0;
  left: 0;
  color: #ffffff;
  font-size: 22px;
`;
export const CurrentBalance = styled.p`
  color: #03ac00;
  font-size: 22px;
`;
