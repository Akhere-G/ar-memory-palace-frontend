import axios from "axios";
import { Group } from "./types";

const baseUrl = __DEV__ ? "http://localhost:5000" : "/";

type ISignIntoGroup = (name: string, password: string) => string;

export const signIntoGroup = async (name: string, password: string) => {
  return await axios({
    method: "post",
    url: `${baseUrl}/api/groups/signin`,
    data: {
      name,
      password,
    },
  });
};
