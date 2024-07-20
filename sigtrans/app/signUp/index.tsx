import { Button, Pressable, Text } from "react-native";
import * as S from "./styles";
import * as Yup from "yup";
import { useFormik } from "formik";
import Input from "@/components/input";
import { Link } from "expo-router";

const validationSchema = Yup.object({
  login: Yup.string().required("Login é obrigatorio"),
  password: Yup.string().required("Senha é obrigatorio"),
});

const LoginScreen = () => {
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form data", values);
    },
  });
  return (
    <S.Container>
      <Input
        onChangeText={formik.handleChange("login")}
        onBlur={formik.handleBlur("login")}
        value={formik.values.login}
        name="Login"
        placeholder="Digite seu login"
      />
      {formik.touched.login && formik.errors.login ? (
        <S.ErrorText>{formik.errors.login}</S.ErrorText>
      ) : null}

      <Input
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        value={formik.values.password}
        name="Senha"
        placeholder="Digite sua senha"
      />
      {formik.touched.password && formik.errors.password ? (
        <S.ErrorText>{formik.errors.password}</S.ErrorText>
      ) : null}
      <Button onPress={() => formik.handleSubmit()} title="Submit" />
      <S.SignUpContainer>
        <S.SignUpText>Já tem uma conta?</S.SignUpText>
        <Link href="/">
          <S.SignUpClickText>Login</S.SignUpClickText>
        </Link>
      </S.SignUpContainer>
    </S.Container>
  );
};

export default LoginScreen;
