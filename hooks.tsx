import { useState, useEffect } from "react";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
import * as api from "./api";
import {
  Group,
  CreateGroupData,
  SignIntoGroupData,
  Coordinates,
  Note,
  CreateNoteData,
} from "./types";
import {
  validateCreateGroupData,
  validateSignIntoGroupData,
  handleError,
  validateCreateNoteData,
} from "./utils";

import * as Location from "expo-location";

export const useGetLocation = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [hasPermissions, setHasPermissions] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    setLoading(true);
    if (!hasPermissions) {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status != "granted") {
        setError("Permission to access location was denied");
        setLoading(false);
        return;
      } else {
        setHasPermissions(true);
      }
    }
    const { coords } = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: String(coords.latitude),
      longitude: String(coords.longitude),
    });
    setError("");
    setLoading(false);
  };

  return { location, hasPermissions, error, loading, getLocation };
};

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

export const useFetchGroups = (
  refreshToken = api.refreshToken,
  getGroupTokensFromStorage = getGroupTokens
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchGroups = async () => {
    try {
      setLoading(true);

      const tokenList = await getGroupTokensFromStorage();
      const tokenInArray = Object.entries(tokenList);

      const groups: Group[] = await Promise.all(
        tokenInArray.map(async (entry) => {
          const [id, token] = entry;
          const response = await refreshToken(token);
          const data = response.data;
          const newToken = data.token;

          const group = data.group;

          await storeGroupToken(token);

          tokenList[id] = newToken;
          return group;
        })
      );

      setError("");
      setLoading(false);

      return { groups, total: groups.length };
    } catch (error) {
      setError("could not get groups");
      setLoading(false);
    }
  };

  return { loading, error, fetchGroups };
};
export const useSignIntoGroup = (signIntoGroupAPI = api.signIntoGroup) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signIntoGroup = async (formData: SignIntoGroupData) => {
    try {
      setLoading(true);
      setError("");

      const possibleError = validateSignIntoGroupData(formData);

      if (possibleError) {
        throw new Error(possibleError);
      }

      const response = await signIntoGroupAPI(formData);
      const data = response.data;

      const { token, group } = data;

      storeGroupToken(token);
      setError("");
      setLoading(false);
      return { group };
    } catch (err: any) {
      setError(handleError(err));
      setLoading(false);
    }
  };

  return { loading, error, signIntoGroup };
};

export const useCreateGroup = (registerGroup = api.createGroup) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createGroup = async (formData: CreateGroupData) => {
    try {
      setLoading(true);
      setError("");
      const possibleError = validateCreateGroupData(formData);

      if (possibleError) {
        throw new Error(possibleError);
      }
      const response = await registerGroup(formData);

      const data = response.data;

      const { token, group } = data;

      setLoading(false);
      storeGroupToken(token);
      setError("");
      return { group };
    } catch (err: any) {
      setError(handleError(err));
      setLoading(false);
    }
  };

  return { loading, error, createGroup };
};

export const useCreateNote = (postNote = api.createNote) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [groupTokensByName, setGroupTokensByName] = useState<TokenList>({});

  useEffect(() => {
    const getGroups = async () => {
      const groupTokens = await getGroupTokens();
      const newGroupTokenList: TokenList = {};

      Object.entries(groupTokens).forEach((entry) => {
        const [_, token] = entry;
        const groupData = jwt_decode(token) as Group;
        const { name } = groupData;

        newGroupTokenList[name] = token;
      });
      setGroupTokensByName(newGroupTokenList);
    };
    getGroups();
  }, []);

  const createNote = async (goBack: Function, formData: CreateNoteData) => {
    try {
      setLoading(true);
      setError("");

      const possibleError = validateCreateNoteData(formData);

      if (possibleError) {
        setError(possibleError);
        setLoading(false);
        return;
      }
      const response = await postNote(formData);

      const data = response.data;

      const { note } = data;

      setLoading(false);
      setError("");
      goBack();
    } catch (err: any) {
      setError(handleError(err));
      setLoading(false);
    }
  };

  return { loading, error, createNote, groupTokensByName };
};

export const useGetNotes = (fetchNotesForGroup = api.fetchNotesForGroup) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [sucess, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const getNotes = async () => {
    setLoading(true);
    setSuccess(false);
    const groupTokens = await getGroupTokens();

    try {
      const tokens = Object.values(groupTokens);
      if (tokens.length === 0) {
        setLoading(false);
        setError("");
      }
      tokens.forEach(async (token, index) => {
        const response = await fetchNotesForGroup(token);
        const data = response.data;
        const newNotes = data.notes;
        setNotes(newNotes.map((note: any) => ({ ...note, id: note._id })));
        if (index === tokens.length - 1) {
          setSuccess(true);
          setLoading(false);
          setError("");
        }
      });
    } catch (err) {
      setError(handleError(err));
      setLoading(false);
    }
  };

  return { notes, loading, error, sucess, getNotes };
};
