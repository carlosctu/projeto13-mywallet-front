import styled from "styled-components";
import { theme } from "../utils/theme";
import { ArrowBackCircleOutline } from "react-ionicons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { newTransactionIncome } from "../services/api";

export default function IncomePage() {
  const navigate = useNavigate();
  const [incomeInfo, setIncome] = useState({
    description: "",
    value: 0,
  });
  function handleSubmit(event) {
    newTransactionIncome(incomeInfo)
      .then(() => {
        alert("Entrada cadastrada com sucesso!");
      })
      .catch((err) => console.log(err));
    event.preventDefault();
  }
  function handleForm(event) {
    setIncome((income) => ({
      ...income,
      [event.target.name]: event.target.value,
    }));
  }
  return (
    <Wrapper>
      <Header>
        <span>Nova entrada</span>

        <ArrowBackCircleOutline
          color="#FFFFFF"
          title="back"
          height="26px"
          width="26px"
          onClick={() => {
            navigate("/home");
          }}
        />
      </Header>
      <Form onSubmit={handleSubmit}>
        <TextInput
          onChange={handleForm}
          name="value"
          placeholder="Valor"
          required
        ></TextInput>
        <TextInput
          onChange={handleForm}
          name="description"
          placeholder="Descrição"
          required
        ></TextInput>
        <Button>Salvar entrada</Button>
      </Form>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  background-color: ${theme.background};
  color: ${theme.text};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 25px;
  width: 100vw;
  height: 100vh;
`;
const Header = styled.div`
  font-family: "Raleway", sans-serif;
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 26px;
  font-weight: 400;
  line-height: 50.37px;
  margin-bottom: 24px;
  svg {
    display: flex;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const TextInput = styled.input`
  width: 326px;
  height: 58px;
  color: #000000;
  border: none;
  border-radius: 5px;
  margin-bottom: 25px;
  font-size: 20px;
  font-weight: 400;
  line-height: 23.48px;
  margin-bottom: 13px;
  padding-left: 15px;
`;
const Button = styled.button`
  width: 326px;
  height: 46px;
  background-color: #a328d6;
  border: none;
  border-radius: 5px;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  line-height: 23.48px;
`;
