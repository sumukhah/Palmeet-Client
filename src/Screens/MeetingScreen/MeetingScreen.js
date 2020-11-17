import React, { Component, useEffect } from "react";
import { Text, View, StatusBar, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Spinner, Toast } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  Header,
  Button,
  Overlay,
  ListItem,
  Badge,
} from "react-native-elements";
import moment from "moment";

import MeetingsToday from "../../Containers/MeetingsToday/MeetingsToday";
import AllMeetings from "../../Containers/AllMeetings/AllMeetings";
import fetchPals from "../../actions/palRequest/fetchPals";
import ScheduleMeeting from "../../Containers/StartMeetingForm/StartMeetingForm";
import { ScreenStackHeaderCenterView } from "react-native-screens";
import fetchMeetingsInvitation from "../../actions/meetings/fetchMeetingInvitations";
import fetchMeetings from "../../actions/meetings/fetchScheduledMeetings";
import fetchMeetingInvitations from "../../actions/meetings/fetchMeetingInvitations";
import OverLayList from "../../Components/OverLayList/OverLayList";
import { baseApi, acceptMeeting, declineMeeting, setHeader } from "../../api";
import Axios from "axios";

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

  onAcceptMeetingInvitation = async (id, accepted) => {
    try {
      const headers = setHeader(this.props.route.params.user.api_token);
      const { data } = await Axios.get(
        `${baseApi}${accepted ? acceptMeeting : declineMeeting}/${id}`,
        {
          headers,
        }
      );
      Toast.show(data);
    } catch (e) {
      console.log(e);
      Toast.show(e.message);
    }
  };

  renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.meeting.title}</ListItem.Title>
        <ListItem.Subtitle>
          starts at:{moment(item.meeting.meeting_starts).format("DD-MM HH")}
        </ListItem.Subtitle>
        <ListItem.Subtitle>
          ends at:{moment(item.meeting.meeting_ends).format("DD-MM HH")}
        </ListItem.Subtitle>
      </ListItem.Content>

      <Button
        title="Accept"
        onPress={() => {
          this.onAcceptMeetingInvitation(item.id, true);
        }}
      />
      <Button
        title="Decline"
        onPress={() => this.onAcceptMeetingInvitation(item.id, false)}
        buttonStyle={{ backgroundColor: "#ff5b4d" }}
      />
    </ListItem>
  );

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
            <View>
              <Button
                icon={<FontAwesome name="envelope" size={18} color="white" />}
                onPress={this.onPressShowMeetingList}
              />
              <Badge
                status="success"
                value={this.props.route.params.pendingMeetings.length}
                containerStyle={{ position: "absolute", top: -3, right: -3 }}
              />
            </View>
          }
        />
        {this.state.showMeetingReqList && (
          <OverLayList
            data={this.props.route.params.pendingMeetings}
            renderItem={this.renderItem}
            onBackdropPress={this.onPressShowMeetingList}
          />
        )}

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
        initialParams={{
          meetings: props.meetings,
          pendingMeetings: props.pendingMeetings,
          user: props.user,
        }}
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
    pendingMeetings: state.pendingMeeting.items,
    isLoadingPendingMeetings: state.pendingMeeting.isLoading,
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithStackNavigator);
