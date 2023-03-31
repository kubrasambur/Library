import React, { useEffect, useState } from "react";
import { Text, HStack, ScrollView, VStack, Button } from "native-base";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";
import { store } from "../redux/store";
import { setBooks, setFilteredBooks } from "../redux/slices/bookSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomePage({ navigation }) {
  const filteredBooks = useSelector((state) => state?.book?.filteredBooks);
  const books = useSelector((state) => state?.book?.books);

  const [search, setSearch] = useState("");

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

  return (
    <VStack display="flex" flex={1} mt={5}>
      <SearchBar onChangeText={(text) => handleFilter(text)} value={search} />
      <ScrollView ml="8%">
        {filteredBooks?.map((book) => (
          <HStack
            key={book.id}
            mt={5}
            bg="blue.200"
            borderRadius={10}
            w="92%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text px="3%" py="2%" w="61%">
              {book.title}
            </Text>
          </HStack>
        ))}
      </ScrollView>

      <Button
        alignSelf="center"
        w="85%"
        mb={8}
        onPress={() => navigation.navigate("Edit")}
      >
        Edit Books
      </Button>
    </VStack>
  );
}
