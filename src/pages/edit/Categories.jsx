import React, { useEffect, useState } from "react";
import {
  VStack,
  Text,
  HStack,
  ChevronDownIcon,
  Stack,
  Container,
} from "native-base";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

export default function Categories() {
  const users = useSelector((state) => state?.book?.users);
  const email = useSelector((state) => state?.book?.email);

  const [user, setUser] = useState();

  const categories = [
    "Horror",
    "Historical",
    "Classics",
    "Comic book",
    "Action",
  ];

  useEffect(() => {
    AsyncStorage.getItem("users").then((users) => {
      const usersArray = JSON.parse(users);
      const user = usersArray.find((user) => user.email === email);
      setUser(user);
    });
  }, [users]);

  return (
    <VStack space={2} mx={5} mt={3}>
      {categories.map((category, index) => {
        return (
          <VStack borderRadius={10} key={index} w="100%" bg="gray.300">
            <Collapse>
              <CollapseHeader>
                <HStack>
                  <Container pl={20} mr={-20} alignItems="center" flex={1}>
                    <Text>{category}</Text>
                  </Container>
                  <Container alignItems="flex-end" pr={2} flex={1}>
                    <ChevronDownIcon size="6" />
                  </Container>
                </HStack>
              </CollapseHeader>
              <CollapseBody>
                {user?.books.map((book, index) => {
                  if (book.category === category) {
                    return <Text key={index}>{book.title}</Text>;
                  }
                })}
              </CollapseBody>
            </Collapse>
          </VStack>
        );
      })}
    </VStack>
  );
}
