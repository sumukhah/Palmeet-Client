import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect, Provider } from "react-redux";
import * as ScreenOrientation from "expo-screen-orientation";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Spinner } from "native-base";
import store from "./src/store";

import Login from "./src/Containers/Authentication/Login";
import Register from "./src/Containers/Authentication/Register";
import restoreUser from "./src/actions/restoreUser";
import IntroScreen from "./src/Containers/Intro/Intro";

const Stack = createStackNavigator();

class App extends React.Component {
  // state = {
  //   isInitialLoadingCompleted: false,
  // };

  componentDidMount = () => {
    ScreenOrientation.unlockAsync();
    this.props.restoreUser();
    // this.setState({ isInitialLoadingCompleted: true });
  };

  render() {
    // if (!this.state.isInitialLoadingCompleted) {
    //   return <Spinner />;
    // }
    return (
      <View style={styles.container}>
        {!this.props.user.api_token ? (
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Intro"
                component={IntroScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
          </NavigationContainer>
        ) : (
          <Text>Hi</Text>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    restoreUser: () => dispatch(restoreUser()),
  };
};

const PalMeet = connect(mapStateToProps, mapDispatchToProps)(App);

export default () => {
  return (
    <Provider store={store}>
      <PalMeet />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
