import React, { useEffect, useState } from "react";
import {
  Text,
  HStack,
  ScrollView,
  VStack,
  Button,
  Box,
  Heading,
  AspectRatio,
  Image,
  Stack,
} from "native-base";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";
import { store } from "../redux/store";
import { setBooks, setFilteredBooks } from "../redux/slices/bookSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomePage({ navigation }) {
  const filteredBooks = useSelector((state) => state?.book?.filteredBooks);
  const books = useSelector((state) => state?.book?.books);
  const users = useSelector((state) => state?.book?.users);
  const email = useSelector((state) => state?.book?.email);

  const [search, setSearch] = useState("");
  const [user, setUser] = useState({});


  function handleFilter(text) {
    if (text) {
      const newData = books.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      store.dispatch(setFilteredBooks(newData));
      setSearch(text);
    } else {
      store.dispatch(setFilteredBooks(books));
      setSearch(text);
    }
  }

  useEffect(() => {
    AsyncStorage.getItem("books").then((value) => {
      store.dispatch(setFilteredBooks(JSON.parse(value)));
      store.dispatch(setBooks(JSON.parse(value)));
    });
  }, []);
  
  useEffect(() => {
    const u1 = users?.find((u) => u.email === email);
    setUser(u1);
  }, [email]);

  return (
    <VStack display="flex" flex={1} alignItems="center">
      <SearchBar onChangeText={(text) => handleFilter(text)} value={search} />
      <ScrollView w="90%" my={3}>
        {user?.books?.map((book) => (
          <Box
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            _dark={{
              borderColor: "coolGray.600",
              backgroundColor: "gray.700",
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: "gray.50",
            }}
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
                <HStack alignItems="center">
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

      <Button
        alignSelf="center"
        w="90%"
        mb={6}
        onPress={() => navigation.navigate("Edit")}
      >
        Edit Books
      </Button>
    </VStack>
  );
}
