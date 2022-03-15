import React, { FC, useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { useUpdateNote, useGetLocation } from "../hooks";
import { updateNote as updateNoteLocally } from "../slices/NoteSlice";
import { NoteData, Note } from "../types";

const initialValues: NoteData = {
  groupToken: "",
  title: "",
  text: "",
  longitude: "",
  latitude: "",
};

const UpdateNotes = (props: any) => {
  const [formData, setFormData] = useState<NoteData>(initialValues);
  const [height, setHeight] = useState(10);

  const goBack = props.navigation.goBack;
  const noteData: Note = props.route.params.note;
  const groupToken: string = props.route.params.groupToken;
  const { loading, error, updateNote } = useUpdateNote();
  const { getLocation, location, loading: locationLoading } = useGetLocation();

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const note = await updateNote(formData, noteData.id);
    if (note) {
      dispatch(updateNoteLocally(note));
      goBack();
    }
  };

  const updateFormData = (newState: Partial<NoteData>) => {
    setFormData((prev) => ({ ...prev, ...newState }));
  };

  useEffect(() => {
    if (location) {
      updateFormData(location);
    }
  }, [location]);

  useEffect(() => {
    updateFormData({
      groupToken: groupToken,
      latitude: String(noteData.latitude),
      longitude: String(noteData.longitude),
      text: noteData.text,
      title: noteData.title,
    });
  }, []);

  return (
    <ScrollView style={styles.Form}>
      <Text style={styles.Title}>Update new note</Text>
      {error ? <Text style={styles.Error}>{error}</Text> : <></>}
      <View>
        <View style={styles.FormGroup}>
          <Text>Title</Text>
          <TextInput
            onChangeText={(e) => updateFormData({ title: e })}
            value={formData.title}
            style={styles.Input}
          />
        </View>
        <View style={styles.FormGroup}>
          <Text>Text</Text>
          <TextInput
            onChangeText={(e) => updateFormData({ text: e })}
            onContentSizeChange={(e) =>
              setHeight(e.nativeEvent.contentSize.height)
            }
            value={formData.text}
            style={{
              height: Math.max(80, height),
              ...styles.Input,
            }}
            multiline
          />
        </View>
        <View style={styles.FormGroup}>
          <Button
            title={
              location ? "location set" : "Update loction to current location?"
            }
            disabled={locationLoading}
            onPress={getLocation}
          ></Button>
        </View>
        <View style={styles.Button}>
          <Button
            onPress={handleSubmit}
            title={loading ? "Loading..." : "Update Note"}
            disabled={loading}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Title: {
    fontSize: 17,
    paddingBottom: 10,
  },
  Error: {
    backgroundColor: "#fdd",
    color: "#600",
    padding: 3,
  },
  Success: {
    backgroundColor: "#dfd",
    color: "#060",
    padding: 3,
  },
  Form: {
    padding: 10,
  },
  FormGroup: {
    paddingBottom: 10,
  },
  Input: {
    borderColor: "#aaa",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: "solid",
    padding: 2.5,
  },
  Button: {
    paddingTop: 10,
  },
});

export default UpdateNotes;
