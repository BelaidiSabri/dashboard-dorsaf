
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import '../../CSS/SideBar.css';

function Sidebar() {
  const navigate = useNavigate(); // useNavigate hook

  // Function to handle deconnexion
  const handleLogout = () => {
    // Add your logout logic here, e.g., removing tokens from localStorage
    localStorage.removeItem('authToken'); // Example: Remove token from localStorage
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div>
      <div id="sidebarrr">
        <header>
          <span><img src='/logo.png' style={{ width: "10rem", height: '7rem' }} alt="logo" /></span>
        </header>
        <ul className="navv">
          <li>
            <Link to="/">
              <i className="fa-solid fa-laptop"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/Accueil">
              <i className="fa-solid fa-house"></i> Fil Accueil
            </Link>
          </li>
          <li>
            <Link to="/Offer">
              <i className="fa-solid fa-money-check-dollar"></i> Mes Offres
            </Link>
          </li>
          <li>
            <Link to="/Chat">
              <i className="fa-solid fa-comment"></i> Mes Contacts
            </Link>
          </li>
        </ul>

        {/* Add Déconnexion button here */}
        <div className="logout-section">
          <button className="logout-button" onClick={handleLogout}>
            <i className="fa-solid fa-sign-out-alt"></i> Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
