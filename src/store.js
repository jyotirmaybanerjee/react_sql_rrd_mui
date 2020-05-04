import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import taskReducer from "./features/task/taskSlice";

export default configureStore({
  reducer: {
    users: userReducer,
    tasks: taskReducer,
  },
});
