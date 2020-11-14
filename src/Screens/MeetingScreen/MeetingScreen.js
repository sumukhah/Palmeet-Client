import React, { Component } from "react";
import { Text, View, StatusBar, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import MeetingsToday from "../../Containers/MeetingsToday/MeetingsToday";
import AllMeetings from "../../Containers/AllMeetings/AllMeetings";

const Tab = createMaterialTopTabNavigator();
class MeetingScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Tab.Navigator>
          <Tab.Screen name="Meetings Today" component={MeetingsToday} />
          <Tab.Screen name="All Meetings" component={AllMeetings} />
        </Tab.Navigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: StatusBar.currentHeight },
});

export default connect()(MeetingScreen);
