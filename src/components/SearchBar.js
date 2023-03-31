import React from "react";
import { VStack, Input, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar({ onChangeText, value }) {
  return (
    <VStack w="90%" space={5} pt={3} alignSelf="center">
      <Input
        placeholder="Search"
        variant="filled"
        width="100%"
        borderRadius="10"
        borderColor="gray.300"
        borderWidth="4"
        py="1"
        px="2"
        InputLeftElement={
          <Icon
            ml="2"
            size="4"
            color="gray.400"
            as={<Ionicons name="ios-search" />}
          />
        }
        onChangeText={onChangeText}
        value={value}
      />
    </VStack>
  );
}
