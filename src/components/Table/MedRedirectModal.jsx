import React from "react";
import "./modal.css";

const MED_TYPES = ["MED", "SBD", "OPH", "CPN"];

export default function MedRedirectModal({ onClose, onSelect }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Choisir le type de médecin</h2>
        <div className="modal-buttons">
          {MED_TYPES.map(type => (
            <button key={type} onClick={() => onSelect(type)}>
              {type}
            </button>
          ))}
        </div>
        <button className="modal-close" onClick={onClose}>Annuler</button>
      </div>
    </div>
  );
}
