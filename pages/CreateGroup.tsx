import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
  ScrollView,
} from "react-native";
import styles from "../styles";
import { useDispatch } from "react-redux";
import { addGroup } from "../slices/GroupSlice";

import { useCreateGroup } from "../hooks";
import { CreateGroupData } from "../types";

const initialValues: CreateGroupData = {
  name: "",
  summary: "",
  password: "",
  confirmPassword: "",
};

const CreateGroup = (props: any) => {
  const [formData, setFormData] = useState<CreateGroupData>(initialValues);
  const dispatch = useDispatch();

  const { loading, error, createGroup } = useCreateGroup();
  const goBack = props.navigation.goBack;

  const handleSubmit = async (e: NativeSyntheticEvent<NativeTouchEvent>) => {
    const response = await createGroup(formData);
    if (response) {
      dispatch(addGroup(response.group));
      goBack();
    }
  };

  const updateFormData = (newState: Partial<CreateGroupData>) => {
    setFormData((prev) => ({ ...prev, ...newState }));
  };

  return (
    <ScrollView style={styles.Form}>
      <Text style={styles.Title}>Create new group</Text>
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
          <Text>Summary</Text>
          <TextInput
            onChangeText={(e) => updateFormData({ summary: e })}
            value={formData.summary}
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
        <View style={styles.FormGroup}>
          <Text>Confirm Password</Text>
          <TextInput
            onChangeText={(e) => updateFormData({ confirmPassword: e })}
            value={formData.confirmPassword}
            secureTextEntry={true}
            style={styles.Input}
          />
        </View>
        <View style={styles.FormGroup}>
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

export default CreateGroup;
