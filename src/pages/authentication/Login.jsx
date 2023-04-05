import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Pressable,
  Icon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { store } from "../../redux/store";
import {
  setEmaill,
  setIsLoggedIn,
  setUsers,
} from "../../redux/slices/bookSlice";

const Login = ({ navigation }) => {
  const users = useSelector((state) => state?.library?.users);

  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (users) {
      AsyncStorage.getItem("users").then((users) => {
        store.dispatch(setUsers(JSON.parse(users)));
      });
    } else {
      AsyncStorage.setItem("users", JSON.stringify([])).then(() => {
        AsyncStorage.getItem("users").then((users) => {
          store.dispatch(setUsers(JSON.parse(users)));
        });
      });
    }
  }, []);

  function handleLogin() {
    if (email === "" || password === "") {
      alert("Please enter email and password");
      return;
    } else {
      store.dispatch(setEmaill(email));

      const user = users?.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        AsyncStorage.setItem("user", JSON.stringify(user)).then(() => {
          store.dispatch(setIsLoggedIn(true));
          navigation.navigate("Library");
        });
      } else {
        alert("User not found");
      }
    }
  }

  return (
    <VStack flex={1} w="100%" bg="white" alignItems="center" mt={-10}>
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input value={email} onChangeText={setEmail} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type={show ? "text" : "password"}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
              value={password}
              onChangeText={setPassword}
            />
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={handleLogin}>
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              I'm a new user.{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => navigation.navigate("Signup")}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  );
};

export default Login;
