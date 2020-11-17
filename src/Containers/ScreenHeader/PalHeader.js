import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import {
  Header,
  Button,
  Overlay,
  Text,
  Badge,
  ListItem,
} from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Input, Item, Form, Toast } from "native-base";
import axios from "axios";

import { baseApi, newPalRequest } from "../../api/index";
import acceptPalInvite from "../../actions/palRequest/palInvite";
import OverlayList from "../../Components/OverLayList/OverLayList";

class PalHeader extends Component {
  state = {
    showAddPalForm: false,
    showPalReqList: false,
    errorMessage: "",
    palEmail: "",
    palDescription: "",
  };

  onPressAddPal = () => {
    this.setState((state) => ({ showAddPalForm: !state.showAddPalForm }));
  };
  onPressShowPalList = () => {
    this.setState((state) => ({ showPalReqList: !state.showPalReqList }));
  };
  onSubmitAddPal = async () => {
    try {
      const response = await axios.post(
        `${baseApi}${newPalRequest}`,
        {
          email: this.state.palEmail,
          message: this.state.palDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${this.props.api_token}`,
          },
        }
      );
      console.log(response);
      // After a successful response, hide add pal form
      this.onPressAddPal();
    } catch (e) {
      console.log(e.response);
      Toast.show({
        text: e.message,
        buttonText: "Okay",
        duration: 3000,
      });
    }
  };

  renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.user.name}</ListItem.Title>
        <ListItem.Subtitle>{item.message}</ListItem.Subtitle>
      </ListItem.Content>
      <Button
        title="Accept"
        onPress={() => this.props.acceptPalInvite(item.id, true)}
      />
      <Button
        title="Decline"
        onPress={() => this.props.acceptPalInvite(item.id, false)}
        buttonStyle={{ backgroundColor: "#ff5b4d" }}
      />
    </ListItem>
  );
  keyExtractor = (pal, index) => pal.user.email.toString();

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
              onPress={this.onPressAddPal}
            />
          }
          rightComponent={
            <View>
              <Button
                icon={<FontAwesome name="envelope" size={18} color="white" />}
                onPress={this.onPressShowPalList}
              />
              <Badge
                status="success"
                value={
                  this.props.pals.my_pending
                    ? this.props.pals.my_pending.length
                    : 0
                }
                containerStyle={{ position: "absolute", top: -3, right: -3 }}
              />
            </View>
          }
        />
        <Overlay
          isVisible={this.state.showAddPalForm}
          onBackdropPress={this.onPressAddPal}
          overlayStyle={styles.overlayStyle}
        >
          <Form>
            <Text h4 h4Style={{ fontSize: 18, textAlign: "center" }}>
              Invite people as your pals
            </Text>
            <Item>
              <Input
                placeholder="Pal's Email"
                onChangeText={(text) => this.setState({ palEmail: text })}
              />
            </Item>
            <Item>
              <Input
                placeholder="Short description (Optional)"
                onChangeText={(text) => this.setState({ palDescription: text })}
              />
            </Item>
            <Button
              title="Request"
              containerStyle={{ marginTop: 20 }}
              onPress={this.onSubmitAddPal}
            />
          </Form>
        </Overlay>
        {this.state.showPalReqList && !!this.props.pals.my_pending.length && (
          <OverlayList
            data={this.props.pals.my_pending}
            renderItem={this.renderItem}
            onBackdropPress={this.onPressShowPalList}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlayStyle: {
    minWidth: 350,
    maxHeight: 700,
  },
});

const mapStateToProps = (state) => {
  return { api_token: state.user.api_token, pals: state.pals };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchPalInvitation: () => dispatch(fetchPalInvitation()),
    acceptPalInvite: (id, accepted) => dispatch(acceptPalInvite(id, accepted)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PalHeader);
