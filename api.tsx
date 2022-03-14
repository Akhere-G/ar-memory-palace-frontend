import axios from "axios";
import Constants from "expo-constants";
import { CreateGroupData, NoteData, SignIntoGroupData } from "./types";

const SERVER_URL = Constants?.manifest?.extra?.SERVER_URL;

const baseUrl = __DEV__ ? "http://localhost:5000" : SERVER_URL;

export const refreshToken = async (token: string) => {
  return await axios({
    method: "get",
    url: `${baseUrl}/api/groups/refresh`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

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

export const fetchNotesForGroup = async (token: string) => {
  return await axios({
    method: "get",
    url: `${baseUrl}/api/notes`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const createNote = async (data: NoteData) => {
  return await axios({
    method: "post",
    url: `${baseUrl}/api/notes`,
    data: {
      title: data.title,
      text: data.text,
      latitude: data.latitude,
      longitude: data.longitude,
    },
    headers: {
      authorization: `Bearer ${data.groupToken}`,
    },
  });
};

export const updateNote = async (data: NoteData, id: string) => {
  return await axios({
    method: "patch",
    url: `${baseUrl}/api/notes/${id}`,
    data: {
      title: data.title,
      text: data.text,
      latitude: data.latitude,
      longitude: data.longitude,
    },
    headers: {
      authorization: `Bearer ${data.groupToken}`,
    },
  });
};
