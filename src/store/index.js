import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./reducers"; // We will create this later

// Example of a simple reducer, replace with actual reducers later
const initialUserState = { user: null, loading: false, error: null };
const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    // Define actions later
    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    user: userReducer, // Example reducer
    // Add other reducers here as the app grows
  },
});

export default store;

