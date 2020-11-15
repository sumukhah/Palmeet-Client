import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import { connect } from "react-redux";

import { Button, ListItem } from "react-native-elements";

class PalsList extends Component {
  keyExtractor = (item, index) => item.email.toString();

  renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.email}</ListItem.Title>
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
          />
        ) : (
          <Text> No items </Text>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pals: state.pals,
  };
};

export default connect(mapStateToProps)(PalsList);
