import { View, StyleSheet, Pressable, Text, ScrollView } from "react-native";
import Constants from "expo-constants";

import theme from "../theme/theme";
import { Link } from "react-router-native";
import React from "react";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    flexDirection: "row",
  },
  item: {
    color: theme.colors.secondary,
    padding: 15,
    fontSize: theme.fontSizes.title,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.item}>Repositories</Text>
        </Link>
        <Link to="/sign">
          <Text style={styles.item}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
