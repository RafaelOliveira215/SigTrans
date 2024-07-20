import { Button, Pressable, Text } from "react-native";
import * as S from "./styles";
import * as Yup from "yup";
import { useFormik } from "formik";
import Input from "@/components/input";
import { Link, useRouter } from "expo-router";
import Realm from "realm";
import { useApp } from "@realm/react";

const validationSchema = Yup.object({
  login: Yup.string().required("Login é obrigatorio"),
  password: Yup.string().required("Senha é obrigatorio"),
});

const SignUpScreen = () => {
  const app = useApp();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  const handleSignUp = async (values: { login: string; password: string }) => {
    try {
      await app.emailPasswordAuth
        .registerUser({
          email: values.login,
          password: values.password,
        })
        .then(() => router.push("/details"));
    } catch (error) {
      console.log(error);
    }
  };
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

export default SignUpScreen;
