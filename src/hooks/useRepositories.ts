import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { RepoItem, RepoResponse } from "../interfaces/repos";
import { GET_REPOSITORIES_QUERY } from "../graphql/queries";

type FetchReposFn = () => void;
type isLoading = boolean;
type RepoItems = RepoItem[];

const useRepositories = (): [RepoItems, FetchReposFn, isLoading] => {
  const [repositories, setRepositories] = useState<RepoItem[]>([]);
  const result = useQuery(GET_REPOSITORIES_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (!result.loading && result.error === undefined) {
      const repos = (result.data.repositories as RepoResponse).edges.map(
        (repo) => repo.node
      );
      console.log(repos);
      setRepositories(repos);
    }
  }, [result.loading]);

  return [repositories, result.refetch, result.loading];
};

export default useRepositories;
