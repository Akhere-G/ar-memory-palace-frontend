import React, { FC, useEffect, useState } from "react";
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
import { useCreateGroup } from "../hooks";
import { CreateGroupData } from "../types";

const initialValues: CreateGroupData = {
  name: "",
  summary: "",
  longitude: "",
  latitude: "",
  password: "",
  confirmPassword: "",
};

const ViewGroups = () => {
  const [formData, setFormData] = useState<CreateGroupData>(initialValues);
  const { loading, error, createGroup, success } = useCreateGroup();
  const handleSubmit = (e: NativeSyntheticEvent<NativeTouchEvent>) => {
    createGroup(formData);
  };

  useEffect(() => {
    if (success) {
      setFormData({ ...initialValues });
    }
  }, [success]);

  const updateFormData = (newState: Partial<CreateGroupData>) => {
    setFormData((prev) => ({ ...prev, ...newState }));
  };

  return (
    <ScrollView style={styles.Form}>
      <Text style={styles.Title}>Create new group</Text>
      {error ? <Text style={styles.Error}>{error}</Text> : <></>}
      {success ? <Text style={styles.Success}>new group created!</Text> : <></>}
      <View>
        <Text>Name</Text>
        <TextInput
          onChangeText={(e) => updateFormData({ name: e })}
          value={formData.name}
          style={styles.Input}
        />
        <Text>Summary</Text>
        <TextInput
          onChangeText={(e) => updateFormData({ summary: e })}
          value={formData.summary}
          style={styles.Input}
        />
        <Text>Longitude</Text>
        <TextInput
          onChangeText={(e) => updateFormData({ longitude: e })}
          value={formData.longitude}
          style={styles.Input}
        />

        <Text>Latitude</Text>
        <TextInput
          onChangeText={(e) => updateFormData({ latitude: e })}
          value={formData.latitude}
          style={styles.Input}
        />
        <Text>Password</Text>
        <TextInput
          onChangeText={(e) => updateFormData({ password: e })}
          value={formData.password}
          secureTextEntry={true}
          style={styles.Input}
        />
        <Text>Confirm Password</Text>
        <TextInput
          onChangeText={(e) => updateFormData({ confirmPassword: e })}
          value={formData.confirmPassword}
          secureTextEntry={true}
          style={styles.Input}
        />
        <View style={styles.Button}>
          <Text>{JSON.stringify({ loading, error })}</Text>
          <Button
            onPress={handleSubmit}
            title={loading ? "Loading..." : "Create Group"}
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
    paddingBottom: 5,
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
  Input: {
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: "solid",
    padding: 2.5,
  },
  Button: {
    paddingTop: 10,
  },
});

export default ViewGroups;
