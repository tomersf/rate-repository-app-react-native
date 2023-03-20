import { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import config from "../config/config";
import repos, { RepoItem, RepoResponse } from "../repos";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [repositories, setRepositories] = useState<RepoItem[]>([]);

  const fetchRepositories = async () => {
    const response = await fetch(`http://192.168.1.18:5001/api/repositories`);
    const json: RepoResponse = await response.json();
    const repos: RepoItem[] = json.edges.map((repo) => repo.node);
    setRepositories(repos);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item, index }) => (
        <RepositoryItem key={index} item={item} />
      )}
    />
  );
};

export default RepositoryList;
