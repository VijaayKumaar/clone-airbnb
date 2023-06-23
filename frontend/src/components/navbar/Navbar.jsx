

import * as React from "react";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import "./navbar.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import ReservationList from "./Userinfo"
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showReservations, setShowReservations] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout(); 
  };

  const handleShowReservations = () => {
    handleClose();
    setShowReservations(true);
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">
            <img
              src="https://hello.pricelabs.co/wp-content/uploads/2021/04/Airbnb-Logo.png"
              style={{ width: "130px" }}
              alt="Airbnb Logo"
            />
          </span>
        </Link>
        <div
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className="profile-menu-flex"
        >
          <MenuRoundedIcon />
          <AccountCircleRoundedIcon />
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          sx={{
            ".MuiPaper-root": {
              minWidth: "200px",
              borderRadius: "1rem",
              boxShadow: "0 1px 2px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 5%)",
            },
          }}
        >
          {user ? (
            [
              <MenuItem key="username" className="menu-items">
                {user.username}
              </MenuItem >,
            
              <MenuItem key="reservations"  className="menu-items" style={{textDecoration:"none"}} >
                <Link to ="./reservations" style={{ textDecoration: "none",color: "black" }}>
                Your Reservations
                </Link>
              </MenuItem>,
              <MenuItem key="logout" onClick={handleLogout} className="menu-items">
                Logout
              </MenuItem>
            ]
          ) : (
            [
              <MenuItem
                key="login"
                onClick={() => {
                  handleClose();
                  window.location.href = "/login";
                }}
                className="menu-items"
              >
                Login
              </MenuItem>,
              <MenuItem
                key="register"
                onClick={() => {
                  handleClose();
                  window.location.href = "/register";
                }}
                className="menu-items"
              >
                Register
              </MenuItem>
            ]
          )}
          <div
            style={{
              height: "1px",
              backgroundColor: "var(--grey)",
              width: "100%",
            }}
          />
          <MenuItem onClick={handleClose} className="menu-items">
            Airbnb Your Home
          </MenuItem>
          <MenuItem onClick={handleClose} className="menu-items">
            Host an experience
          </MenuItem>
          <MenuItem onClick={handleClose} className="menu-items">
            Help
          </MenuItem>
        </Menu>
      </div>
      {showReservations && <ReservationList />}
    </div>
  );
};

export default Navbar;

