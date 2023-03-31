import React, { useEffect, useState } from "react";
import { Text, HStack, ScrollView, VStack, Button, Center } from "native-base";
import CustomAddModal from "../components/custom/CustomAddModal";
import CustomEditModal from "./../components/custom/CustomEditModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../redux/store";
import { addBook, setBooks, setFilteredBooks } from "../redux/slices/bookSlice";
import uuid from "react-native-uuid";
import { useSelector } from "react-redux";

const EditPage = () => {
  const books = useSelector((state) => state?.book?.books);
  const filteredBooks = useSelector((state) => state?.book?.filteredBooks);

  const [open, setOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [bookId, setBookId] = useState("");
  const [EditIsOpen, setEditIsOpen] = useState(false);
  const [value, setValue] = useState("");

  function handleAddBook() {
    AsyncStorage.setItem(
      "books",
      JSON.stringify([
        ...books,
        {
          id: uuid.v4(),
          title: value,
        },
      ])
    );
    AsyncStorage.getItem("books").then((value) => {
      store.dispatch(setFilteredBooks(JSON.parse(value)));
      store.dispatch(setBooks(JSON.parse(value)));
    });
    store.dispatch(addBook({ id: uuid.v4(), title: value }));
    setValue("");
    setOpen(false);
  }

  function handleDelete(id) {
    AsyncStorage.getItem("books").then((books) => {
      const alteredBooks = JSON.parse(books).filter((book) => book.id !== id);
      AsyncStorage.setItem("books", JSON.stringify(alteredBooks));
      store.dispatch(setFilteredBooks(alteredBooks));
    });
  }

  function handleEdit(book) {
    setEditIsOpen(true);
    setBookId(book.id);
    setEditedTitle(book.title);
  }

  function editBook() {
    AsyncStorage.getItem("books").then((books) => {
      const alteredBooks = JSON.parse(books).map((book) => {
        if (book.id === bookId) {
          book.title = editedTitle;
        }
        return book;
      });
      AsyncStorage.setItem("books", JSON.stringify(alteredBooks));
      store.dispatch(setFilteredBooks(alteredBooks));
    });
    setEditIsOpen(false);
  }

  useEffect(() => {
    AsyncStorage.getItem("books").then((value) => {
      store.dispatch(setFilteredBooks(JSON.parse(value)));
      store.dispatch(setBooks(JSON.parse(value)));
    });
  }, []);

  return (
    <VStack display="flex" flex={1} mt={6}>
      <ScrollView ml="8%">
        {filteredBooks.map((book) => (
          <HStack
            key={book.id}
            mb={5}
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
              <Button onPress={() => handleEdit(book)}>Edit</Button>
              <Button ml={3} onPress={() => handleDelete(book.id)}>
                delete
              </Button>
            </Center>
          </HStack>
        ))}
      </ScrollView>
      <Button alignSelf="center" w="85%" mb={8} onPress={() => setOpen(true)}>
        Add new book
      </Button>

      <CustomAddModal
        isOpen={open}
        setOpen={() => setOpen(false)}
        value={value}
        onChangeText={setValue}
        handleOnPress={() => handleAddBook()}
        title="Add Book"
      />

      <CustomEditModal
        isOpen={EditIsOpen}
        setOpen={() => setEditIsOpen(false)}
        value={editedTitle}
        onChangeText={setEditedTitle}
        handleOnPress={() => editBook()}
        title="Edit book"
      />
    </VStack>
  );
};

export default EditPage;
