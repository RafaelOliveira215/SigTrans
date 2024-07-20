import * as S from "./style";
import { TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  placeholder?: string;
  name: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  onChangeText,
  onBlur,
  value,
  placeholder,
  name,
  editable = true,
}) => {
  return (
    <S.InputContainer>
      <S.InputTitle>{name}</S.InputTitle>
      <S.Input
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        editable={editable}
      />
    </S.InputContainer>
  );
};

export default Input;
