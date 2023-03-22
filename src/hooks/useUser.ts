import { useEffect, useState } from "react";
import { useQuery, useApolloClient } from "@apollo/client";

import { User, UserResponse } from "../interfaces/user";
import { ME_QUERY } from "../graphql/queries";
import useUserContext from "./useUserContext";
import { useAuthStorage } from "./useAuthStorage";

type signOutFn = () => Promise<void>;

const useUser = (): [User, signOutFn] => {
  const userContext = useUserContext();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const result = useQuery(ME_QUERY, {
    fetchPolicy: "cache-and-network",
  });
  const [_, setUser] = useState<User>({ ...userContext });

  const signOut = async () => {
    userContext.id = "";
    userContext.username = "";
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  useEffect(() => {
    const user = result as UserResponse;
    if (user.data && user.data.me) {
      userContext.id = user.data.me.id;
      userContext.username = user.data.me.username;
      setUser({ ...user.data.me });
    }
  }, [result]);

  return [userContext, signOut];
};

export default useUser;
