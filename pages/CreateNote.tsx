import React, { FC, useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useCreateNote, useGetLocation } from "../hooks";
import { CreateNoteData } from "../types";

const initialValues: CreateNoteData = {
  groupToken: "",
  title: "",
  text: "",
  longitude: "",
  latitude: "",
};

const ViewNotes = (props: any) => {
  const [formData, setFormData] = useState<CreateNoteData>(initialValues);
  const [height, setHeight] = useState(10);
  const { loading, error, createNote, groupTokensByName } = useCreateNote();
  const goBack = props.navigation.goBack;

  const { getLocation, location, loading: locationLoading } = useGetLocation();

  const handleSubmit = (e: NativeSyntheticEvent<NativeTouchEvent>) => {
    createNote(goBack, formData);
  };

  const updateFormData = (newState: Partial<CreateNoteData>) => {
    setFormData((prev) => ({ ...prev, ...newState }));
  };

  useEffect(() => {
    if (location) {
      updateFormData(location);
    }
  }, [location]);

  return (
    <ScrollView style={styles.Form}>
      <Text style={styles.Title}>Create new note</Text>
      {error ? <Text style={styles.Error}>{error}</Text> : <></>}
      <View>
        <View style={styles.FormGroup}>
          <Text>Group</Text>
          <Picker
            selectedValue={formData.groupToken}
            onValueChange={(groupToken) => updateFormData({ groupToken })}
          >
            {Object.entries(groupTokensByName).map((entry) => {
              const [name, token] = entry;
              return <Picker.Item key={name} label={name} value={token} />;
            })}
          </Picker>
        </View>
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
            title={location ? "location set" : "Use current location?"}
            disabled={locationLoading}
            onPress={getLocation}
          ></Button>
        </View>
        <View style={styles.Button}>
          <Button
            onPress={handleSubmit}
            title={loading ? "Loading..." : "Create Note"}
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

export default ViewNotes;
