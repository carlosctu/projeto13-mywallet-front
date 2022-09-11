import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signIn } from "../../services/api";
import { ThreeDots } from "react-loader-spinner";
import { Wrapper, Header, Form, TextInput, Button, StyledLink } from "./styles";

export default function LoginPage() {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [userLogon, setLogon] = useState({
    email: "",
    password: "",
  });

  function handleForm(event) {
    setLogon((info) => ({ ...info, [event.target.name]: event.target.value }));
  }
  function handleSubmit(event) {
    setDisable(true);
    signIn(userLogon)
      .then((response) => {
        const userAuth = JSON.stringify({
          token: response.data.token,
          name: response.data.name,
        });
        localStorage.setItem("auth", userAuth);
        setDisable(false);
        navigate("/home");
      })
      .catch((err) => {
        const error = err.response.status;
        setDisable(false);
        error === 401
          ? alert("Usuário ou senha inválida!")
          : alert("Usuário inexistente");
      });
    event.preventDefault();
  }

  return (
    <Wrapper>
      <Header>MyWallet</Header>
      <Form onSubmit={handleSubmit}>
        <TextInput
          onChange={handleForm}
          placeholder="E-mail"
          name="email"
          type="email"
          disabled={disable}
          required
        ></TextInput>
        <TextInput
          onChange={handleForm}
          placeholder="Senha"
          name="password"
          type="password"
          disabled={disable}
          required
        ></TextInput>
        <Button>
          {disable ? (
            <ThreeDots color="#ffffff" height={65} width={80} />
          ) : (
            "Entrar"
          )}
        </Button>
      </Form>
      <StyledLink to="/register">Primeira vez? Cadastre-se!</StyledLink>
    </Wrapper>
  );
}
