import React, { Component } from "react";
import { Text, View, StatusBar, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Header, Button } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import MeetingsToday from "../../Containers/MeetingsToday/MeetingsToday";
import AllMeetings from "../../Containers/AllMeetings/AllMeetings";

const Tab = createMaterialTopTabNavigator();
class MeetingScreen extends Component {
  state = {
    showAddMeetingForm: false,
    showMeetingRequestList: false,
  };

  onPressAddMeeting = () => {};

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={
            <Button
              title="Add"
              icon={<FontAwesome name="microphone" size={18} color="white" />}
              titleStyle={{ marginLeft: 5 }}
            />
          }
          rightComponent={
            <Button
              icon={<FontAwesome name="envelope" size={18} color="white" />}
            />
          }
        />
        <Tab.Navigator>
          <Tab.Screen name="Meetings Today" component={MeetingsToday} />
          <Tab.Screen name="All Meetings" component={AllMeetings} />
        </Tab.Navigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default connect()(MeetingScreen);
