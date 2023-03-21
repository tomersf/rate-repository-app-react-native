import { useMutation, MutationResult, useApolloClient } from "@apollo/client";
import { AUTHENTICATE_MUTATION, REGISTER_MUTATION } from "../graphql/mutations";

import {
  AuthenticateInput,
  loginResult,
  registerResult,
} from "../interfaces/auth";
import { useAuthStorage } from "../hooks/useAuthStorage";

type mutationFn<T> = ({ username, password }: AuthenticateInput) => Promise<T>;

type registerFn = mutationFn<
  Pick<registerResult["data"], "createUser">["createUser"]
>;
type loginFn = mutationFn<string>;

type Result = MutationResult<any>;

const useAuth = (): [registerFn, Result, loginFn, Result] => {
  const authStorage = useAuthStorage();
  const [registerMutate, registerResult] = useMutation(REGISTER_MUTATION);
  const [loginMutate, loginResult] = useMutation(AUTHENTICATE_MUTATION);
  const apolloClient = useApolloClient();

  const login = async ({ username, password }: AuthenticateInput) => {
    // call the mutate function here with the right arguments
    const result = await loginMutate({ variables: { username, password } });
    const token = (result as loginResult).data.authenticate.accessToken;
    await authStorage.setAccessToken(token);
    apolloClient.resetStore();
    return token;
  };

  const register = async ({ username, password }: AuthenticateInput) => {
    // call the mutate function here with the right arguments
    const result = await registerMutate({ variables: { username, password } });
    return (result as registerResult).data.createUser;
  };

  return [register, registerResult, login, loginResult];
};

export default useAuth;
