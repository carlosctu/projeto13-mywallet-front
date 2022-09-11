import styled from "styled-components";
import { theme } from "../../utils/theme";
import { Link } from "react-router-dom";
export const Wrapper = styled.div`
  background-color: ${theme.background};
  color: ${theme.text};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
export const Header = styled.div`
  font-family: "Saira Stencil One", cursive;
  width: 147px;
  height: 50px;
  font-size: 32px;
  font-weight: 400;
  line-height: 50.37px;
  margin-bottom: 24px;
`;
export const TextInput = styled.input`
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
export const Button = styled.button`
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
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  font-size: 15px;
  line-height: 17.61px;
  font-weight: 700;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
