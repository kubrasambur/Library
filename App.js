import HomePage from "./src/pages/HomePage";
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <HomePage />
    </NativeBaseProvider>
  );
}
