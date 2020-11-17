import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { Calendar } from "react-native-calendars";

class AllMeetings extends Component {
  render() {
    return (
      <View>
        <Calendar />
      </View>
    );
  }
}

export default connect()(AllMeetings);
