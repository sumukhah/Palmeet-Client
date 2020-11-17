import React from "react";
import { View, Image } from "react-native";
import PalMeetIconImage from "../../../assets/palmeet.png";

export default function PalMeetIcon() {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Image
        source={PalMeetIconImage}
        style={{ height: 100, resizeMode: "contain" }}
      />
    </View>
  );
}
