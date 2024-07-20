import React, { useState } from "react";
import { Button, Pressable, View } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/input";
import * as S from "./styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

const validationSchema = Yup.object({
  name: Yup.string().required("Nome é obrigatorio"),
  agent: Yup.string(),
  status: Yup.string().required("Status é obrigatorio"),
});

const createATI = () => {
  const [date, setDate] = useState<string>(dayjs().format("DD/MM/YYYY"));
  const [show, setShow] = useState(false);

  const onChangeDate = (selectedDate: any) => {
    setShow(false);
    setDate(dayjs(selectedDate.nativeEvent.timestamp).format("DD/MM/YYYY"));
    if (selectedDate) {
      formik.setFieldValue(
        "date",
        dayjs(selectedDate.nativeEvent.timestamp).format("DD/MM/YYYY")
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      agent: "teste",
      status: "Em andamento",
      date: date,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form data", values);
    },
  });

  return (
    <S.Container>
      <S.InputContainer>
        <Input
          onChangeText={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          value={formik.values.name}
          name="Nome do condutor"
          placeholder="Digite o Nome do condutor"
        />
        {formik.touched.name && formik.errors.name ? (
          <S.ErrorText>{formik.errors.name}</S.ErrorText>
        ) : null}
      </S.InputContainer>
      <S.DatepickperButton onPress={() => setShow(true)}>
        <Input
          onChangeText={formik.handleChange("date")}
          value={date}
          name="Data de emissão"
          editable={true}
        />
      </S.DatepickperButton>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(1598051730000)}
          mode={"date"}
          onChange={onChangeDate}
        />
      )}
      <Input
        onChangeText={formik.handleChange("agent")}
        onBlur={formik.handleBlur("agent")}
        value={formik.values.agent}
        name="Nome do agente"
        editable={false}
      />
      <Input
        onChangeText={formik.handleChange("status")}
        onBlur={formik.handleBlur("status")}
        value={formik.values.status}
        name="Status"
      />

      <Button onPress={() => formik.handleSubmit()} title="Submit" />
    </S.Container>
  );
};

export default createATI;
