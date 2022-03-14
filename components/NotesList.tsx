import React, { FC } from "react";
import { FlatList } from "react-native";
import { Note } from "../types";
import SingleNote from "./Note";

interface INoteList {
  notes: Note[];
  editNote: (note: Note) => void;
  deleteNote: (note: Note) => void;
}

const NotesList: FC<INoteList> = ({ notes, editNote, deleteNote }) => {
  return (
    <FlatList
      data={notes}
      renderItem={({ item }) => (
        <SingleNote note={item} editNote={editNote} deleteNote={deleteNote} />
      )}
      keyExtractor={(note) => note.id}
    />
  );
};

export default NotesList;
