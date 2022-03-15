import React, { FC, useState, useEffect } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useDeleteNote, useGetLocation } from "../hooks";
import { deleteNote as deleteNoteLocally } from "../slices/NoteSlice";
import { Note } from "../types";

const DeleteNotes = (props: any) => {
  const dispatch = useDispatch();
  const { loading, error, deleteNote } = useDeleteNote();
  const goBack = props.navigation.goBack;
  const noteData: Note = props.route.params.note;

  const confirmDelete = async () => {
    const note = await deleteNote(noteData.groupToken, noteData.id);
    if (note) {
      dispatch(deleteNoteLocally(note));
      goBack();
    }
  };

  return (
    <View style={styles.Container}>
      <Text style={styles.Title}>Delete note?</Text>
      {error ? <Text style={styles.Error}>{error}</Text> : <></>}
      <View style={styles.ButtonContainer}>
        <View style={styles.Button}>
          <Button onPress={goBack} title="Go back" disabled={loading} />
        </View>
        <Button
          onPress={confirmDelete}
          title={loading ? "Loading..." : "Delete Note"}
          disabled={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    marginTop: 50,
    padding: 10,
    marginHorizontal: "auto",
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
  },
  Title: {
    fontSize: 17,
    paddingBottom: 10,
  },
  Error: {
    backgroundColor: "#fdd",
    color: "#600",
    padding: 3,
  },
  ButtonContainer: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
  },
  Button: {
    paddingRight: 10,
  },
});

export default DeleteNotes;
