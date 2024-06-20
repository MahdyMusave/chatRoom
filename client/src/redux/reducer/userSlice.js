import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isSuccess: true,
  user: {},
  isError: false,
};

const userSLice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, actions) {
      console.log(state, actions, "state->action");
      state.isLoading = false;
      state.isSuccess = true;
      state.user = actions.payload;
      state.isError = false;
    },
    setToken(state, actions) {
      console.log(state, actions, "state->action");
      state.isLoading = false;
      state.isSuccess = true;
      state.token = actions.payload;
      state.isError = false;
    },
    logout(state, actions) {
      state.isLoading = false;
      state.isSuccess = false;
      state.user = {};
      state.isError = actions.payload;
    },
    updateUser(state, actions) {
      state.isLoading = false;
      state.isSuccess = true;
      state.token = actions.payload;
      state.isError = false;
    },
  },
});
console.log(userSLice.actions);
export const { setUser, setToken, logout } = userSLice.actions;
export default userSLice.reducer;
