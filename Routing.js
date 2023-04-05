import HomePage from "./src/pages/home/HomePage";
import { Button, NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import EditPage from "./src/pages/edit/EditPage";
import Login from "./src/pages/authentication/Login";
import Signup from "./src/pages/authentication/Signup";
import BooksToRead from "./src/pages/home/BooksToRead";
import BooksReadInThePast from "./src/pages/home/BooksReadInThePast";
import LentBooks from "./src/pages/home/LentBooks";
import Categories from "./src/pages/edit/Categories";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { store } from "./src/redux/store";
import { setIsLoggedIn } from "./src/redux/slices/bookSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Icon } from "native-base";

const Stack = createNativeStackNavigator();

export default function Routing() {
  const isLoggedIn = useSelector((state) => state?.library?.loggedIn);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {isLoggedIn ? (
          <Stack.Navigator
            initialRouteName="Library"
            screenOptions={{
              headerTitleAlign: "center",
              headerRight: () => (
                <Button
                  onPress={() => store.dispatch(setIsLoggedIn(false))}
                  bg="danger.700"
                  size="sm"
                  _text={{ fontWeight: "bold" }}
                  endIcon={<Icon as={MaterialCommunityIcons} name="logout" />}
                >
                  Log Out
                </Button>
              ),
            }}
          >
            <>
              <Stack.Screen name="Library" component={HomePage} />
              <Stack.Screen name="Edit" component={EditPage} />
              <Stack.Screen name="BooksToRead" component={BooksToRead} />
              <Stack.Screen
                name="BooksReadInPast"
                component={BooksReadInThePast}
              />
              <Stack.Screen name="LentBooks" component={LentBooks} />
              <Stack.Screen name="Categories" component={Categories} />
            </>
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerTitleAlign: "center",
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
