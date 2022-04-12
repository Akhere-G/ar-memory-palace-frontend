import React, { FC } from "react";
import { List } from "react-native-paper";
import { Note, Group } from "../types";
import SingleNote from "./Note";
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
    <List.Section title={""}>
      {sections.map((section) => (
        <List.Accordion title={section.title} key={section.title}>
          {section.data.map((note) => (
            <SingleNote
              key={note.id}
              note={note}
              editNote={editNote}
              deleteNote={deleteNote}
            />
          ))}
        </List.Accordion>
      ))}
    </List.Section>
  );
};

export default NotesList;
