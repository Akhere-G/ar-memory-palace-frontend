import axios from "axios";
import { Group, CreateGroupData } from "./types";

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

export const createGroup = async (data: CreateGroupData) => {
  return await axios({
    method: "post",
    url: `${baseUrl}/api/groups/create`,
    data,
  });
};
