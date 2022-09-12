import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUp } from "../../services/api";
import { Wrapper, Header, Form, TextInput, Button, StyledLink } from "./styles";
import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
    </motion.div>
  );
}
