import React, { Component } from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";
import { Overlay, Button, Input, Card } from "react-native-elements";
import { Textarea } from "native-base";
import DateTimePicker, {
  TimePickerOptions,
} from "@react-native-community/datetimepicker";
import moment from "moment";
import axios from "axios";

import SelectablePalList from "../PalsList/SelectablePalList";
import {
  setHeader,
  baseApi,
  scheduleMeeting,
  inviteForMeeting,
} from "../../api/index";
import generateRandomUrl from "../../helper/generateRandomUrl";

class StartMeetingForm extends Component {
  state = {
    showStartDatePicker: false,
    showEndDatePicker: false,
    showStartTimePicker: false,
    showEndTimePicker: false,
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    showPalsOverlay: false,
    selectedPals: [],
    title: "",
    description: "",
  };
  setStartDate = (date) => {
    const startDate = moment(date.nativeEvent.timestamp).format("YYYY-MM-DD");
    this.setState({ showStartDatePicker: false });
    !this.state.endDate
      ? this.setState({ startDate, endDate: startDate })
      : this.setState({ startDate });
  };
  setEndDate = (date) => {
    const endDate = moment(date.nativeEvent.timestamp).format("YYYY-MM-DD");
    this.setState({ endDate, showEndDatePicker: false });
  };
  setStartTime = (time) => {
    const startTime = moment(time.nativeEvent.timestamp).format("HH:mm:ss");
    this.setState({ showStartTimePicker: false, startTime });
  };
  setEndTime = (time) => {
    const endTime = moment(time.nativeEvent.timestamp).format("HH:mm:ss");
    this.setState({ endTime, showEndTimePicker: false });
  };
  onSelectPal = (palId) => {
    if (this.state.selectedPals.includes(palId)) {
      const selectedPals = this.state.selectedPals.filter((id) => id !== palId);
      this.setState({ selectedPals });
    } else {
      const selectedPals = [...this.state.selectedPals, palId];
      this.setState({ selectedPals });
    }
  };
  onPressScheduleMeeting = async () => {
    const {
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      selectedPals,
    } = this.state;
    const title =
      this.state.title ||
      `Meeting on ${this.state.startDate} ${this.state.startTime}`;
    const headers = setHeader(this.props.user.api_token);

    try {
      const { data } = await axios.post(
        `${baseApi}${scheduleMeeting}`,
        {
          title,
          invitation: description,
          link: generateRandomUrl(),
          meeting_starts: `${startDate}${startTime}`,
          meeting_ends: `${endDate}${endTime}`,
        },
        { headers }
      );
      const meeting_id = data.data.id;
      const response = await axios.post(
        `${baseApi}${inviteForMeeting}`,
        { meeting_id, invitees: JSON.stringify(selectedPals) },
        { headers }
      );
      console.log(response);
      this.props.navigation.pop();
    } catch (e) {
      console.log(e.response);
    }
  };

  render() {
    const {
      startDate,
      startTime,
      endDate,
      endTime,
      showPalsOverlay,
      selectedPals,
    } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View>
          <Input
            placeholder="Meeting title (Optional)"
            onChangeText={(txt) => this.setState({ title: txt })}
          />
          <Textarea
            rowSpan={4}
            bordered
            placeholder="Meeting Description (Optional)"
            onChangeText={(txt) => this.setState({ description: txt })}
          />
        </View>
        {this.state.showStartDatePicker && (
          <DateTimePicker
            value={Date.now()}
            display="calendar"
            mode="date"
            onChange={this.setStartDate}
            minimumDate={Date.now()}
          />
        )}
        {this.state.showEndDatePicker && (
          <DateTimePicker
            value={Date.now()}
            mode="date"
            display="calendar"
            onChange={this.setEndDate}
            minimumDate={Date.now()}
          />
        )}
        {this.state.showStartTimePicker && (
          <DateTimePicker
            value={Date.now()}
            mode="time"
            display="clock"
            is24Hour={false}
            onChange={this.setStartTime}
          />
        )}
        {this.state.showEndTimePicker && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            is24Hour={false}
            display="clock"
            onChange={this.setEndTime}
          />
        )}
        <View style={styles.dateTime}>
          <View style={styles.buttonGroup}>
            <Text style={{ fontWeight: "bold" }}>Starts From:</Text>
            <Button
              title={startDate || "Start Date"}
              onPress={() => this.setState({ showStartDatePicker: true })}
              type="clear"
            />
            <Button
              title={startTime || "Start Time"}
              onPress={() => this.setState({ showStartTimePicker: true })}
              type="clear"
            />
          </View>
          <View style={styles.buttonGroup}>
            <Text style={{ fontWeight: "bold" }}>Ends at:</Text>
            <Button
              title={endDate || "End Date"}
              onPress={() => this.setState({ showEndDatePicker: true })}
              type="clear"
            />
            <Button
              title={endTime || "End Time"}
              onPress={() => this.setState({ showEndTimePicker: true })}
              type="clear"
            />
          </View>
        </View>
        <Button
          title="Invite Pals"
          onPress={() => this.setState({ showPalsOverlay: true })}
          type="clear"
        />
        <Button title="Schedule" onPress={this.onPressScheduleMeeting} />

        {showPalsOverlay && (
          <SelectablePalList
            pals={this.props.pals.my_pals}
            selectedPals={selectedPals}
            onSelectPal={this.onSelectPal}
            onBackdropPress={() => this.setState({ showPalsOverlay: false })}
          />
        )}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "column",
    alignItems: "center",
  },
  dateTime: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "space-around",
  },
});

const mapStateToProps = (state) => {
  return {
    pals: state.pals,
    user: state.user,
  };
};

const mapDispatchProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchProps)(StartMeetingForm);
