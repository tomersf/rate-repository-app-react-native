import { useEffect } from "react";
import { useQuery, useApolloClient } from "@apollo/client";

import { User, UserResponse } from "../interfaces/user";
import { ME_QUERY } from "../graphql/queries";
import { useUserContext } from "./useUserContext";

type signInFn = () => void;

const useUser = (): [User, signInFn] => {
  const [user] = useUserContext();
  const result = useQuery(ME_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  const signIn = () => {
    result.refetch();
  };

  useEffect(() => {
    if (!result.loading && result.error === undefined) {
      const userResponse = (result as UserResponse).data.me;
      if (userResponse) {
        user.id = userResponse.id;
        user.username = userResponse.username;
      }
    }
  }, [result.loading]);

  return [user, signIn];
};

export default useUser;
