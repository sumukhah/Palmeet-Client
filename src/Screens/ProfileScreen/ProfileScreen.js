import React, { Component } from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Card, Text, Divider } from "react-native-elements";
import { Button } from "native-base";
import Icon from "react-native-vector-icons/AntDesign";

import { logout } from "../../actions/login";

class ProfileScreen extends Component {
  render() {
    const { name, email, logOut } = this.props;
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Title>User Profile</Card.Title>
          <Divider />
          <View style={styles.textContainer}>
            <Text h4 h4Style={styles.textStyle}>
              Name: {name}
            </Text>
            <Text style={{ fontSize: 15, color: "grey" }}>Email: {email}</Text>
          </View>
        </Card>
        <Button
          type="clear"
          danger
          iconLeft
          style={styles.logoutButton}
          onPress={() => logOut()}
        >
          <Icon name="logout" color="white" size={18} />
          <Text style={{ fontSize: 18, color: "white", marginHorizontal: 10 }}>
            Log out
          </Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  textStyle: {
    fontSize: 18,
  },
  textContainer: {
    marginTop: 20,
  },
  card: {
    paddingVertical: 20,
  },
  logoutButton: {
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  buttonTextStyle: {
    color: "white",
  },
});

const mapStateToProps = (state) => {
  return {
    name: state.user.name,
    email: state.user.email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
