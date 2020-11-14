import React from "react";
import { View, StatusBar } from "react-native";
import { Text } from "react-native-elements";

export default function GroupsScreen() {
  return (
    <View
      style={{
        flex: 1,
        marginTop: StatusBar.currentHeight,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text h4>There's nothing here</Text>
      <Text h4>Coming Soon...</Text>
    </View>
  );
}
