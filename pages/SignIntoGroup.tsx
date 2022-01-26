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
import { useSignIntoGroup } from "../hooks";
import { SignIntoGroupData } from "../types";

const initialValues: SignIntoGroupData = {
  name: "",
  password: "",
};

const ViewGroups = () => {
  const [formData, setFormData] = useState<SignIntoGroupData>(initialValues);
  const { loading, error, signIntoGroup, success } = useSignIntoGroup();
  const handleSubmit = (e: NativeSyntheticEvent<NativeTouchEvent>) => {
    signIntoGroup(formData);
  };

  useEffect(() => {
    if (success) {
      setFormData({ ...initialValues });
    }
  }, [success]);

  const updateFormData = (newState: Partial<SignIntoGroupData>) => {
    setFormData((prev) => ({ ...prev, ...newState }));
  };

  return (
    <ScrollView style={styles.Form}>
      <Text style={styles.Title}>SignInto new group</Text>
      {error ? <Text style={styles.Error}>{error}</Text> : <></>}
      {success ? (
        <Text style={styles.Success}>new group sign into!</Text>
      ) : (
        <></>
      )}
      <View>
        <Text>Name</Text>
        <TextInput
          onChangeText={(e) => updateFormData({ name: e })}
          value={formData.name}
          style={styles.Input}
        />
        <Text>Password</Text>
        <TextInput
          onChangeText={(e) => updateFormData({ password: e })}
          value={formData.password}
          secureTextEntry={true}
          style={styles.Input}
        />
        <View style={styles.Button}>
          <Text>{JSON.stringify({ loading, error })}</Text>
          <Button
            onPress={handleSubmit}
            title={loading ? "Loading..." : "Sign into Group"}
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
