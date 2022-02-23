import { Note } from "../types";
import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

const NoteItem: FC<Note> = ({ title, text, groupName }) => {
  return (
    <View style={styles.NoteItem}>
      <Text style={styles.Title}>{title}</Text>
      <Text style={styles.Subtitle}>{groupName}</Text>
      <Text>{text}</Text>
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
  },
});

export default NoteItem;
