import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Overlay, ListItem } from "react-native-elements";

export default function OverLayList({
  data,
  renderItem,
  onBackdropPress,
  ...props
}) {
  const keyExtractor = (item, index) => item.id;

  return (
    <Overlay
      isVisible={true}
      overlayStyle={styles.overlayStyle}
      onBackdropPress={onBackdropPress}
    >
      <FlatList
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem}
      />
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlayStyle: {
    minWidth: 340,
    maxHeight: 400,
  },
});
