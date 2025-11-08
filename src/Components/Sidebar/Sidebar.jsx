import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { GrLanguage } from "react-icons/gr";
import { FaShieldAlt, FaUser } from "react-icons/fa";
import { RiMenuSearchLine } from "react-icons/ri";
import "./Scss/Sidebar.scss"

function Sidebar() {

  return (
    <div className="Sidebar">
      <h3>ShitChat Admin Panel</h3>
      <nav>
        <ul>
          <li>
            <NavLink to="/">
              <IoHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/translations">
              <GrLanguage />
              Translations
            </NavLink>
          </li>
          <li>
            <NavLink to="/roles">
              <FaShieldAlt />
              Roles
            </NavLink>
          </li>
          <li>
            <NavLink to="/users">
              <FaUser />
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/elastic">
              <RiMenuSearchLine />
              Elastic
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar;