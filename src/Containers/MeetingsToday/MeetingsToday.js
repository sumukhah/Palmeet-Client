import React, { Component } from "react";
import { Text, View } from "react-native";
import MeetingListDropDown from "../../Components/MeetingListDropDown/MeetingListDropDown";

export default class MeetingsToday extends Component {
  render() {
    return (
      <View>
        <MeetingListDropDown />
      </View>
    );
  }
}
