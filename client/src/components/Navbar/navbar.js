// import React from 'react'
// import '../../index.css';
// function navbar() {
//   return (
//     <div className='navbar'>
//         <button>Control Station</button>
//         <button>Subscriber</button>
//         <button>Message</button>
//         <button>GPS</button>
//         <button>Mobile App</button>
//         <button>Dispatchers</button>
//         <button>Soft Clients</button>
//         <button>CS-Groups</button>
//     </div>
//   )
// }

// export default navbar
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import CustomNavLink from "./customnavbar.js";
import "../CSS/index.css";
import { useAuth } from "../Hooks/useHook.js";

export default function Navbar() {
  // const [companydrop, setcompanydrop] = useState(false);
  const location = useLocation();
  const { login, setLogin } = useAuth();
  // function dropdowncompany() {
  //   setcompanydrop(!companydrop);
  // }
  // const [userdrop, setuserdrop] = useState(false);
  // function dropdownuser() {
  //   setuserdrop(!userdrop);
  // }
  // const [licdrop, setlicdrop] = useState(false);
  // function dropdownlic() {
  //   setlicdrop(!licdrop);
  // }
  // const [agentdrop, setagentdrop] = useState(false);
  // function dropdownagent() {
  //   setagentdrop(!agentdrop);
  // }
  // const [perdrop, setperdrop] = useState(false);
  // function dropdownper() {
  //   setperdrop(!perdrop);
  // }

  // const restrictedPaths = new Set(['/', '/company/', '/agent/']);
  // if (restrictedPaths.has(location.pathname)) return null;

  return <div></div>;
}
