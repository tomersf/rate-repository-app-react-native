import { StyleSheet, Text, TextInputProps } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
  },
});

type FormikTextInputProps = {
  name: string;
} & TextInputProps;

const FormikTextInput = ({ name, ...props }: FormikTextInputProps) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
