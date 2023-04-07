import React, { useState } from "react";
import "../CSS/index.css";
//import ChangePassword from "../pages/changePassword";
import AnnouncementConfiguration from "../pages/announcementConfiguration";

function Header() {
  return (
    <div style={{ backgroundColor: "#FFFFE0", fontWeight: "bold" }}>
      <p></p>
      <div
        style={{
          backgroundColor: "#618685",
          paddingTop: "5px",
          paddingBottom: "5px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        &nbsp;&nbsp;&nbsp;
        <div className="dropdown">
          <span className="dropdownSpan">File</span>
          <div className="dropdown-content">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <button>Logout</button>
              <button>Full Screen</button>
              <button>Limited Screen</button>
              <button>Exit</button>
            </div>
          </div>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <div className="dropdown">
          <span className="dropdownSpan">Settings</span>
          <div className="dropdown-content">
            <div style={{ display: "flex", flexDirection: "column" }}></div>
          </div>
        </div>
        &nbsp;&nbsp;&nbsp;
        <div></div>
      </div>
    </div>
  );
}

export default Header;
