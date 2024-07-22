import { Button, Pressable, Text } from "react-native";
import * as S from "./styles";
import * as Yup from "yup";
import { useFormik } from "formik";
import Input from "@/components/input";
import { Link, useRouter } from "expo-router";
import { useApp } from "@realm/react";
import Realm from "realm";

const validationSchema = Yup.object({
  login: Yup.string().required("Login é obrigatorio"),
  password: Yup.string().required("Senha é obrigatorio"),
});

const LoginScreen = () => {
  const app = useApp();
  const router = useRouter();

  const handleSignUp = async (values: { login: string; password: string }) => {
    const credentials = Realm.Credentials.emailPassword({
      email: values.login,
      password: values.password,
    });

    try {
      console.log("teste");
      await app.logIn(credentials);
      console.log("teste2");
      router.push("/(tabs)");
    } catch (error) {
      console.log(error);
    }
  };

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
        <S.SignUpText>Não tem uma conta?</S.SignUpText>
        <Link href="/signUp">
          <S.SignUpClickText>Registre-se</S.SignUpClickText>
        </Link>
      </S.SignUpContainer>
    </S.Container>
  );
};

export default LoginScreen;
