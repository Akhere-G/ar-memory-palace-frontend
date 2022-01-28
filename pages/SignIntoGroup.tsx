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

const ViewGroups = (props: any) => {
  const [formData, setFormData] = useState<SignIntoGroupData>(initialValues);
  const { loading, error, signIntoGroup } = useSignIntoGroup();

  const handleSubmit = (e: NativeSyntheticEvent<NativeTouchEvent>) => {
    signIntoGroup(goBack, formData);
  };

  const goBack = props.navigation.goBack;

  const updateFormData = (newState: Partial<SignIntoGroupData>) => {
    setFormData((prev) => ({ ...prev, ...newState }));
  };

  return (
    <ScrollView style={styles.Form}>
      <Text style={styles.Title}>Sign Into new group</Text>
      {error ? <Text style={styles.Error}>{error}</Text> : <></>}
      <View>
        <View style={styles.FormGroup}>
          <Text>Name</Text>
          <TextInput
            onChangeText={(e) => updateFormData({ name: e })}
            value={formData.name}
            style={styles.Input}
          />
        </View>
        <View style={styles.FormGroup}>
          <Text>Password</Text>
          <TextInput
            onChangeText={(e) => updateFormData({ password: e })}
            value={formData.password}
            secureTextEntry={true}
            style={styles.Input}
          />
        </View>
        <View style={styles.Button}>
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

export default ViewGroups;
