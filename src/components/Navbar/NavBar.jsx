import React from "react";
import { Link, useNavigate } from "react-router-dom";
function NavBar() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    // localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <>
      <div>
        <nav className="navbar">
          <div>
            <Link to="/">Header</Link>
          </div>
          <div>
            <ul className="nav-list">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/form">Form</Link>
              </li>

              <li>
                <button
                  onClick={handleLoginClick}
                  style={{
                    display: localStorage.getItem("isAuthenticated")
                      ? "none"
                      : "block",
                  }}
                >
                  Login
                </button>

                <button
                  onClick={handleLogout}
                  style={{
                    display: localStorage.getItem("isAuthenticated")
                      ? "block"
                      : "none",
                  }}
                >
                  Logout
                </button>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}

export default NavBar;
