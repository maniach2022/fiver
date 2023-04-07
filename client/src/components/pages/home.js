import React from "react";
//import { Link } from 'react-router-dom';
import "../CSS/index.css";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import Sidebar from "./sidebar";
import axios from "axios";

function Home() {
  return (
    <div>
      <p>
        What is Lorem Ipsum? The standard chunk of Lorem Ipsum used since the
        1500s is reproduced below for those interested. Sections 1.10.32 and
        1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
        reproduced in their exact original form, accompanied by English versions
        from the 1914 translation by H. Rackham.
      </p>
    </div>
  );
}
export default Home;
