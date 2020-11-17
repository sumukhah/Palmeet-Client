import React from "react";
import { View, Text, FlatList, Linking, StyleSheet } from "react-native";
import AccordionDropDown from "../AccordionDropDown/AccordionDropDown";
import { Button } from "react-native-elements";

const MeetingDescription = ({ description, link }) => {
  const openUrl = () => {
    console.log("the link is", link);
    Linking.openURL(`${link}`);
  };

  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.meetingDescription}>
        <Text style={{ color: "grey" }}>{description}</Text>
      </View>
      <Button title="Join Meeting" onPress={openUrl} />
    </View>
  );
};

export default function MeetingListDropDown({ meetings = [] }) {
  const keyExtractor = (meeting, index) => String(meeting.id);
  const renderItem = ({ item }) => (
    <AccordionDropDown
      title={item.title}
      subtitle={item.invitation}
      detailComponent={
        <MeetingDescription description={item.invitation} link={item.link} />
      }
    />
  );
  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={meetings}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  meetingDescription: {
    marginHorizontal: 10,
    marginTop: 10,
  },
});
