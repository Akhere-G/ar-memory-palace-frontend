import { Note } from "../types";
import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

interface INote {
  note: Note;
  editNote: (note: Note) => void;
  deleteNote: (note: Note) => void;
}

const NoteItem: FC<INote> = ({ note, editNote, deleteNote }) => {
  return (
    <View style={styles.NoteItem}>
      <View>
        <Text style={styles.Title}>{note.title}</Text>
        <Text style={styles.Subtitle}>{note.groupName}</Text>
        <Text>{note.text}</Text>
      </View>
      <View style={styles.ButtonContainer}>
        <IconButton icon="pencil" onPress={() => editNote(note)} />
        <IconButton icon="delete" onPress={() => deleteNote(note)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Title: {
    paddingBottom: 5,
    fontSize: 20,
  },
  Subtitle: {
    paddingBottom: 10,
    fontSize: 15,
    color: "#666",
  },
  NoteItem: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderColor: "#aaa",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    backgroundColor: "white",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default NoteItem;
