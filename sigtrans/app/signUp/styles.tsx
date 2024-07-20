import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #1f2074;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

export const ErrorText = styled.Text`
  color: red;
`;

export const SignUpContainer = styled.View`
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const SignUpText = styled.Text`
  color: white; /* Ajuste a cor conforme necessário */
`;

export const SignUpClickText = styled.Text`
  color: gray;
`;
