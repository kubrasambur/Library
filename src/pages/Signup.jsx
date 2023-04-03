import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Pressable,
  Icon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { store } from "../redux/store";
import { addUser, setUsers } from "../redux/slices/bookSlice";
import { useSelector } from "react-redux";

const Signup = ({ navigation }) => {
  const users = useSelector((state) => state?.book?.users);
  console.log("users", users)

  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
   if(users){
    AsyncStorage.getItem("users").then((users) => {
      store.dispatch(setUsers(JSON.parse(users)));
    }
    );
   }else{
    AsyncStorage.setItem("users", JSON.stringify([])).then(() => {
      AsyncStorage.getItem("users").then((users) => {
        store.dispatch(setUsers(JSON.parse(users)));
      }
      );
    });
   }
  }, []);

  function handleSignup() {
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    } else {
     const user = {
        id: uuid.v4(),
        email,
        password,
        books:[]
      };
      const userExists = users?.find((u) => u.email === email);
      if (userExists) {
        alert("User already exists");
        return;
      }else{
        
        AsyncStorage.setItem("users", JSON.stringify([...users,user])).then(() => {
          alert("User created successfully");
          navigation.navigate("Login");
        });

        AsyncStorage.getItem("users").then((users) => {
          store.dispatch(setUsers(JSON.parse(users)));
        }
        );
        store.dispatch(addUser(user));

      }

    }
    }



  return (
    <VStack flex={1} w="100%" bg="white" h="100%" alignItems="center" mt={-10}>
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
          fontWeight="semibold"
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: "warmGray.200",
          }}
          fontWeight="medium"
          size="xs"
        >
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
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
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input
              type={showConfirm ? "text" : "password"}
              InputRightElement={
                <Pressable onPress={() => setShowConfirm(!showConfirm)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={showConfirm ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={handleSignup}>
            Sign up
          </Button>
        </VStack>
      </Box>
    </VStack>
  );
};

export default Signup;
