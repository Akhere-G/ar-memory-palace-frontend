import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useDeleteNote } from "../hooks";
import { deleteNote as deleteNoteLocally } from "../slices/NoteSlice";
import { Note } from "../types";
import styles from "../styles";
const DeleteNotes = (props: any) => {
  const dispatch = useDispatch();
  const { loading, error, deleteNote } = useDeleteNote();
  const goBack = props.navigation.goBack;
  const noteData: Note = props.route.params.note;
  const groupToken: string = props.route.params.groupToken;

  const confirmDelete = async () => {
    const note = await deleteNote(groupToken, noteData.id);
    if (note) {
      dispatch(deleteNoteLocally(note));
      goBack();
    }
  };

  return (
    <View style={styles.CenteredMain}>
      <Text style={styles.Title}>Delete note?</Text>
      {error ? <Text style={styles.Error}>{error}</Text> : <></>}
      <View style={styles.ButtonGroup}>
        <View style={styles.PadRight}>
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

export default DeleteNotes;
