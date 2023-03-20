import {
  TextInput as NativeTextInput,
  StyleSheet,
  TextInputProps as NativeTextInputProps,
} from "react-native";
import theme from "../theme/theme";

const styles = StyleSheet.create({
  error: {
    borderColor: theme.colors.error,
  },
});

type TextInputProps = {
  error: string | false | undefined;
} & NativeTextInputProps;

const TextInput = ({ style, error, ...props }: TextInputProps) => {
  let textInputStyle = [style];
  if (error) {
    textInputStyle = [style, styles.error];
  }

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
