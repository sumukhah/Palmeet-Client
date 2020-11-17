import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { ListItem, Card } from "react-native-elements";

export default function AccordionDropDown({
  title,
  subtitle,
  detailComponent,
}) {
  const [showAccordion, handleShowAccordion] = useState(false);
  return (
    <TouchableWithoutFeedback
      onPress={() => handleShowAccordion(!showAccordion)}
    >
      <Card containerStyle={{ padding: 0, marginTop: 5, borderRadius: 10 }}>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{title}</ListItem.Title>
            <ListItem.Subtitle>{subtitle}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        {showAccordion && detailComponent}
      </Card>
    </TouchableWithoutFeedback>
  );
}
