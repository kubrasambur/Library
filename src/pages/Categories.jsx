import { View, Text } from "react-native";
import React from "react";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";

export default function Categories() {
  return (
    <Collapse>
      <CollapseHeader>
        <View>
          <Text>Click here</Text>
        </View>
      </CollapseHeader>
      <CollapseBody>
        <Text>Ta daa!</Text>
      </CollapseBody>
    </Collapse>
  );
}
