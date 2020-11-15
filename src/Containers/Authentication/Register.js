import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Button, Input, Card } from "react-native-elements";
import { connect } from "react-redux";
import { Header } from "@react-navigation/stack";

import userRegister from "../../actions/authentication/register";
import AppTitle from "../../Components/TitleText/TitleText";
import { ScrollView } from "react-native-gesture-handler";

function Register(props) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmitRegistration = () => {
    props.userRegister({
      name: fullName,
      password_confirmation: confirmPassword,
      email,
      password,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.containerStyle}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ justifyContent: "flex-end" }}>
        <AppTitle />
        <Card>
          <Input
            placeholder="Full Name"
            leftIcon={<Icon name="user" size={18} color="black" />}
            style={styles.inputStyle}
            onChangeText={(txt) => {
              setFullName(txt);
            }}
          />
          <Input
            placeholder="email"
            leftIcon={<Icon name="mail" size={18} color="black" />}
            style={styles.inputStyle}
            onChangeText={(txt) => {
              setEmail(txt);
            }}
            textContentType="emailAddress"
          />
          <Input
            placeholder="password"
            leftIcon={<Icon name="lock" size={18} color="black" />}
            style={styles.inputStyle}
            onChangeText={(txt) => {
              setPassword(txt);
            }}
            textContentType="password"
            secureTextEntry={true}
          />
          <Input
            placeholder="confirm password"
            leftIcon={<Icon name="lock" size={18} color="black" />}
            style={styles.inputStyle}
            onChangeText={(txt) => {
              setConfirmPassword(txt);
            }}
            textContentType="password"
            secureTextEntry={true}
          />
          <Button
            title="Register"
            // disabled={!fullName || !confirmPassword || !email || !password}
            onPress={onSubmitRegistration}
          />
          <Text
            style={styles.loginLink}
            onPress={() => {
              props.navigation.navigate("Login");
            }}
          >
            Already a user
          </Text>
        </Card>

        <Text style={{ color: "red" }}>{props.errorMessage}</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: 10,
    marginTop: 10,
    // alignItems: "center",
    // justifyContent: "center",
  },
  inputStyle: {
    padding: 0,
    // height: 20,
  },
  loginLink: {
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
    userRegister: (credentials) => dispatch(userRegister(credentials)),
  };
};
const mapStateToProps = (state) => {
  return {
    errorMessage: state.user.errorMessage,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
