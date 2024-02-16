import { useContext } from "react";
import { LoginUserContext } from "../providers/LoginUserProvider";
import { LoginUserContextType } from "../providers/LoginUserProvider";

export const useLoginUser = (): LoginUserContextType =>
  useContext(LoginUserContext);