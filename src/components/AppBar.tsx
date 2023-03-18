import { View, StyleSheet, Pressable, Text } from "react-native";
import Constants from "expo-constants";

import theme from "../theme/theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    marginBottom: 5,
  },
  repository: {
    color: theme.colors.secondary,
    padding: 15,
    fontSize: theme.fontSizes.title,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => {}}>
        <Text style={styles.repository}>Repositores</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
