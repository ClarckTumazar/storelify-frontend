import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import logo from "./storelify-logo.svg";

const NavBar = ({ storage }) => {

const navigate = useNavigate()

const toLogout = () => {
  navigate("/welcome");
}

  return (
    <nav>
      <img className="app-logo" src={logo} alt="storelify-logo" height={32} />
      <div className="navbar-right-group">
        <div className="logout-button" onClick={toLogout}>Logout</div>
        <div className="img-icon-container"></div>  
      </div>
    </nav>
  );
};

export default NavBar;
