import { createContext } from "react";
import { User } from "../interfaces/user";

const UserContext = createContext<User>({ username: "", id: "" });

export default UserContext;
