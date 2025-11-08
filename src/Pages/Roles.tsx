import { useEffect, useState } from "react";
import { Role } from "../Types/Role"
import "./Scss/Translations.scss"
import axios from "../Api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { addRole, setRoles, setStatus, deleteRole } from "../Features/Roles";
import type { RootState, AppDispatch } from "../Stores/store";

function Roles() {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);
  const [roleName, setRoleName] = useState<string>("");
  const { allIds, byId, status } = useSelector((state: RootState) => state.roles);
  const roles = allIds.map(id => byId[id]);

  useEffect(() => {
    if (status === "idle") {
      fetchRoles();
    }
  }, [status, dispatch]);

  const fetchRoles = async () => {
    dispatch(setStatus("loading"));
    try {
      const res = await axios.get("/role");
      dispatch(setRoles(res.data.data));
      setError(null);
    } catch (err: any) {
      setError(err.message);
      dispatch(setStatus("failed"));
    }
  };
  
  const handleCreateRole = async (newItem: string) => {
    if (newItem == "") {
      return;
    }

    try {
      const res = await axios.post(`/role?name=${newItem}`);
      dispatch(addRole(res.data.data));
    } catch (e: any) {
      setError(e.response.data.message);
    }
  };

  const handleDeleteRole = async (id: string) => {
    try {
      await axios.delete(`/role/${id}`);
      dispatch(deleteRole(id));
    } catch(e: any) {
      setError(e.response.data.message);
    }
  };

  if (status === "failed") return <p style={{ color: "red" }}>Error loading roles.</p>;

  return (
    <div className="Roles">
      <h3>Roles</h3>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <input
        type="text"
        placeholder="Name of role."
        onChange={(e) => setRoleName(e.currentTarget.value)}
      />
      <button
        onClick={() => handleCreateRole(roleName)}
      >
        Create
      </button>
      <div className="List">
        <div className="Child Header">
          <p>Name</p>
        </div>
        {status == "loading" && <p>Loading...</p>}
        {roles.map((r) => (
          <div 
            key={r.id}
            className="Child" 
            style={{display: "flex"}}
          >
            <p>{r.name}</p> - <p>{r.id}</p>
            <button 
              onClick={() => handleDeleteRole(r.id)}
            >Delete</button>
          </div>
          ))}
      </div>
    </div>
  );
}

export default Roles;