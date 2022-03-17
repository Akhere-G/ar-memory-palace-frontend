import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Group } from "../types";

export interface GroupState {
  groups: Group[];
}

const initialState: GroupState = {
  groups: [],
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroups: (state, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
    },
    addGroup: (state, action: PayloadAction<Group>) => {
      state.groups.push(action.payload);
    },
  },
});

export const { setGroups, addGroup } = groupSlice.actions;
export default groupSlice.reducer;
