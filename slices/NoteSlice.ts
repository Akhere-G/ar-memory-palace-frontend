import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "../types";

export interface NoteState {
  loading: boolean;
  errorMessage: string;
  notes: Note[];
  total: number;
}

const initialState: NoteState = {
  loading: false,
  errorMessage: "",
  notes: [],
  total: 0,
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });
    },
    deleteNote: (state, action: PayloadAction<Note>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload.id);
    },
  },
});

export const { setNotes, addNote, updateNote, deleteNote } = noteSlice.actions;
export default noteSlice.reducer;
