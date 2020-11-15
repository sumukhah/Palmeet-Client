import React, { Component } from "react";
import { Text, View, StatusBar, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Input, Item, Form } from "native-base";
import { Header, Button, Overlay, Divider } from "react-native-elements";

import MeetingsToday from "../../Containers/MeetingsToday/MeetingsToday";
import AllMeetings from "../../Containers/AllMeetings/AllMeetings";

const Tab = createMaterialTopTabNavigator();
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
              onPress={this.onPressAddMeeting}
            />
          }
          rightComponent={
            <Button
              icon={<FontAwesome name="envelope" size={18} color="white" />}
              onPress={this.onPressShowMeetingList}
            />
          }
        />
        <Overlay
          isVisible={this.state.showAddMeetingForm}
          onBackdropPress={this.onPressAddMeeting}
          overlayStyle={styles.overlayStyle}
        >
          <Form>
            <Item>
              <Input placeholder="Pal's Email" />
            </Item>
            <Item>
              <Input placeholder="Short description (Optional)" />
            </Item>
            <Button title="Request" containerStyle={{ marginTop: 20 }} />
          </Form>
        </Overlay>

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

export default connect()(MeetingScreen);
