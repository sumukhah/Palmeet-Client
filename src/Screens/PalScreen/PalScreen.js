import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { Header, Button } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

class PalScreen extends Component {
  state = {};
  render() {
    return (
      <View>
        <Header
          leftComponent={
            <Button
              title="Add"
              type="clear"
              titleStyle={{ color: "white", marginLeft: 5 }}
              icon={<FontAwesome color="white" size={18} name="user-plus" />}
            />
          }
          rightComponent={
            <Button
              icon={<FontAwesome name="envelope" size={18} color="white" />}
            />
          }
        />
      </View>
    );
  }
}

export default connect()(PalScreen);
