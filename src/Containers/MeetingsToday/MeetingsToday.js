import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import MeetingListDropDown from "../../Components/MeetingListDropDown/MeetingListDropDown";
import moment from "moment";

class MeetingsToday extends Component {
  filterTodaysMeeting = (meetings) => {
    const today = moment(new Date()).format("YYYY-MM-DD");

    return meetings.filter(
      (item) => item.meeting_starts.slice(0, 10) === today
    );
  };
  render() {
    const { meetings } = this.props;
    return (
      <View>
        <MeetingListDropDown meetings={this.filterTodaysMeeting(meetings)} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    meetings: state.meetings.items,
  };
};

export default connect(mapStateToProps)(MeetingsToday);
