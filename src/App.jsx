import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Patients from "./pages/patients/Patients";
import Pharmacie from "./pages/Pharmacie/Pharmacie";
import SoinsDentaires from "./pages/SoinsDentaires/SoinsDentaires";
import ConsultationsPrenatales from "./pages/ConsultationsPrenatales/ConsultationsPrenatales";
import Ophtalmo from "./pages/Ophtalmo/Ophtalmo";
import MedecineGenerale from "./pages/MedecineGenerale/MedecineGenerale";
import Layout from "./components/Layout";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <h1>Bienvenue sur la Campagne Médicale</h1>
            </Layout>
          }
        />
        <Route
          path="/patients"
          element={
            <Layout>
              <Patients />
            </Layout>
          }
        />
        <Route
          path="/medecine-generale"
          element={
            <Layout>
              <MedecineGenerale />
            </Layout>
          }
        />
        <Route
          path="/ophtalmo"
          element={
            <Layout>
              <Ophtalmo />
            </Layout>
          }
        />
        <Route
          path="/soins-dentaires"
          element={
            <Layout>
              <SoinsDentaires />
            </Layout>
          }
        />
        <Route
          path="/consultations-prenatales"
          element={
            <Layout>
              <ConsultationsPrenatales />
            </Layout>
          }
        />
        <Route
          path="/pharmacie"
          element={
            <Layout>
              <Pharmacie />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
