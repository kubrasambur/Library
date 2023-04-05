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
import SearchBar from "../../components/SearchBar";
import { useSelector } from "react-redux";
import { setUsers } from "../../redux/slices/bookSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../../redux/store";

export default function HomePage({ navigation }) {
  const users = useSelector((state) => state?.book?.users);
  const email = useSelector((state) => state?.book?.email);

  const [search, setSearch] = useState("");
  const [user, setUser] = useState({});
  const [filteredBooks, setFilteredBooks] = useState([]);
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
  function handleMarkAsRead(book) {
    return () => {
      if (book.isLend === true) {
        alert("You have already lent this book");
        return;
      } else {
        book.toRead = false;
        book.isRead = true;
        const u2 = users?.filter((u) => u.email !== email);
        u2.push(u1);
        AsyncStorage.setItem("users", JSON.stringify(u2)).then(() => {
          AsyncStorage.getItem("users").then((users) => {
            store.dispatch(setUsers(JSON.parse(users)));
          });
        });
      }
    };
  }

  function handleBooksToRead(book) {
    return () => {
      if (book.isRead === true) {
        alert("You have already read this book");
        return;
      } else if (book.isLend === true) {
        alert("You have already lent this book");
        return;
      } else {
        book.toRead = true;
        const u2 = users?.filter((u) => u.email !== email);
        console.log("u2", u2);
        u2.push(u1);
        AsyncStorage.setItem("users", JSON.stringify(u2)).then(() => {
          AsyncStorage.getItem("users").then((users) => {
            store.dispatch(setUsers(JSON.parse(users)));
          });
        });
      }
    };
  }

  function handleLendBook(book) {
    return () => {
      if (book.toRead === true) {
        alert("You have added this book to read list");
      } else {
        book.isLend = true;
        const u2 = users?.filter((u) => u.email !== email);
        u2.push(u1);
        AsyncStorage.setItem("users", JSON.stringify(u2)).then(() => {
          AsyncStorage.getItem("users").then((users) => {
            store.dispatch(setUsers(JSON.parse(users)));
          });
        });
      }
    };
  }

  useEffect(() => {
    setUser(u1);
    setFilteredBooks(u1?.books);
  }, [email]);

  useEffect(() => {
    setUser(u1);
    setFilteredBooks(u1?.books);
  }, [users]);

  console.log("user", user);

  return (
    <VStack display="flex" flex={1} alignItems="center">
      <SearchBar onChangeText={(text) => handleFilter(text)} value={search} />
      <ScrollView w="90%" my={3}>
        {filteredBooks?.map((book) => (
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
              <HStack justifyContent="space-between">
                <VStack>
                  <Heading size="md">{book.title}</Heading>
                  <Text
                    fontSize="xs"
                    color="gray.600"
                    fontWeight="500"
                    ml="-0.5"
                  >
                    {book.author}
                  </Text>
                  <Text fontWeight="400">
                    {book.publisher} - {book.publishYear}
                  </Text>
                  <Text color="coolGray.600" fontWeight="400">
                    {book.pages} - {book.category}
                  </Text>
                </VStack>
                <VStack minW="40%" mr={20} space={2} mt={1}>
                  <Text
                    textAlign="center"
                    borderRadius={10}
                    px={2}
                    bg="amber.300"
                    onPress={handleBooksToRead(book)}
                  >
                    {book.toRead === true
                      ? "Added to read list"
                      : "Add to read list"}
                  </Text>

                  <Text
                    textAlign="center"
                    borderRadius={10}
                    pl={2}
                    bg="amber.300"
                    onPress={handleMarkAsRead(book)}
                  >
                    {book.isRead === true ? "Marked as read" : "Mark as read"}
                  </Text>

                  <Text
                    textAlign="center"
                    borderRadius={10}
                    bg="amber.300"
                    onPress={handleLendBook(book)}
                  >
                    {book.isLend === true ? "Lent out" : "Lend"}
                  </Text>
                </VStack>
              </HStack>
            </Stack>
          </Box>
        ))}
      </ScrollView>

      <VStack w="93%" space={3}>
        <HStack justifyContent="space-between" w="63%" space={2}>
          <Button w="50%" onPress={() => navigation.navigate("BooksToRead")}>
            Books to read
          </Button>
          <Button
            w="50%"
            onPress={() => navigation.navigate("BooksReadInPast")}
          >
            Read books
          </Button>
          <Button w="50%" onPress={() => navigation.navigate("LentBooks")}>
            Lent books
          </Button>
        </HStack>
        <Button
          alignSelf="center"
          w="100%"
          mb={6}
          onPress={() => navigation.navigate("Edit")}
        >
          Edit Books
        </Button>
      </VStack>
    </VStack>
  );
}
