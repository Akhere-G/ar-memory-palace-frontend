import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import styles from "../styles";

const Subheader: any = (props: any) => {
  const { title } = props.options;
  const { canGoBack, goBack } = props.navigation;

  return (
    <View style={styles.Subheader}>
      {canGoBack() && <IconButton icon="arrow-left" onPress={() => goBack()} />}
      <Text style={styles.HeaderTitle}>{title}</Text>
    </View>
  );
};

export default Subheader;
