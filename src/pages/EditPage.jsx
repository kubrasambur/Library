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
  IconButton,
  Icon,
} from "native-base";
import CustomAddModal from "../components/custom/CustomAddModal";
import CustomEditModal from "./../components/custom/CustomEditModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../redux/store";
import {
  addBook,
  setBooks,
  setFilteredBooks,
  setUsers,
} from "../redux/slices/bookSlice";
import uuid from "react-native-uuid";
import { useSelector } from "react-redux";
import { Entypo, AntDesign } from "@expo/vector-icons";

const EditPage = ({navigation}) => {
  const users = useSelector((state) => state?.book?.users);
  const email = useSelector((state) => state?.book?.email);

  const [open, setOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [bookId, setBookId] = useState("");
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [pages, setPages] = useState("");
  const [category, setCategory] = useState("");
  const [editedAuthor, setEditedAuthor] = useState("");
  const [editedPublisher, setEditedPublisher] = useState("");
  const [editedPublishYear, setEditedPublishYear] = useState("");
  const [editedPages, setEditedPages] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [user1, setUser1] = useState({});
  const [render, setRender] = useState([]);

  function handleAddBook() {
    const newBook = {
      id: uuid.v4(),
      title: value,
      author: author,
      publisher: publisher,
      publishYear: publishYear,
      pages: pages,
      category: category,
      isRead: false,
      toRead: false,
      isLend: false,
    };
    const alteredUsers = users.map((user) => {
      if (user.id === user1.id) {
        user.books = [...user.books, newBook];
      }
      return user;
    });
    AsyncStorage.setItem("users", JSON.stringify(alteredUsers));
    store.dispatch(setUsers(alteredUsers));
    setRender(user1.books);

    setValue("");
    setAuthor("");
    setPublisher("");
    setPublishYear("");
    setPages("");
    setCategory("");
    setOpen(false);
  }

  function handleDelete(id) {
    const alteredUsers = users.map((user) => {
      if (user.id === user1.id) {
        user.books = user.books.filter((book) => book.id !== id);
      }
      return user;
    });
    AsyncStorage.setItem("users", JSON.stringify(alteredUsers));
    store.dispatch(setUsers(alteredUsers));
  }

  function handleEdit(book) {
    setEditIsOpen(true);
    setBookId(book.id);
    setEditedTitle(book.title);
    setEditedAuthor(book.author);
    setEditedPublisher(book.publisher);
    setEditedPublishYear(book.publishYear);
    setEditedPages(book.pages);
    setEditedCategory(book.category);
  }

  function editBook() {
    AsyncStorage.getItem("users").then((users) => {
      const alteredUsers = JSON.parse(users).map((user) => {
        if (user.id === user1.id) {
          user.books = user.books.map((book) => {
            if (book.id === bookId) {
              book.title = editedTitle;
              book.author = editedAuthor;
              book.publisher = editedPublisher;
              book.publishYear = editedPublishYear;
              book.pages = editedPages;
              book.category = editedCategory;
            }
            return book;
          });
        }
        return user;
      });
      AsyncStorage.setItem("users", JSON.stringify(alteredUsers));
      store.dispatch(setUsers(alteredUsers));
      setRender(alteredUsers.find((u) => u.email === email)?.books);
      setRender(user1.books);
    });

    setEditIsOpen(false);
  }

  useEffect(() => {
    const u1 = users?.find((u) => u.email === email);
    setUser1(u1);
  }, [email]);
  
  useEffect(() => {
    setRender(user1.books);
  }, [user1.books]);

  return (
    <VStack pt={6} display="flex" flex={1} alignItems="center">
      <ScrollView w="90%">
        {render?.map((book) => (
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
            <HStack w="77%" bg="trueGray.300" justifyContent="space-between">
              <Stack px="3" py="1">
                <Stack>
                  <Heading size="md">{book.title}</Heading>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="500"
                    ml="-0.5"
                  >
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
              <Stack justifyContent="space-between" mt={-2} mr={-2}>
                <IconButton
                  icon={<Icon as={AntDesign} name="closecircleo" />}
                  _icon={{
                    color: "blue.500",
                    size: "md",
                  }}
                  onPress={() => handleDelete(book.id)}
                />
                <IconButton
                  icon={<Icon as={Entypo} name="edit" />}
                  _icon={{
                    color: "blue.500",
                    size: "md",
                  }}
                  onPress={() => handleEdit(book)}
                  mb={-2}
                />
              </Stack>
            </HStack>
          </Box>
        ))}
      </ScrollView>
      <Button
        alignSelf="center"
        w="90%"
        mb={2}
        mt={4}
        onPress={() => navigation.navigate("Categories")}
      >
        Categories
      </Button>
      <Button
        alignSelf="center"
        w="90%"
        mb={6}
        
        onPress={() => setOpen(true)}
      >
        Add new book
      </Button>

      <CustomAddModal
        isOpen={open}
        setOpen={() => setOpen(false)}
        value={value}
        onChangeText={setValue}
        handleOnPress={() => handleAddBook()}
        title="Add Book"
        author="author"
        publisher="publisher"
        publishYear="publishYear"
        pages="pages"
        category="category"
        bookName="Name"
        authorVal={author}
        publisherVal={publisher}
        publishYearVal={publishYear}
        pagesVal={pages}
        categoryVal={category}
        onChangeAuthorText={setAuthor}
        onChangePublisherText={setPublisher}
        onChangePublishYearText={setPublishYear}
        onChangePagesText={setPages}
        onChangeCategoryText={setCategory}
      />

      <CustomEditModal
        isOpen={editIsOpen}
        setOpen={() => setEditIsOpen(false)}
        value={editedTitle}
        onChangeText={setEditedTitle}
        handleOnPress={() => editBook()}
        author="author"
        publisher="publisher"
        publishYear="publishYear"
        pages="pages"
        category="category"
        bookName="Name"
        authorVal={editedAuthor}
        publisherVal={editedPublisher}
        publishYearVal={editedPublishYear}
        pagesVal={editedPages}
        categoryVal={editedCategory}
        onChangeAuthorText={setAuthor}
        onChangePublisherText={setPublisher}
        onChangePublishYearText={setPublishYear}
        onChangePagesText={setPages}
        onChangeCategoryText={setCategory}
      />
    </VStack>
  );
};

export default EditPage;
