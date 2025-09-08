import React, { useEffect, useState } from "react";
import { getPatients, createPatient, updatePatient, deletePatient } from "../../util/api";
import "./patient.css";
import PatientForm from "../../components/Forms/PatientForm";
import PatientTable from "../../components/Table/PatientTable";

export default function Patient() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await getPatients();
      setPatients(data);
    } catch (err) {
      console.error("Failed to fetch patients", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleAdd = async (p) => {
    try {
      const created = await createPatient(p);
      setPatients((s) => [...s, created]);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout");
    }
  };

  const handleUpdate = async (id, partial) => {
    try {
      const updated = await updatePatient(id, partial);
      setPatients((s) => s.map((r) => (String(r.id) === String(id) ? updated : r)));
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la modification");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce patient ?")) return;
    try {
      await deletePatient(id);
      setPatients((s) => s.filter((r) => String(r.id) !== String(id)));
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className="patient-page">
      <div className="patient-form">
        <h2>Ajouter un Patient</h2>
        <PatientForm onAdd={handleAdd} />
      </div>

      <div className="patient-table">
        <h2>Liste des Patients</h2>
        {loading ? <p>Chargement...</p> : (
          <PatientTable
            data={patients}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

