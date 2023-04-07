import React from "react";
import { NavLink } from "react-router-dom";
import "../CSS/navlink.css";

const CustomNavLink = ({ disabled, ...rest }) => {
  if (disabled) {
    return <span className="link headings disabled">{rest.children}</span>;
  } else {
    return (
      <NavLink
        {...rest}
        className={({ isActive }) =>
          `link ${isActive ? "activeheadings" : "headings"}`
        }
      />
    );
  }
};

export default CustomNavLink;
