import { useState, useEffect } from "react";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
import * as api from "./api";
import { Group, CreateGroupData, SignIntoGroupData } from "./types";
import {
  validateCreateGroupData,
  validateSignIntoGroupData,
  handleError,
} from "./utils";

interface TokenList {
  [key: string]: string;
}

const storageKey = "memory_palace";

type GetGroupTokens = () => Promise<TokenList>;

export const getGroupTokens: GetGroupTokens = async () => {
  try {
    let exisitingTokenList;
    if (Platform.OS === "web") {
      exisitingTokenList = localStorage.getItem(storageKey);
    } else {
      exisitingTokenList = await SecureStore.getItemAsync(storageKey);
    }
    if (exisitingTokenList) {
      const tokens = (await JSON.parse(exisitingTokenList)) as TokenList;
      return tokens;
    }
    return {};
  } catch (err) {
    return {};
  }
};

export const storeGroupToken = async (token: string) => {
  try {
    const { id } = jwt_decode(token) as any;
    let tokens: TokenList = await getGroupTokens();
    tokens[id] = token;
    if (Platform.OS === "web") {
      localStorage.setItem(storageKey, JSON.stringify(tokens));
    } else {
      await SecureStore.setItemAsync(storageKey, JSON.stringify(tokens));
    }
  } catch (err: any) {
    console.log(err);
  }
};

export const useGetGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getGroups = async () => {
    try {
      setLoading(true);
      setError("");

      const groupTokens = await getGroupTokens();
      const newGroups: Group[] = Object.values(groupTokens).map((token) =>
        jwt_decode(token)
      );
      setGroups(newGroups);
      setTotal(newGroups.length);
      setLoading(false);
      setError("");
    } catch (err: any) {
      setLoading(false);
      setError(err);
    }
  };

  return { groups, total, loading, error, getGroups };
};

export const useSignIntoGroup = (signIntoGroupAPI = api.signIntoGroup) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const signIntoGroup = async (formData: SignIntoGroupData) => {
    try {
      setLoading(true);
      setSuccess(false);
      setError("");

      const possibleError = validateSignIntoGroupData(formData);

      if (possibleError) {
        setError(possibleError);
        setLoading(false);

        return;
      }

      const response = await signIntoGroupAPI(formData);
      const data = response.data;

      const { token } = data;

      storeGroupToken(token);
      setSuccess(true);
      setError("");
    } catch (err: any) {
      setError(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, signIntoGroup };
};

export const useCreateGroup = (registerGroup = api.createGroup) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const createGroup = async (formData: CreateGroupData) => {
    try {
      setSuccess(false);
      setLoading(true);
      setError("");
      const possibleError = validateCreateGroupData(formData);

      if (possibleError) {
        setError(possibleError);
        setLoading(false);

        return;
      }
      const response = await registerGroup(formData);

      const data = response.data;

      const { token } = data;

      setSuccess(true);

      setTimeout(() => setSuccess(false), 10000);
      storeGroupToken(token);
      setError("");
    } catch (err: any) {
      setError(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, createGroup };
};
