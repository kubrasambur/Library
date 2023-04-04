import HomePage from "./src/pages/HomePage";
import { NativeBaseProvider } from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import EditPage from "./src/pages/EditPage";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import Login from "./src/pages/Login";
import Signup from "./src/pages/Signup";
import BooksToRead from "./src/pages/BooksToRead";
import BooksReadInThePast from "./src/pages/BooksReadInThePast";
import LentBooks from "./src/pages/LentBooks";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerTitleAlign: "center" }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Library" component={HomePage} />
            <Stack.Screen name="Edit" component={EditPage} />
            <Stack.Screen name="BooksToRead" component={BooksToRead} />
            <Stack.Screen name="BooksReadInPast" component={BooksReadInThePast} />
            <Stack.Screen name="LentBooks" component={LentBooks} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
