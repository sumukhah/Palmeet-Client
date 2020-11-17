import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { Calendar } from "react-native-calendars";
import MeetingListDropDown from "../../Components/MeetingListDropDown/MeetingListDropDown";

class AllMeetings extends Component {
  state = {
    selectedDate: "",
  };
  showMeetingsOfDate = (date) => {
    return this.props.meetings.filter(
      (item) => item.meeting_starts.slice(0, 10) === date
    );
  };
  markMeetings = () => {
    let markedDates = {};
    this.props.meetings.forEach((item) => {
      markedDates[item.meeting_starts.slice(0, 10)] = {
        selected: true,
        selectedColor: "#1d6acf",
      };
    });
    return markedDates;
  };
  render() {
    return (
      <View>
        <Calendar
          onDayPress={(day) => {
            this.setState({ selectedDate: day.dateString });
          }}
          markedDates={this.markMeetings()}
        />
        <MeetingListDropDown
          meetings={this.showMeetingsOfDate(this.state.selectedDate)}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    meetings: state.meetings.items,
  };
};

export default connect(mapStateToProps)(AllMeetings);
