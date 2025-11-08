import { useEffect, useState, ChangeEvent, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, addUserRole, removeUserRole, setStatus } from "../Features/Users";
import type { RootState, AppDispatch } from "../Stores/store";
import { User } from "../Types/User";
import axios from "../Api/axiosInstance";
import "./Scss/Translations.scss";
import { setRoles } from "../Features/Roles";
import { IoMdSearch } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import "./Scss/Users.scss"
import { GetImageUrl } from "../Utils/General";

function Users() {
  const dispatch = useDispatch<AppDispatch>();
  const { allIds:userIds, byId:usersById, status } = useSelector((state: RootState) => state.users);
  const users = userIds.map((id) => usersById[id]);

  const { allIds: roleIds, byId: rolesById, status: roleStatus } = useSelector((state: RootState) => state.roles);
  const roles = roleIds.map((id) => rolesById[id]);

  const [error, setError] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");


  useEffect(() => {
    if (status === "idle") {
      fetchUsersWithRoles();
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (roleStatus === "idle") {
      fetchRoles()
    }
  }, [roleStatus]);

  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (value.trim()) {
        setHasSearched(true);
        searchUser(value);
      } else {
        setHasSearched(false);
        setSearchResult([])
      }
    }, 0);
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await axios.get("/role");
      dispatch(setRoles(res.data.data));
    } catch (err: any) {
      console.error(err);
    }
  };

  const fetchUsersWithRoles = async () => {
    dispatch(setStatus("loading"));
    try {
      const res = await axios.get("/user/roles");
      dispatch(setUsers(res.data.data));
      setError(null);
    } catch (err: any) {
      setError(err.message);
      dispatch(setStatus("failed"));
    }
  };

  const handleAddRoleToUser = async () => {
    if (!selectedUser || !selectedRole) return;
    try {
      const res = await axios.post(`/user/${selectedUser.id}/roles/${selectedRole}`);
      dispatch(addUserRole(res.data.data));
      setError(null);
    } catch (e: any) {
      setError(e.response?.data?.message || "Failed to add role");
    }
  };

  const handleRemoveRoleFromUser = async (userId: string, roleId: string) => {
    try {
      await axios.delete(`/user/${userId}/roles/${roleId}`);
      dispatch(removeUserRole({ userId, roleId }));
    } catch (e: any) {
      setError(e.response?.data?.message || "Failed to remove role");
    }
  };

  const searchUser = async (query: string) => {
    if (!query.trim()) {
      setSearchResult([]);
      return;
    }
    try {
      const res = await axios.get(`/user/search?query=${query}`);
      setSearchResult(res.data.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to search users");
    }
  };

  if (status === "failed") return <p style={{ color: "red" }}>Error loading users.</p>;

  return (
    <div className="Users">
      <h3>Users</h3>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div className="Search">
        <IoMdSearch
          className="Search--Glass"
        />
        <input
          type="text"
          placeholder="Search user..."
          value={searchValue}
          onChange={handleSearchChange}
        />
        {searchValue.length > 0 && (
          <IoCloseOutline
            className="Search--Close"
            onClick={() => {
              setSearchResult([]);
              setSearchValue("");
              setHasSearched(false);
            }}
          />
        )}

      </div>

      {searchResult.length > 0 ? (
        <table className="Search-Result">
          <tr>
            <th></th>
            <th>Username</th>
            <th>Email</th>
          </tr>
          {searchResult.map((u) => (
            <tr
              key={u.id}
              onClick={() => setSelectedUser(u)}
              className={selectedUser?.id == u.id ? "Selected" : ""}
            >
              <td><img src={GetImageUrl(u.avatar)} /></td>
              <td>{u.username}</td>
              <td>{u.email}</td>
            </tr>
            ))}
        </table>
      ) : searchResult.length == 0 && hasSearched ? <p>No result</p> : null}

      {/* <div className="AddRoleToUser">
        <h4>Add Role to User</h4>
        {selectedUser ? (
          <p>
            Selected User: <strong>{selectedUser.username}</strong> (ID: {selectedUser.id})
          </p>
        ) : (
          <p style={{ color: "gray" }}>Select a user above to assign a role</p>
        )}

        <select
          onChange={(e) => setSelectedRole(e.currentTarget.value)}
          value={selectedRole}
          disabled={!selectedUser || roleStatus === "loading"}
        >
          <option value="">Select Role</option>
          {roles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>

        <button onClick={handleAddRoleToUser} disabled={!selectedUser || !selectedRole}>
          Add Role
        </button>
      </div>

      <h4>Users with Roles</h4>
      {status === "loading" && <p>Loading...</p>}
      <div className="List">
        {users.map((u) => (
          <div key={u.user.id} className="Child">
            <p>{u.user.username}</p>
            <ul>
              {u.roles.map((r) => (
                <li key={r.id}>
                  {r.name}
                  <button onClick={() => handleRemoveRoleFromUser(u.user.id, r.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Users;
