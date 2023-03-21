import { useState, useEffect } from "react";
import { RepoItem, RepoResponse } from "../repos";

type FetchReposFn = () => Promise<void>;
type isLoading = boolean;
type RepoItems = RepoItem[];

const useRepositories = (): [RepoItems, FetchReposFn, isLoading] => {
  const [repositories, setRepositories] = useState<RepoItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);

    // Replace the IP address part with your own IP address!
    const response = await fetch(`http://192.168.1.18:5001/api/repositories`);
    const json: RepoResponse = await response.json();
    const repos: RepoItem[] = json.edges.map((repo) => repo.node);

    setLoading(false);
    setRepositories(repos);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return [repositories, fetchRepositories, loading];
};

export default useRepositories;
