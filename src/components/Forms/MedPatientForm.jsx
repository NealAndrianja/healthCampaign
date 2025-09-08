import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./med-patient-form.css";
import { medPatientApi } from "../../util/api";

const initialForm = {
  id: "",
  lastName: "",
  firstName: "",
  age: "",
  months: "",
  birthDate: "",
  gender: "",
  phone: "",
  address: "",
  antecedents: {},
  motifConsultation: {},
  signesGeneraux: {},
  examenClinique: {},
  hypotheses: {},
  conduite: {},
  notes: "",
  medecin: "",
};

export default function MedecineGenerale() {
  const location = useLocation();
  const { patient, medType } = location.state || {};
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (patient) {
      setForm(prev => ({ ...prev, ...patient, medecin: medType }));
    }
  }, [patient, medType]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setForm(prev => ({
        ...prev,
        [name]: { ...prev[name], [value]: checked }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await medPatientApi.update(form.id, form);
        alert("Patient mis à jour avec succès !");
      } else {
        await medPatientApi.create(form);
        alert("Patient créé avec succès !");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'enregistrement");
    }
  };

  return (
    <div className="med-form">
      <h1>Formulaire Médecine Générale</h1>

      {/* Bloc 1: Identité */}
      <fieldset>
        <legend>Identité du patient</legend>
        <input name="id" value={form.id} readOnly placeholder="Numéro du patient"/>
        <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Nom"/>
        <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Prénom"/>
        <input name="age" value={form.age} onChange={handleChange} placeholder="Âge"/>
        <input name="months" value={form.months} onChange={handleChange} placeholder="Mois"/>
        <input type="date" name="birthDate" value={form.birthDate} onChange={handleChange}/>
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Sexe</option>
          <option value="M">M</option>
          <option value="F">F</option>
        </select>
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Contact"/>
        <input name="address" value={form.address} onChange={handleChange} placeholder="Adresse"/>
      </fieldset>

      {/* Bloc 2: Antécédents */}
      <fieldset>
        <legend>Antécédents</legend>
        {["HTA","Diabète","Drépanocytose","Épigastralgie","Asthme","Allergie médicamenteuse","Autres"].map(a => (
          <label key={a}>
            <input type="checkbox" name="antecedents" value={a} checked={form.antecedents[a] || false} onChange={handleChange}/>
            {a}
          </label>
        ))}
      </fieldset>

      {/* Bloc 3: Motif de consultation */}
      <fieldset>
        <legend>Motif de consultation</legend>
        {["Fièvre","Douleur abdominale","Toux","Fatigue","Troubles digestifs","Plaie/infection cutanée","Palpitations","Céphalée","Perte d'appétit","Autre"].map(m => (
          <label key={m}>
            <input type="checkbox" name="motifConsultation" value={m} checked={form.motifConsultation[m] || false} onChange={handleChange}/>
            {m}
          </label>
        ))}
      </fieldset>

      {/* Bloc 4: Signes généraux */}
      <fieldset>
        <legend>Signes généraux</legend>
        <input name="temperature" value={form.temperature || ""} onChange={handleChange} placeholder="Température"/>
        <input name="weight" value={form.weight || ""} onChange={handleChange} placeholder="Poids"/>
        <input name="taS" value={form.TAS || ""} onChange={handleChange} placeholder="TA Systolique (mmHg)"/>
        <input name="taD" value={form.TAD || ""} onChange={handleChange} placeholder="TA Diastolique (mmHg)"/>
        <input name="fc" value={form.FC || ""} onChange={handleChange} placeholder="FC (bpm)"/>
        <input name="fr" value={form.FR || ""} onChange={handleChange} placeholder="FR (rpm)"/>
        <input name="sao2" value={form.sao2 || ""} onChange={handleChange} placeholder="SaO2 (%)"/>
        <input name="glycemie" value={form.glycemie || ""} onChange={handleChange} placeholder="Glycémie (mmol/L)"/>
        <select name="etatGeneral" value={form.etatGeneral || ""} onChange={handleChange}>
          <option value="">État général</option>
          <option value="Bon">Bon</option>
          <option value="Moyen">Moyen</option>
          <option value="Mauvais">Mauvais</option>
        </select>
        <select name="signesGeneraux_etatConscience" value={form.signesGeneraux.etatConscience || ""} onChange={handleChange}>
          <option value="">État de conscience</option>
          <option value="Normal">Normal</option>
          <option value="Altérée">Altérée</option>
        </select>
        <select name="signesGeneraux_dehydration" value={form.signesGeneraux.dehydration || ""} onChange={handleChange}>
          <option value="">Déshydratation</option>
          <option value="Aucune">Aucune</option>
          <option value="Modérée">Modérée</option>
          <option value="Sévère">Sévère</option>
        </select>
      </fieldset>

      {/* Bloc 5: Examen clinique */}
      <fieldset>
        <legend>Examen clinique</legend>
        {["Appareil respiratoire","Appareil cardiovasculaire","Appareil digestif","Système nerveux","Peau et muqueuse","Autre signe clinique"].map(f => (
          <textarea key={f} name={`examenClinique_${f}`} value={form.examenClinique[f] || ""} onChange={handleChange} placeholder={f}/>
        ))}
      </fieldset>

      {/* Bloc 6: Hypothèse/Diagnostic */}
      <fieldset>
        <legend>Hypothèse / Diagnostic</legend>
        {["Paludisme","Infection respiratoire","Otite","Sinusite","Diarrhée/Amoebose","Gastro-entérite aiguë","Parasitose intestinale","Hypertension","Insuffisance cardiaque","BPCO","Asthme","Bronchiolite","Anémie","Malnutrition","Blessure au plaie infecté","Infection urinaire","Maladie de la peau","Syndrome grippal","Autre"].map(h => (
          <label key={h}>
            <input type="checkbox" name="hypotheses" value={h} checked={form.hypotheses[h] || false} onChange={handleChange}/>
            {h}
          </label>
        ))}
      </fieldset>

      {/* Bloc 7: Conduite à tenir */}
      <fieldset>
        <legend>Conduite à tenir</legend>
        {["Anti-paludique","Antibiotique","Antiviraux","Antifongique","Antihypertenseur","Antidiabétique","Antalgique","Antihistaminique","Corticostéroïdes","Bronchodilatateur","Antidiarrhéique","Antiparasitaire","Supplémentation","Réhydratation","Autres traitements"].map(c => (
          <label key={c}>
            <input type="checkbox" name="conduite" value={c} checked={form.conduite[c] || false} onChange={handleChange}/>
            {c}
          </label>
        ))}
      </fieldset>

      {/* Notes */}
      <fieldset>
        <legend>Notes</legend>
        <textarea name="notes" value={form.notes} onChange={handleChange}></textarea>
      </fieldset>

      <fieldset>
        <legend>Médecin</legend>
        <select name="medecin" value={form.medecin} onChange={handleChange}>
          <option value="">Choisir un médecin</option>
          <option value="MED">Médecine Générale</option>
          <option value="SBD">Soins Dentaires</option>
          <option value="OPH">Ophtalmologie</option>
          <option value="CPN">Consultation Prénatale</option>
        </select>
      </fieldset>

      <button onClick={handleSubmit}>Enregistrer</button>
    </div>
  );
}
