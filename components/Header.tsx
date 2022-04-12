import React, { FC } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import styles from "../styles";
const Header: any = (props: any) => {
  const { title } = props.options;
  return (
    <SafeAreaView>
      <View style={styles.Header}>
        <Text style={styles.HeaderTitle}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Header;
