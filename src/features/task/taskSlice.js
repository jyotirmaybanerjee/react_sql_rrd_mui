import { createSlice } from "@reduxjs/toolkit";
import { UserDAO } from "../../data/UserDAO";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    users: [],
    username: "",
    password: "",
    email: "",
    resetPassword: false,
    loading: false,
    error: null,
  },
  reducers: {
    createUserInit: (state) => {
      state.loading = true;
    },
    createUserFailed: (state) => {
      state.loading = false;
      state.error = "Creating user failed.";
    },
    createUserSuccess: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.loading = false;
    },
    fetchUserListInit: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserListFailed: (state, { payload }) => {
      console.warn("error- ", payload);
      state.loading = false;
      state.error = "Fetching user list failed.";
    },
    fetchUserListSuccess: (state, { payload }) => {
      state.loading = false;
      state.users = payload;
      state.error = null;
    },
  },
});

export const {
  createUserInit,
  createUserFailed,
  createUserSuccess,
  fetchUserListInit,
  fetchUserListFailed,
  fetchUserListSuccess,
} = taskSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const createUserAsync = (userObj) => (dispatch) => {
  const userDao = new UserDAO();
  userDao
    .createUser(userObj)
    .then((resp) => {
      console.log("createUserAsync- ", resp);
      dispatch(createUserSuccess(resp));
      dispatch(fetchUserListAsync());
    })
    .catch((error) => dispatch(createUserFailed(error)));
};

export const fetchUserListAsync = () => (dispatch) => {
  const userDao = new UserDAO();
  userDao
    .getUsers()
    .then((users) => {
      dispatch(fetchUserListSuccess(users));
    })
    .catch((error) => dispatch(fetchUserListFailed(error)));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUsers = (state) => state.users.users;
export const selectError = (state) => state.users.error;

export default taskSlice.reducer;
