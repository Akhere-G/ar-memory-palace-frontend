import React, { FC } from "react";
import Navigator from "./pages";
import { store } from "./store";
import { Provider } from "react-redux";

const App: FC = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
