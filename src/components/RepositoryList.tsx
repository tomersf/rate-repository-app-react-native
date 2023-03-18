import { FlatList, View, StyleSheet } from "react-native";
import repos from "../repos";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  return (
    <FlatList
      data={repos}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item, index }) => (
        <RepositoryItem key={index} item={item} />
      )}
    />
  );
};

export default RepositoryList;
