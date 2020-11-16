import React, { Component, useEffect } from "react";
import { Text, View, StatusBar, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Header, Button, Overlay, Divider, Badge } from "react-native-elements";

import MeetingsToday from "../../Containers/MeetingsToday/MeetingsToday";
import AllMeetings from "../../Containers/AllMeetings/AllMeetings";
import fetchPals from "../../actions/palRequest/fetchPals";
import ScheduleMeeting from "../../Containers/StartMeetingForm/StartMeetingForm";
import { ScreenStackHeaderCenterView } from "react-native-screens";
import fetchMeetings from "../../actions/meetingInvite/fetchMeetingInvitations";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

class MeetingScreen extends Component {
  state = {
    showAddMeetingForm: false,
    showMeetingReqList: false,
  };

  onPressAddMeeting = () => {
    this.setState((state) => ({
      showAddMeetingForm: !state.showAddMeetingForm,
    }));
  };
  onPressShowMeetingList = () => {
    this.setState((state) => ({
      showMeetingReqList: !state.showMeetingReqList,
    }));
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={
            <Button
              title="Add"
              icon={<FontAwesome name="microphone" size={18} color="white" />}
              titleStyle={{ marginLeft: 5 }}
              onPress={() => this.props.navigation.navigate("Schedule Meeting")}
            />
          }
          rightComponent={
            <Button
              icon={<FontAwesome name="envelope" size={18} color="white" />}
              onPress={this.onPressShowMeetingList}
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
  overlayStyle: {
    flexDirection: "column",
    alignItems: "stretch",
    minWidth: 300,
  },
});

const WithStackNavigator = (props) => {
  useEffect(() => {
    props.fetchPals();
    props.fetchMeetingInvitations();
  }, []);
  return (
    <Stack.Navigator initialRouteName="Meetings">
      <Stack.Screen
        component={MeetingScreen}
        name="Meetings"
        options={{ headerShown: false }}
      />
      <Stack.Screen component={ScheduleMeeting} name="Schedule Meeting" />
    </Stack.Navigator>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPals: () => dispatch(fetchPals()),
    fetchMeetingInvitations: () => dispatch(fetchMeetings()),
  };
};

export default connect(null, mapDispatchToProps)(WithStackNavigator);
