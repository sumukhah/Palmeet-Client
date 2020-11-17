import React, { Component, useEffect } from "react";
import { Text, View, StatusBar, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Spinner } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Header, Button, Overlay, Divider, Badge } from "react-native-elements";

import MeetingsToday from "../../Containers/MeetingsToday/MeetingsToday";
import AllMeetings from "../../Containers/AllMeetings/AllMeetings";
import fetchPals from "../../actions/palRequest/fetchPals";
import ScheduleMeeting from "../../Containers/StartMeetingForm/StartMeetingForm";
import { ScreenStackHeaderCenterView } from "react-native-screens";
import fetchMeetingsInvitation from "../../actions/meetings/fetchMeetingInvitations";
import fetchMeetings from "../../actions/meetings/fetchScheduledMeetings";
import fetchMeetingInvitations from "../../actions/meetings/fetchMeetingInvitations";

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
    console.log("param is", this.props.route.params);
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
            <View>
              <Button
                icon={<FontAwesome name="envelope" size={18} color="white" />}
                onPress={this.onPressShowMeetingList}
              />
              <Badge
                status="success"
                value={this.props.route.params.meetings.length}
                containerStyle={{ position: "absolute", top: -3, right: -3 }}
              />
            </View>
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
    props.fetchMeetings();
  }, []);
  if (props.isLoading) {
    return <Spinner style={{ flex: 1 }} color="blue" />;
  }
  return (
    <Stack.Navigator initialRouteName="Meetings">
      <Stack.Screen
        component={MeetingScreen}
        name="Meetings"
        options={{ headerShown: false }}
        initialParams={{ meetings: props.meetings }}
      />
      <Stack.Screen component={ScheduleMeeting} name="Schedule Meeting" />
    </Stack.Navigator>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPals: () => dispatch(fetchPals()),
    fetchMeetingInvitations: () => dispatch(fetchMeetingInvitations()),
    fetchMeetings: () => dispatch(fetchMeetings()),
  };
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.meetings.isLoading,
    errorMessage: state.meetings.errorMessage,
    meetings: state.meetings.items,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithStackNavigator);
