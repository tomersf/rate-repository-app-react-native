import { createContext } from "react";
import { useContext } from "react";
import AuthStorage from "../utils/authStorage";

const AuthStorageContext = createContext(new AuthStorage());

export const useAuthStorage = () => {
  return useContext(AuthStorageContext);
};

export default AuthStorageContext;
