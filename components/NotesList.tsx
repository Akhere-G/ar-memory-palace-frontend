import React, { FC } from "react";
import { Text } from "react-native";
import { List } from "react-native-paper";
import { Note, Group } from "../types";
import SingleNote from "./Note";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { sectionNotesByGroup } from "../utils";

interface INoteList {
  notes: Note[];
  groups: Group[];
  editNote: (note: Note) => void;
  deleteNote: (note: Note) => void;
}

const NotesList: FC<INoteList> = ({ notes, groups, editNote, deleteNote }) => {
  const sections = sectionNotesByGroup(notes, groups);
  return (
    <List.Section title={"Groups"}>
      {sections.map((section) => (
        <List.Accordion title={section.title}>
          {section.data.map((note) => (
            <SingleNote
              note={note}
              editNote={editNote}
              deleteNote={deleteNote}
            />
          ))}
        </List.Accordion>
      ))}
    </List.Section>
  );

  /** <List.Section
      title
      sections={sections}
      renderItem={({ item }) => (
        <SingleNote note={item} editNote={editNote} deleteNote={deleteNote} />
      )}
      renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
      keyExtractor={(note) => note.id}
    />
    **/
};

export default NotesList;
