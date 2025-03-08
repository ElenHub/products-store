import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Product Store
        </Typography>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive ? "black" : "white",
          })}
        >
          <Button color="inherit">Home</Button>
        </NavLink>
        <NavLink
          to="/cart"
          style={({ isActive }) => ({
            color: isActive ? "black" : "white",
          })}
        >
          <Button color="inherit">Cart</Button>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
