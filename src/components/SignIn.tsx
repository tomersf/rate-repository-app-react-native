import { Formik } from "formik";
import { View, Pressable, Text, StyleSheet } from "react-native";
import theme from "../theme/theme";
import FormikTextInput from "./FormikTextInput";

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
});

const initialValues = {
  username: "",
  password: "",
};

interface FormikValues {
  username: string;
  password: string;
}

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
  const onSubmit = (values: FormikValues) => {
    console.log(values);
  };

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
