import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./patient-table.css";
import Modal from "./MedRedirectModal";

function PatientTable({ data = [], onDelete }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const navigate = useNavigate();

  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];
    const preferred = [
      "id","lastName","firstName","birthDate","age","gender",
      "phone","address","weight","height","bmi","temperature",
      "bloodPressure","pulse","consciousness"
    ];
    return preferred.filter(c => Object.prototype.hasOwnProperty.call(data[0], c));
  }, [data]);

  if (!data || data.length === 0) return <p>Aucun patient enregistré.</p>;

  const handleModifyClick = (patient) => {
    setSelectedPatient(patient);
    setModalOpen(true);
  };

  const handleRedirect = (medType) => {
    setModalOpen(false);
    navigate(`/medecine-generale`, { state: { medType, patient: selectedPatient } });
  };

  return (
    <>
      <div className="table-wrap">
        <table className="patient-table">
          <thead>
            <tr>
              {columns.map(c => <th key={c}>{c}</th>)}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.id}>
                {columns.map(c => <td key={c}>{row[c]}</td>)}
                <td className="actions-td">
                  <button className="btn-edit" onClick={() => handleModifyClick(row)}>Modifier</button>
                  <button className="btn-delete" onClick={() => onDelete(row.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen && <Modal onClose={() => setModalOpen(false)} onSelect={handleRedirect} />}
    </>
  );
}

export default PatientTable;
