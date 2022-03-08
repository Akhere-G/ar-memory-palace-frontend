import React, { FC } from "react";
import { FlatList } from "react-native";
import { Note } from "../types";
import SingleNote from "./Note";

const NotesList: FC<{ notes: Note[] }> = ({ notes }) => {
  return (
    <FlatList
      data={notes}
      renderItem={({ item }) => <SingleNote {...item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default NotesList;
