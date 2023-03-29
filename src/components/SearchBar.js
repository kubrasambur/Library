import React from "react";
import { VStack, Input, Icon, Box, Divider, Heading } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar({ onChangeText, value }) {
  return (
    <VStack w="85%" space={5} alignSelf="center">
      <Input
        placeholder="Search"
        variant="filled"
        width="100%"
        borderRadius="10"
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
