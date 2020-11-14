import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import background from "../../../assets/backgroundImages/intro.png";
import { Button, Text } from "react-native-elements";

export default function Intro({ navigation }) {
  return (
    <ImageBackground
      source={background}
      style={{
        flex: 1,
        resizeMode: "cover",
        // justifyContent: "center",
      }}
    >
      <View style={styles.containerStyle}>
        <View style={styles.descriptionStyle}>
          <Text h4 style={{ textAlign: "center" }}>
            Schedule and attend a Video Conference instantly with PalMeet
          </Text>
        </View>
        <View style={styles.buttonGroup}>
          <Button
            buttonStyle={styles.buttonStyle}
            title="Login"
            onPress={() => navigation.navigate("Login")}
          />
          <Button
            buttonStyle={styles.buttonStyle}
            title="Sign Up"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    paddingHorizontal: 60,
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  containerStyle: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "flex-end",
    padding: 20,
  },
  descriptionStyle: {
    marginBottom: 50,
  },
});
