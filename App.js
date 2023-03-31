import HomePage from "./src/pages/HomePage";
import { NativeBaseProvider } from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import EditPage from "./src/pages/EditPage";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Library"
            screenOptions={{ headerTitleAlign: "center" }}
          >
            <Stack.Screen name="Library" component={HomePage} />
            <Stack.Screen name="Edit" component={EditPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
