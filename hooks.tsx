import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
import * as api from "./api";
import { Group } from "./types";

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
  } catch (error) {
    return {};
  }
};

export const storeGroupToken = async (id: string, token: string) => {
  try {
    let tokens: TokenList = await getGroupTokens();
    tokens[id] = token;
    await SecureStore.setItemAsync(storageKey, token);
  } catch (error) {
    console.log(error);
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
        setError(err.message);
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

        const { id } = jwt_decode(token) as any;

        storeGroupToken(id, token);

        setError("");
      } catch (err: any) {
        console.log(err?.response);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    login();
  }, []);

  return { loading, error };
};
