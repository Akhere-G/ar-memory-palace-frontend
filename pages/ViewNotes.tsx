import React, { useEffect } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { useGetNotes } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setNotes } from "../slices/NoteSlice";
import { NoteList } from "../components";

const ViewNotes = (props: any) => {
  const { loading, error, getNotes } = useGetNotes();
  const { navigation } = props;

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await getNotes();
      if (response) {
        const { notes } = response;
        dispatch(setNotes(notes));
      }
    };
    fetchNotes();
  }, []);

  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.note.notes);

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

  return (
    <View style={styles.Main}>
      <NoteList notes={notes} />
      <View style={styles.Button}>
        <Button
          title="Create a new note?"
          onPress={() => navigation.navigate("CreateNote")}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Main: {
    padding: 10,
  },
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
  Button: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default ViewNotes;
