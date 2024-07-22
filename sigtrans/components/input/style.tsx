import styled from "styled-components/native";
import { TextInputProps } from "react-native";

export const InputContainer = styled.View`
  gap: 5px;
  width: 80%;
`;
export const InputTitle = styled.Text`
  color: lightgray;
`;
interface StyledInputProps extends TextInputProps {
  disabled?: boolean;
}
export const Input = styled.TextInput<StyledInputProps>`
  background-color: ${({ editable }) => (editable ? "white" : "gray")};
  color: ${({ editable }) => (editable ? "black" : "white")};
  font-family: "RobotoCondensed_400Regular";
  padding: 10px;
  border-radius: 7px;
  font-size: 16px;
  height: 40px;
`;
