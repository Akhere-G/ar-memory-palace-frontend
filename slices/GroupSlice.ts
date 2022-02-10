import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Group, SignIntoGroupData } from "../types";
import * as api from "../api";
import { storeGroupToken } from "../hooks";
import { handleError, validateSignIntoGroupData } from "../utils";

export interface GroupState {
  loading: boolean;
  errorMessage: string;
  groups: Group[];
  total: number;
}

const initialState: GroupState = {
  loading: false,
  errorMessage: "",
  groups: [],
  total: 0,
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<Group>) => {
      state.groups.push(action.payload);
    },
  },
});

export const { addGroup } = groupSlice.actions;
export default groupSlice.reducer;
