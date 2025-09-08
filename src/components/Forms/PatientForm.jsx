import React, { useState, useEffect } from "react";
import "./patient-form.css";

// Liste des médecins
export const physicians = [
  { id: 1, name: "Dr HERINISOLO Leonidas Silvère Marc", shortCode: "MED", initial: "D" },
  { id: 2, name: "Dr BEZARA Rokéhel", shortCode: "MED", initial: "D" },
  { id: 3, name: "Dr ANDRIANTERANAGNA Henri Martin", shortCode: "MED", initial: "D" },
  { id: 4, name: "Dr ANDRIAMBOAVONJY RASAMUËL Raharimalala Honorette", shortCode: "OPH", initial: "H" },
  { id: 5, name: "Dr RAZERISELINA Tanteraka Hasimbola", shortCode: "SBD", initial: "T" },
  { id: 6, name: "RANDRIAMALALA Harimanda", shortCode: "CPN", initial: "M" },
];

const makeInitial = () => ({
  id: "",
  physicianId: "",
  lastName: "",
  firstName: "",
  birthDate: "",
  age: "",
  gender: "",
  phone: "",
  address: "",
  weight: "",
  height: "",
  bmi: "",
  temperature: "",
  TAS: "",
  TAD: "",
  FC: "",
  FR: "",
  sao2: "",
  glycemie: "",
  etatConscience: "",
  etatGeneral: "",
  dehydration: "",
});

// Génération de l'ID patient
const generatePatientId = (physician, number) => {
  if (!physician) return "";
  const year = new Date().getFullYear();
  const numStr = String(number).padStart(5, "0");
  return `${physician.shortCode}-${year}-TMV-${physician.initial}-${numStr}`;
};

const PatientForm = ({ onAdd }) => {
  const [form, setForm] = useState(makeInitial());
  const [counters, setCounters] = useState({}); // compteur local par médecin

  // Générer l'ID automatiquement dès que le médecin change
  useEffect(() => {
    if (!form.physicianId) return;
    const physician = physicians.find(p => p.id === parseInt(form.physicianId));
    if (!physician) return;

    const count = counters[physician.id] || 0;
    setForm(prev => ({ ...prev, id: generatePatientId(physician, count + 1) }));
  }, [form.physicianId, counters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...form, [name]: value };

    // Calcul âge
    if (name === "birthDate" && value) {
      const birth = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
      updated.age = age;
    }

    // Calcul IMC
    if ((name === "weight" || name === "height") && updated.weight && updated.height) {
      const h = parseFloat(updated.height) / 100;
      const w = parseFloat(updated.weight);
      if (h > 0 && w > 0) updated.bmi = (w / (h * h)).toFixed(2);
    }

    setForm(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.lastName || !form.firstName || !form.physicianId) {
      alert("Nom, prénom et médecin requis");
      return;
    }

    // Mettre à jour le compteur pour le médecin sélectionné
    setCounters(prev => ({
      ...prev,
      [form.physicianId]: (prev[form.physicianId] || 0) + 1
    }));

    onAdd(form);
    setForm(makeInitial());
  };

  return (
    <form className="patient-form-form" onSubmit={handleSubmit}>
      <div className="row">
        <input name="id" value={form.id} readOnly placeholder="ID Patient" />
        <select name="physicianId" value={form.physicianId} onChange={handleChange}>
          <option value="">Choisir un médecin</option>
          {physicians.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="row">
        <input name="lastName" placeholder="Nom" value={form.lastName} onChange={handleChange} required />
        <input name="firstName" placeholder="Prénom" value={form.firstName} onChange={handleChange} required />
      </div>

      <div className="row">
        <input type="date" name="birthDate" value={form.birthDate} onChange={handleChange} />
        <input name="age" placeholder="Âge" value={form.age} readOnly />
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Sexe</option>
          <option value="M">M</option>
          <option value="F">F</option>
        </select>
      </div>

      <div className="row">
        <input name="phone" placeholder="Téléphone" value={form.phone} onChange={handleChange} />
        <input name="address" placeholder="Adresse" value={form.address} onChange={handleChange} />
      </div>

      <div className="row">
        <input name="weight" placeholder="Poids (kg)" value={form.weight} onChange={handleChange} />
        <input name="height" placeholder="Taille (cm)" value={form.height} onChange={handleChange} />
        <input name="bmi" placeholder="IMC" value={form.bmi} readOnly />
        <input name="temperature" placeholder="Température" value={form.temperature} onChange={handleChange} />
      </div>

      <div className="row">
        <input name="TAS" placeholder="TA Systolique" value={form.TAS} onChange={handleChange} />
        <input name="TAD" placeholder="TA Diastolique" value={form.TAD} onChange={handleChange} />
        <input name="FC" placeholder="Fréquence cardiaque (bpm)" value={form.FC} onChange={handleChange} />
        <input name="FR" placeholder="Fréquence respiratoire (rpm)" value={form.FR} onChange={handleChange} />
      </div>

      <div className="row">
        <input name="sao2" placeholder="SaO2 (%)" value={form.sao2} onChange={handleChange} />
        <input name="glycemie" placeholder="Glycémie (mmol/L)" value={form.glycemie} onChange={handleChange} />
      </div>
      
       <div className="row">
        <select name="etatGeneral" value={form.etatGeneral} onChange={handleChange}>
          <option value="">État général</option>
          <option value="Bon">Bon</option>
          <option value="Moyen">Moyen</option>
          <option value="Mauvais">Mauvais</option>
          </select>
      </div>      

      <div className="row">
        <select name="etatConscience" value={form.etatConscience} onChange={handleChange}>
          <option value="">État de conscience</option>
          <option value="Normal">Normal</option>
          <option value="Altérée">Altérée</option>
        </select>
      </div>
      
      <div className="row">
        <select name="dehydration" value={form.dehydration} onChange={handleChange}>
          <option value="">Déshydratation</option>
          <option value="Aucune">Aucune</option>
          <option value="Modérée">Modérée</option>
          <option value="Sévère">Sévère</option>
          </select>
      </div>

      <div className="actions">
        <button type="submit">Ajouter</button>
      </div>
    </form>
  );
};

export default PatientForm;
