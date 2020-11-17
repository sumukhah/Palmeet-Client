import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Button, Input, Card } from "react-native-elements";
import { Header } from "@react-navigation/stack";

import authenticateUser from "../../actions/authentication/login";
import { connect } from "react-redux";
import TitleText from "../../Components/TitleText/TitleText";
import { Title } from "native-base";
import PalMeetIcon from "../../Components/PalMeetIcon/PalMeetIcon";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginPress = () => {
    props.authenticateUser({ email, password });
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={styles.containerStyle}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={{ justifyContent: "flex-end" }}>
          <PalMeetIcon />
          <Card>
            <Input
              placeholder="email"
              leftIcon={<Icon name="mail" size={18} color="black" />}
              style={styles.inputStyle}
              onChangeText={(txt) => setEmail(txt)}
              textContentType="emailAddress"
            />
            <Input
              placeholder="password"
              leftIcon={<Icon name="lock" size={18} color="black" />}
              style={styles.inputStyle}
              onChangeText={(txt) => setPassword(txt)}
              textContentType="password"
              secureTextEntry={true}
            />
            <Button
              title="Login"
              disabled={!email || !password}
              onPress={onLoginPress}
            />
            <Text
              style={styles.registerLink}
              onPress={() => {
                props.navigation.navigate("Register");
              }}
            >
              Register as a new user
            </Text>
            {/* <Text style={{ color: "red" }}>{props.errorMessage}</Text> */}
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    marginTop: 10,
    padding: 10,
    // alignItems: "center",
    // justifyContent: "center",
  },
  inputStyle: {
    padding: 0,
    // height: 20,
  },
  registerLink: {
    color: "blue",
    padding: 10,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    marginTop: 10,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUser: (credential) => dispatch(authenticateUser(credential)),
  };
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.user.errorMessage,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
