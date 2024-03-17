
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";



const HeaderMenuContent = ({ float = "" }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') !== null);
  // const userFirstName = localStorage.getItem('userFirstName');

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userFirstName');
    localStorage.removeItem('userLastName');
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <ul
      id="respMenu"
      className="ace-responsive-menu text-end d-lg-block d-none"
      data-menu-style="horizontal"
    >

      <li className="last">
        <Link
          to="/"
          className={pathname === "/" ? "ui-active" : undefined}
        >
          All Events
        </Link>
      </li>
      {/* End .dropitem */}



      <li className={`list-inline-item list_s ${float}`}>
        {isAuthenticated ? (
          <></>
        ) : (
          <Link
            to="/register"
            className={pathname === "/register" ? "ui-active" : undefined}
          >
            Sign Up
          </Link>
        )}

      </li>
      {/* End .dropitem */}

      <li className={`list-inline-item list_s ${float}`}>
        {isAuthenticated ? (
          <>
            <p className="user-greeting">
              <span className="user-greeting-line"></span>
              Hey, {localStorage.getItem('userFirstName')}
            </p>
          </>
        ) : (
          <></>
        )}

      </li>
      {/* End .dropitem */}

      <li className={`list-inline-item add_listing ${float}`}>

        {isAuthenticated ? (
          <button className="dn-lg flaticon-user" onClick={handleSignOut}>Sign Out</button>
        ) : (
          <Link to="/login">
            <span className="dn-lg flaticon-user"> Sign In</span>
          </Link>
        )}
      </li>
      {/* End .dropitem */}
    </ul>
  );
};

export default HeaderMenuContent;
