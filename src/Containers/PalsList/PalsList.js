import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { Button, ListItem } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";

class PalsList extends Component {
  scheduleMeetingWithPal = (palId) => {};

  keyExtractor = (item, index) => item.email.toString();

  renderItem = ({ item }) => (
    <ListItem bottomDivider containerStyle={styles.listItemContainer}>
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.name}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        {!!this.props.pals.my_pals ? (
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.props.pals.my_pals}
            renderItem={this.renderItem}
            contentContainerStyle={{ marginTop: 14 }}
          />
        ) : (
          <Text> No items </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItemContainer: {
    marginHorizontal: 14,
    borderRadius: 10,
    marginBottom: 2,
    paddingVertical: 10,
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

const mapStateToProps = (state) => {
  return {
    pals: state.pals,
  };
};

export default connect(mapStateToProps)(PalsList);
