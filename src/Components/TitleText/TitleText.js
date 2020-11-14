import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
export default function TitleText() {
  return (
    <View style={styles.containerStyle}>
      <Text h2>PalMeet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: "center",
  },
});
