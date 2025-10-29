import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router"
import "./layout.css";


const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">Campagne Médicale</h2>
        <nav className="sidebar-nav">
          <Link to="/patients" className="sidebar-link">Patients</Link>
          <Link to="/medecine-generale" className="sidebar-link">Médecine Générale</Link>
          <Link to="/ophtalmo" className="sidebar-link">Ophtalmologie</Link>
          <Link to="/soins-dentaires" className="sidebar-link">Soins Dentaires</Link>
          <Link to="/consultations-prenatales" className="sidebar-link">Consultations Prénatales</Link>
          <Link to="/pharmacie" className="sidebar-link">Pharmacie</Link>
        </nav>
      </div>


      {/* Content */}
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
