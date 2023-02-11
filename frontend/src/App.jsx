import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Authentication from "./Authentication";
import store from "./store/store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Authentication />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
