import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, Button, StyleSheet, ScrollView } from "react-native";
import { useGetNotes } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setNotes } from "../slices/NoteSlice";
import { NoteList } from "../components";
import { Note } from "../types";
import styles from "../styles";

const ViewNotes = (props: any) => {
  const { loading, error, getNotes } = useGetNotes();
  const { navigation } = props;

  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.note.notes);
  const groups = useSelector((state: RootState) => state.group.groups);

  useFocusEffect(
    useCallback(() => {
      const fetchNotes = async () => {
        const response = await getNotes();
        if (response) {
          const { notes } = response;
          dispatch(setNotes(notes));
        }
      };
      fetchNotes();
    }, [groups])
  );

  if (loading) {
    return (
      <View style={styles.Main}>
        <Text style={styles.Title}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.Main}>
        <Text style={styles.Title}>Error... {error}</Text>
      </View>
    );
  }

  if (notes.length === 0) {
    return (
      <View style={styles.Main}>
        <Text style={styles.Title}>No notes</Text>
        <View style={styles.Button}>
          <Button
            title="You have no notes... Create a new note?"
            onPress={() => navigation.navigate("CreateNote")}
          />
        </View>
      </View>
    );
  }

  const editNote = (note: Note) => {
    const groupToken =
      groups.find((group) => group.id === note.groupId)?.token || "";

    navigation.navigate("UpdateNote", {
      note,
      groupToken,
    });
  };
  const deleteNote = (note: Note) => {
    navigation.navigate("DeleteNote", {
      note,
      groupToken: groups.find((group) => group.id === note.groupId)?.token,
    });
  };

  return (
    <ScrollView style={styles.Main}>
      <View style={styles.ScrollList}>
        <NoteList
          notes={notes}
          groups={groups}
          editNote={editNote}
          deleteNote={deleteNote}
        />
      </View>

      <View>
        <Button
          title="Create a new note?"
          onPress={() => navigation.navigate("CreateNote")}
        />
      </View>
    </ScrollView>
  );
};

export default ViewNotes;
