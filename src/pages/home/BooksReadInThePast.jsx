import React, { useEffect, useState } from "react";
import {
  Text,
  HStack,
  ScrollView,
  VStack,
  Box,
  Heading,
  AspectRatio,
  Image,
  Stack,
} from "native-base";
import SearchBar from "../../components/SearchBar";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BooksReadInThePast() {
  const users = useSelector((state) => state?.book?.users);
  const email = useSelector((state) => state?.book?.email);

  const [search, setSearch] = useState("");
  const [user, setUser] = useState({});
  const [filteredBooks, setFilteredBooks] = useState([]);
  const render = filteredBooks?.filter((book) => book.isRead === true);

  const u1 = users?.find((u) => u.email === email);

  function handleFilter(text) {
    if (text) {
      const newData = user?.books?.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredBooks(newData);
      setSearch(text);
    } else {
      setFilteredBooks(user?.books);
      setSearch(text);
    }
  }

  useEffect(() => {
    AsyncStorage.getItem("user").then((user) => {
      console.log("user12", JSON.parse(user));
    });
  }, [email]);

  useEffect(() => {
    setUser(u1);
    setFilteredBooks(u1?.books);
  }, [users]);

  return (
    <VStack display="flex" flex={1} alignItems="center">
      <SearchBar onChangeText={(text) => handleFilter(text)} value={search} />
      <ScrollView w="90%" my={3}>
        {render?.map((book) => (
          <Box
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            flexDirection="row"
            key={book.id}
            mb={2}
          >
            <Box>
              <AspectRatio ratio={7 / 8} w="100px" h="95px">
                <Image
                  source={{
                    uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
                  }}
                  alt="image base"
                />
              </AspectRatio>
            </Box>
            <Stack w="100%" px="3" py="1" bg="trueGray.300">
              <Stack>
                <Heading size="md">{book.title}</Heading>
                <Text fontSize="xs" color="gray.600" fontWeight="500" ml="-0.5">
                  {book.author}
                </Text>
              </Stack>

              <Text fontWeight="400">
                {book.publisher} - {book.publishYear}
              </Text>

              <HStack
                alignItems="center"
                space={4}
                justifyContent="space-between"
              >
                <HStack
                  w="100%"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                    fontWeight="400"
                  >
                    {book.pages} - {book.category}
                  </Text>
                </HStack>
              </HStack>
            </Stack>
          </Box>
        ))}
      </ScrollView>
    </VStack>
  );
}
