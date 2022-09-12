import { ArrowBackCircleOutline } from "react-ionicons";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { newTransactionIncome } from "../../services/api";
import { ThreeDots } from "react-loader-spinner";
import { Wrapper, Header, Form, TextInput, Button } from "./styles";
import { motion } from "framer-motion";
import SnackBar from "../snackbar/snackBar";

export default function IncomePage() {
  const snackBarRef = useRef();
  const SnackbarType = {
    success: "success",
    wrong: "wrong",
  };
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
        snackBarRef.current.show();
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
        <SnackBar
          ref={snackBarRef}
          message="Entrada cadastrada com sucesso!"
          type={SnackbarType.success}
        />
      </Wrapper>
    </motion.div>
  );
}
