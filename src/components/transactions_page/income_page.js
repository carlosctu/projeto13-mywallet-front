import { ArrowBackCircleOutline } from "react-ionicons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { newTransactionIncome } from "../../services/api";
import { ThreeDots } from "react-loader-spinner";
import { Wrapper, Header, Form, TextInput, Button } from "./styles";

export default function IncomePage() {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [incomeInfo, setIncome] = useState({
    description: "",
    value: "",
  });
  function handleSubmit(event) {
    setDisable(true);
    newTransactionIncome(incomeInfo)
      .then(() => {
        setIncome({ description: "", value: "" });
        setDisable(false);
        alert("Entrada cadastrada com sucesso!");
      })
      .catch((err) => {
        setDisable(false);
        console.log(err);
      });
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
          type="number"
          value={incomeInfo.value}
          placeholder="Valor"
          disabled={disable}
          required
        ></TextInput>
        <TextInput
          onChange={handleForm}
          name="description"
          type="text"
          value={incomeInfo.description}
          placeholder="Descrição"
          disabled={disable}
          required
        ></TextInput>
        <Button>
          {disable ? (
            <ThreeDots color="#ffffff" height={65} width={80} />
          ) : (
            "Salvar entrada"
          )}
        </Button>
      </Form>
    </Wrapper>
  );
}
