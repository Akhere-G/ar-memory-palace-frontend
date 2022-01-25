import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
import * as api from "./api";
import { Group } from "./types";
import { CreateGroupData } from "./types";
import { validateCreateGroupData, handleError } from "./utils";

interface TokenList {
  [key: string]: string;
}

const storageKey = "memory_palace";

type GetGroupTokens = () => Promise<TokenList>;

export const getGroupTokens: GetGroupTokens = async () => {
  try {
    const exisitingTokenList = await SecureStore.getItemAsync(storageKey);
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
    await SecureStore.setItemAsync(storageKey, token);
  } catch (err: any) {
    console.log(err);
  }
};

export const useFetchGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
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
    fetchGroups();
  }, []);

  return { groups, total, loading, error };
};

export const useSignIntoGroup = (
  name: string,
  password: string,
  signIntoGroup = api.signIntoGroup
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const login = async () => {
      try {
        setLoading(true);
        const response = await signIntoGroup(name, password);
        const data = response.data;

        const { token } = data;

        storeGroupToken(token);

        setError("");
      } catch (err: any) {
        setError(handleError(err));
      } finally {
        setLoading(false);
      }
    };
    login();
  }, []);

  return { loading, error };
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
