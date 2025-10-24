import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { GrLanguage } from "react-icons/gr";
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
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar;