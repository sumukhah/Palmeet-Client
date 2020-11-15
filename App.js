import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect, Provider } from "react-redux";
import * as ScreenOrientation from "expo-screen-orientation";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Spinner } from "native-base";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

import store from "./src/store";
import Login from "./src/Containers/Authentication/Login";
import Register from "./src/Containers/Authentication/Register";
import restoreUser from "./src/actions/authentication/restoreUser";
import IntroScreen from "./src/Containers/Intro/Intro";
import ProfileScreen from "./src/Screens/ProfileScreen/ProfileScreen";
import MeetingScreen from "./src/Screens/MeetingScreen/MeetingScreen";
import GroupScreen from "./src/Screens/GroupScreen/GroupsScreen";
import PalScreen from "./src/Screens/PalScreen/PalScreen";

const Tab = createMaterialBottomTabNavigator();
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
      <NavigationContainer>
        <View style={styles.container}>
          {!this.props.user.api_token ? (
            <Stack.Navigator>
              <Stack.Screen
                name="Intro"
                component={IntroScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
          ) : (
            <Tab.Navigator inactiveColor="#a6dbff">
              <Tab.Screen
                name="Meetings"
                component={MeetingScreen}
                options={{
                  tabBarIcon: ({ color }) => (
                    <Icon name="th-list" color={color} size={23} />
                  ),
                }}
              />
              <Tab.Screen
                name="Pals"
                component={PalScreen}
                options={{
                  tabBarIcon: ({ color }) => (
                    <Icon name="user-o" color={color} size={23} />
                  ),
                }}
              />
              <Tab.Screen
                name="Groups"
                component={GroupScreen}
                options={{
                  tabBarIcon: ({ color }) => (
                    <Icon name="group" color={color} size={23} />
                  ),
                }}
              />
              <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                  tabBarIcon: ({ color }) => (
                    <Icon name="user-circle" color={color} size={23} />
                  ),
                }}
              />
            </Tab.Navigator>
          )}
        </View>
      </NavigationContainer>
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
