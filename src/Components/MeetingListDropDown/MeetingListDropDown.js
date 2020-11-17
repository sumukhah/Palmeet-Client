import React from "react";
import { View, Text, FlatList, Linking, StyleSheet } from "react-native";
import AccordionDropDown from "../AccordionDropDown/AccordionDropDown";
import { Button } from "react-native-elements";

const meetings = [
  {
    url: "meet.jit.si/abc",
    description: "hola",
    id: 1,
    name: "hello",
    subtitle: "hi",
  },
  {
    url: "meet.jit.si/abc",
    description: "hola",
    id: 2,
    name: "slkdf",
    subtitle: "hi",
  },
  {
    url: "meet.jit.si/abc",
    description:
      "hola helen vesta hasld lsadkj saldkfjlaksdjflk lsakdfjlkajsd flkajsdf lkasldkfj alskdfkjdflkajsdlf k",
    id: 3,
    name: "hey",
    subtitle: "hoii",
  },
];

const MeetingDescription = ({ description, link }) => {
  const openUrl = () => {
    Linking.openURL(`http://${link}`);
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

export default function MeetingListDropDown() {
  const keyExtractor = (meeting, index) => String(meeting.id);
  const renderItem = ({ item }) => (
    <AccordionDropDown
      title={item.name}
      subtitle={item.subtitle}
      detailComponent={
        <MeetingDescription description={item.description} link={item.url} />
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
