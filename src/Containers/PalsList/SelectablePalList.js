import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Overlay, ListItem, Text, Button } from "react-native-elements";

export default function SelectablePalList({
  pals = [],
  onSelectPal,
  selectedPals = [],
  ...props
}) {
  const keyExtractor = (item, index) => item.email.toString();

  const renderItem = ({ item }) => (
    <ListItem
      containerStyle={
        selectedPals.includes(item.id)
          ? { ...styles.listItemContainer, ...styles.selectedItem }
          : { ...styles.listItemContainer }
      }
      onPress={() => onSelectPal(item.id)}
    >
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
  return (
    <Overlay
      isVisible={true}
      overlayStyle={{
        maxHeight: 500,
        alignSelf: "stretch",
        minHeight: 100,
        marginHorizontal: 10,
      }}
      onBackdropPress={props.onBackdropPress}
    >
      <View>
        <Text h4 h4Style={{ textAlign: "center", marginVertical: 10 }}>
          Your Pals
        </Text>
        <FlatList
          keyExtractor={keyExtractor}
          data={pals}
          renderItem={renderItem}
        />
        <Button title="Done" onPress={props.onBackdropPress} />
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  selectedItem: {
    backgroundColor: "#f0fcff",
  },
  listItemContainer: {
    marginHorizontal: 14,
    marginBottom: 2,
    // paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
