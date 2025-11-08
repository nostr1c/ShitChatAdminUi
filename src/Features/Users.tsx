import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRole } from "../Types/User";

interface UsersState {
  byId: Record<string, UserRole>;
  allIds: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: UsersState = {
  byId: {},
  allIds: [],
  status: "idle",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserRole[]>) => {
      state.byId = {};
      state.allIds = [];
      action.payload.forEach((u) => {
        state.byId[u.user.id] = u;
        state.allIds.push(u.user.id);
      });
      state.status = "succeeded";
    },
    addUserRole: (state, action: PayloadAction<UserRole>) => {
      const userRole = action.payload;
      state.byId[userRole.user.id] = userRole;
      if (!state.allIds.includes(userRole.user.id)) {
        state.allIds.push(userRole.user.id);
      }
      state.status = "succeeded";
    },
    removeUserRole: (
      state,
      action: PayloadAction<{ userId: string; roleId: string }>
    ) => {
      const { userId, roleId } = action.payload;
      const user = state.byId[userId];
      if (!user) return;

      user.roles = user.roles.filter((r) => r.id !== roleId);

      if (user.roles.length == 0) {
        delete state.byId[userId];
        state.allIds = state.allIds.filter((uId) => uId !== userId);
      }

      state.status = "succeeded";
    },
    setStatus: (state, action: PayloadAction<UsersState["status"]>) => {
      state.status = action.payload;
    },
  },
});

export const { setUsers, addUserRole, removeUserRole, setStatus } = usersSlice.actions;
export default usersSlice.reducer;