import React, { useEffect, useState } from "react";
import { Text, HStack, ScrollView, VStack, Button, Center } from "native-base";
import SearchBar from "../components/SearchBar";
import CustomAddBookModal from "../components/custom/CustomAddBookModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [masterDataSource, setMasterDataSource] = useState([]);

  function handleAddBook() {
    setFilteredData((prevBooks) => [
      ...prevBooks,
      {
        id: prevBooks.length + 1,
        title: value,
      },
    ]);
    setMasterDataSource((prevBooks) => [
      ...prevBooks,
      {
        id: prevBooks.length + 1,
        title: value,
      },
    ]);
    setValue("");
    setOpen(false);
    AsyncStorage.setItem(
      "books",
      JSON.stringify([
        ...filteredData,
        {
          id: filteredData.length + 1,
          title: value,
        },
      ])
    );
    AsyncStorage.getItem("books").then((value) => {
      console.log("value1", value);
      setFilteredData(JSON.parse(value));
      setMasterDataSource(JSON.parse(value));
    });
  }
  useEffect(() => {
    AsyncStorage.getItem("books").then((value) => {
      console.log("value2", value);
      setFilteredData(JSON.parse(value));
      setMasterDataSource(JSON.parse(value));
    });
  }, []);

  function handleFilter(text) {
    if (text) {
      console.log("masterDataSource",masterDataSource)
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(masterDataSource);
      setSearch(text);
    }
  }

  function handleEdit() {
    console.log("edit");
  }

  function handleDelete(id) {
    AsyncStorage.getItem("books").then((books) => {
      const alteredBooks = JSON.parse(books).filter((book) => book.id !== id);
      AsyncStorage.setItem("books", JSON.stringify(alteredBooks));
      setFilteredData(alteredBooks);
    });
  }

  return (
    <VStack display="flex" flex={1} mt={10}>
      <Text fontWeight="bold" fontSize={25} mb={3} alignSelf="center">
        Library
      </Text>

      <SearchBar onChangeText={(text) => handleFilter(text)} value={search} />
      <ScrollView ml="8%">
        {filteredData.map((book) => (
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
            <Center
              flexDirection="row"
              w="39%"
              display="flex"
              justifyContent="center"
            >
              <Button onPress={handleEdit}>Edit</Button>
              <Button ml={3} onPress={() => handleDelete(book.id)}>
                delete
              </Button>
            </Center>
          </HStack>
        ))}
      </ScrollView>
      <Button alignSelf="center" w="85%" mb={10} onPress={() => setOpen(true)}>
        Add new book
      </Button>

      <CustomAddBookModal
        isOpen={open}
        setOpen={() => setOpen(false)}
        value={value}
        onChangeText={setValue}
        handleOnPress={() => handleAddBook()}
        title="Add Book"
      />
    </VStack>
  );
}
