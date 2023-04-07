import React, { useEffect, useState } from "react";
import "../CSS/index.css";
import version from "../../version.js";
function Footer() {
  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
  }, []);
  return (
    <footer>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Status </span>
        <span>Connected Users </span>
        <span style={{ color: "white" }}>
          {dateState.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}{" "}
        </span>
        <span style={{ color: "white" }}>
          {dateState.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          })}
        </span>
        <span style={{ backgroundColor: "white" }}>Ver: {version}</span>
      </div>
    </footer>
  );
}

export default Footer;
