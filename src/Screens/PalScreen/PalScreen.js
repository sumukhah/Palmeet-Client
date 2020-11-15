import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Header, Button, Overlay, Text, Card } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Input, Item, Form, Toast } from "native-base";
import axios from "axios";

import fetchPalInvitation from "../../actions/palRequest/fetchPals";
import PalHeader from "../../Containers/ScreenHeader/PalHeader";
import PalsList from "../../Containers/PalsList/PalsList";

class PalScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <PalHeader />
        <PalsList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlayStyle: {
    flexDirection: "column",
    alignItems: "stretch",
    minWidth: 350,
  },
});

export default PalScreen;
