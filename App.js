import React from "react";
import { Provider } from "react-redux";
import store from "./src/store"; // Path to the store
import AppNavigator from "./src/navigation/AppNavigator"; // Path to the navigator
import "./src/i18n/i18n"; // Initialize i18n

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;

