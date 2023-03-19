import {
  TextInput as NativeTextInput,
  StyleSheet,
  TextInputProps as NativeTextInputProps,
} from "react-native";

const styles = StyleSheet.create({});

type TextInputProps = {
  error: string | false | undefined;
} & NativeTextInputProps;

const TextInput = ({ style, error, ...props }: TextInputProps) => {
  const textInputStyle = [style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
