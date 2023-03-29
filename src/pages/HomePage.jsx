import React, { useState } from "react";
import { Text, HStack, ScrollView, VStack, Button } from "native-base";
import SearchBar from "../components/SearchBar";
import CustomAddBookModal from "../components/custom/CustomAddBookModal";

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [filteredData, setFilteredData] = useState([
    {
      id: 1,
      title: "The Lord of the Rings",
    },
  ]);
  const [search, setSearch] = useState("");
  const [masterDataSource, setMasterDataSource] = useState([
    {
      id: 1,
      title: "The Lord of the Rings",
    },
  ]);

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
  }

  function handleFilter(text) {
    if (text) {
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
          >
            <Text px="3%" py="2%">
              {book.title}
            </Text>
            <Button w="22%">delete</Button>
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
