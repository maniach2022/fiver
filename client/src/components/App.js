import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./CSS/global.css";
import Login from "./pages/login";
import Header from "./Header/header";
import Sidebar from "./pages/sidebar";
import Footer from "./Footer/footer";
import Navbar from "./Navbar/navbar";

function App() {
  return (
    <div className="mainback">
      <div className="toppart">
        <Header />
        <Navbar />
      </div>
      <div className="bottompart">
        <div className="routarea">
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </div>

        <div>
          <Sidebar />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
