import './NavBar.css';
import logo from './storelify-logo.svg';

const NavBar = () => {

  return (
    <nav>
      <img className='app-logo' src={logo} alt="storelify-logo" height={32} />
      
      <div className="navbar-right-group">
        <div className="storage-counter-container">
          <div className="storage-counter"><span>0</span></div>
          <div className="counter-text"><span>MB used / 35 MB</span></div>
        </div>
        <div className="img-icon-container"></div>
      </div>
    </nav>
  );
};

export default NavBar;
