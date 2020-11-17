import React, { useState } from "react";
import { TouchableWithoutFeedback, StyleSheet, View } from "react-native";
import { ListItem, Card } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function AccordionDropDown({
  title,
  subtitle,
  detailComponent,
}) {
  const [showAccordion, handleShowAccordion] = useState(false);
  return (
    <Card containerStyle={styles.card}>
      <TouchableWithoutFeedback
        onPress={() => handleShowAccordion(!showAccordion)}
      >
        <View>
          <ListItem bottomDivider containerStyle={styles.listContainer}>
            <ListItem.Content>
              <ListItem.Title>{title}</ListItem.Title>
              <ListItem.Subtitle>{subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <AntDesign name="down" />
          </ListItem>
          {showAccordion && detailComponent}
        </View>
      </TouchableWithoutFeedback>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { padding: 0, marginTop: 5, borderRadius: 20 },
  listContainer: {
    borderRadius: 10,
  },
});
