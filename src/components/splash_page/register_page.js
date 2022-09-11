import styled from "styled-components";
import { theme } from "../../utils/theme";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { signUp } from "../../services/api";
export default function RegisterPage() {
  const navigate = useNavigate();
  const [registerInfo, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  function handleForm(event) {
    setInfo((userInfo) => ({
      ...userInfo,
      [event.target.name]: event.target.value,
    }));
  }
  function handleSubmit(event) {
    const samePassword = registerInfo.password === registerInfo.confirmPassword;
    if (!samePassword) {
      event.preventDefault();
      return alert("Senhas não coincidem!");
    }
    const { name, email, password } = registerInfo;
    const userInfo = { name, email, password };
    signUp(userInfo)
      .then(() => {
        alert("Usuário cadastrado com sucesso!");
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 409) {
          alert("Usuário já cadastrado!");
        }
      });
    event.preventDefault();
  }
  return (
    <Wrapper>
      <Header>MyWallet</Header>
      <Form onSubmit={handleSubmit}>
        <TextInput
          onChange={handleForm}
          placeholder="Nome"
          name="name"
          type="name"
          required
        ></TextInput>
        <TextInput
          onChange={handleForm}
          placeholder="E-mail"
          name="email"
          type="email"
          required
        ></TextInput>
        <TextInput
          onChange={handleForm}
          placeholder="Senha"
          name="password"
          type="password"
          required
        ></TextInput>
        <TextInput
          onChange={handleForm}
          placeholder="Confirme sua senha"
          name="confirmPassword"
          type="password"
          required
        ></TextInput>
        <Button>Cadastrar</Button>
      </Form>
      <StyledLink to="/">Já tem uma conta? Entre agora!</StyledLink>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${theme.background};
  color: ${theme.text};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
const Header = styled.div`
  font-family: "Raleway", sans-serif;
  width: 147px;
  height: 50px;
  font-size: 32px;
  font-weight: 400;
  line-height: 50.37px;
  margin-bottom: 24px;
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
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  font-size: 15px;
  line-height: 17.61px;
  font-weight: 700;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
