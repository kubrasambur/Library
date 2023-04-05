import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import Routing from "./Routing";

export default function App() {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  );
}
