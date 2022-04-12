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
import { useSignIntoGroup } from "../hooks";
import { addGroup } from "../slices/GroupSlice";
import { SignIntoGroupData } from "../types";

const initialValues: SignIntoGroupData = {
  name: "",
  password: "",
};

const SignIntoGroups = (props: any) => {
  const [formData, setFormData] = useState<SignIntoGroupData>(initialValues);
  const dispatch = useDispatch();
  const { loading, error, signIntoGroup } = useSignIntoGroup();

  const handleSubmit = async (e: NativeSyntheticEvent<NativeTouchEvent>) => {
    const response = await signIntoGroup(formData);
    if (response) {
      dispatch(addGroup(response.group));
      goBack();
    }
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
        <View style={styles.FormGroup}>
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

export default SignIntoGroups;
