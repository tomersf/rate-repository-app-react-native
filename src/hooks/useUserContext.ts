import { createContext } from "react";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { User } from "../interfaces/user";
import { useAuthStorage } from "./useAuthStorage";

type signOutFn = () => Promise<void>;

export const useUserContext = (): [User, signOutFn] => {
  const authStorage = useAuthStorage();
  const userCtx = useContext(UserContext);

  const signOut = async () => {
    userCtx.username = "";
    userCtx.id = "";
    await authStorage.removeAccessToken();
  };

  return [userCtx, signOut];
};

export default UserContext;
