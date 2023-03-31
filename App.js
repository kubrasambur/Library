import HomePage from "./src/pages/HomePage";
import { NativeBaseProvider } from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import EditPage from "./src/pages/EditPage";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import Login from "./src/pages/Login";
import Signup from "./src/pages/Signup";
import ForgotPassword from "./src/pages/ForgotPassword";

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
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
