import { configureStore } from "@reduxjs/toolkit";
import rolesReducer from "../Features/Roles";
import usersReduces from "../Features/Users";

export const store = configureStore({
  reducer: {
    roles: rolesReducer,
    users: usersReduces,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;