import axios from "axios";
import { Group } from "./types";

const baseUrl = __DEV__ ? "http://localhost:5000" : "/";

interface GetGroupsResponse {
  groups: Group[];
  total: number;
}

export const getGroups = async () => {
  return await axios.get<GetGroupsResponse>(`${baseUrl}/api/groups`);
};
