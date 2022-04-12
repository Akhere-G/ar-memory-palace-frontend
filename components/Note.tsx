import { Note } from "../types";
import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import styles from "../styles";
interface INote {
  note: Note;
  editNote: (note: Note) => void;
  deleteNote: (note: Note) => void;
}

const NoteItem: FC<INote> = ({ note, editNote, deleteNote }) => {
  const groups = useSelector((state: RootState) => state.group.groups);
  const groupName = groups.find((group) => group.id === note.groupId)?.name;
  return (
    <View style={styles.NoteItem}>
      <View>
        <Text style={styles.Title}>{note.title}</Text>
        <Text style={styles.Subtitle}>{groupName}</Text>
        <Text>{note.text}</Text>
      </View>
      <View style={styles.ButtonGroup}>
        <IconButton icon="pencil" onPress={() => editNote(note)} />
        <IconButton icon="delete" onPress={() => deleteNote(note)} />
      </View>
    </View>
  );
};

export default NoteItem;
