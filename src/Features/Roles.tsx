import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Role } from "../Types/Role";

interface RolesState {
  byId: Record<string, Role>;
  allIds: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: RolesState = {
  byId: {},
  allIds: [],
  status: "idle",
}

export const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<Role[]>) => {
      state.byId = {};
      state.allIds = [];
      action.payload.forEach((r) => {
        state.byId[r.id] = r;
        state.allIds.push(r.id);
      });

      state.status = "succeeded";
    },
    addRole: (state, action: PayloadAction<Role>) => {
      const role = action.payload;
      state.byId[role.id] = role;
      if (!state.allIds.includes(role.id)) state.allIds.push(role.id);

      state.status = "succeeded";
    },
    deleteRole: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.byId[id];
      state.allIds = state.allIds.filter((rId) => rId !== id);

      state.status = "succeeded";
    },
    setStatus: (state, action: PayloadAction<RolesState["status"]>) => {
      state.status = action.payload;
    },
  },
})

export const { setRoles, addRole, deleteRole, setStatus } = rolesSlice.actions

export default rolesSlice.reducer