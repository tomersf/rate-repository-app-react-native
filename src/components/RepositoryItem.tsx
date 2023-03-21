import { RepoItem } from "../interfaces/repos";
import { Text, StyleSheet, View, Image } from "react-native";

import theme from "../theme/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
  },
  details: {
    flexDirection: "row",
    marginBottom: 15,
    marginTop: 10,
  },
  bold: {
    fontWeight: "bold",
    fontSize: theme.fontSizes.heading,
    marginBottom: 1,
  },
  scores: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  img: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  scoreItem: {
    alignItems: "center",
    marginVertical: 5,
  },
  language: {
    backgroundColor: theme.colors.primary,
    textAlign: "center",
    alignSelf: "flex-start",
    flexWrap: "wrap",
    padding: 6,
    marginVertical: 6,
    borderRadius: 3,
    color: theme.colors.secondary,
  },
  description: {
    flexWrap: "wrap",
    maxWidth: 325,
  },
});

type RepositoryItemProps = {
  item: RepoItem;
};

type RepositoryItemScoreProps = {
  count: number;
  name: string;
};

type RepositoryItemDetailsProps = Pick<
  RepoItem,
  "fullName" | "language" | "description" | "ownerAvatarUrl"
>;

const RepositoryItemDetails = ({
  fullName,
  description,
  language,
  ownerAvatarUrl,
}: RepositoryItemDetailsProps) => {
  return (
    <>
      <Image source={{ uri: ownerAvatarUrl }} style={styles.img} />
      <View>
        <Text style={styles.bold}>{fullName}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.language}>{language}</Text>
      </View>
    </>
  );
};

const convertCount = (count: number): string => {
  let finalCount = count.toString(10);

  if (count > 10_000 && count < 100_000) {
    finalCount = finalCount.substring(0, 2) + "." + finalCount[2] + "k";
  }

  if (count > 100_000 && count < 1_000_000) {
    finalCount = finalCount.substring(0, 3) + "." + finalCount[3] + "k";
  }

  if (count > 1_000_000) {
    finalCount = finalCount.substring(0, 1) + "." + finalCount[1] + "m";
  }
  return finalCount;
};

const RepositoryItemScore = ({ count, name }: RepositoryItemScoreProps) => {
  const countStr = convertCount(count);
  return (
    <View style={styles.scoreItem}>
      <Text style={styles.bold}>{countStr}</Text>
      <Text>{name}</Text>
    </View>
  );
};

const RepositoryItem = ({ item }: RepositoryItemProps) => {
  const scores: RepositoryItemScoreProps[] = [
    { count: item.stargazersCount, name: "Stars" },
    { count: item.forksCount, name: "Forks" },
    { count: item.reviewCount, name: "Reviews" },
    { count: item.ratingAverage, name: "Rating" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <RepositoryItemDetails
          description={item.description}
          fullName={item.fullName}
          language={item.language}
          ownerAvatarUrl={item.ownerAvatarUrl}
        />
      </View>
      <View style={styles.scores}>
        {scores.map((obj, index) => (
          <RepositoryItemScore count={obj.count} name={obj.name} key={index} />
        ))}
      </View>
    </View>
  );
};

export default RepositoryItem;
