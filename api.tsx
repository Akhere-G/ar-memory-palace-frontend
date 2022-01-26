import axios from "axios";
import { CreateGroupData, SignIntoGroupData } from "./types";

const baseUrl = __DEV__ ? "http://localhost:5000" : "/";

type ISignIntoGroup = (name: string, password: string) => string;

export const signIntoGroup = async (data: SignIntoGroupData) => {
  return await axios({
    method: "post",
    url: `${baseUrl}/api/groups/signin`,
    data,
  });
};

export const createGroup = async (data: CreateGroupData) => {
  return await axios({
    method: "post",
    url: `${baseUrl}/api/groups/create`,
    data,
  });
};
