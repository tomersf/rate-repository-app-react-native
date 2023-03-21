import { Formik } from "formik";
import { View, Pressable, Text, StyleSheet } from "react-native";
import * as yup from "yup";
import { ApolloError } from "@apollo/client";
import { useState } from "react";

import useAuth from "../hooks/useAuth";
import theme from "../theme/theme";
import FormikTextInput from "./FormikTextInput";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
  },
  item: {
    borderWidth: 2,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    marginHorizontal: 8,
    marginVertical: 10,
    padding: 6,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    margin: 6,
    marginHorizontal: 8,
    marginVertical: 10,
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: theme.colors.secondary,
    textAlign: "center",
    fontSize: theme.fontSizes.subheading,
  },
  error: {
    color: theme.colors.error,
    fontSize: theme.fontSizes.subheading,
    textAlign: "center",
  },
});

const initialValues = {
  username: "",
  password: "",
};

interface FormikValues {
  username: string;
  password: string;
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, "Username must be at least 2 chars")
    .max(15, "Username can be up to 15 chars")
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 chars")
    .max(15, "Password can be up to 15 chars")
    .required("Password is required"),
});

const SignInForm = ({
  onSubmit,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        style={styles.item}
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry
        style={styles.item}
      />
      <Pressable
        onPress={(e) =>
          onSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
        }
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const navigate = useNavigate();
  const [, , login] = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  let timer: undefined | NodeJS.Timeout = undefined;

  const onSubmit = async (values: FormikValues) => {
    const { username, password } = values;
    try {
      const accessToken = await login({ username, password });
      if (accessToken) navigate("/");
    } catch (e) {
      if (e instanceof ApolloError) {
        if (e.message === errorMessage) return;
        setErrorMessage(e.message);
        clearTimeout(timer);
        timer = setTimeout(() => {
          setErrorMessage("");
        }, 1000);
      }
    }
  };

  return (
    <>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </>
  );
};

export default SignIn;
