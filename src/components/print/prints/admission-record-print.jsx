// src/components/print/prints/AdmissionRecordPrint.jsx
import React from "react";
import { formatDate } from "../../../helpers/formatDate";

export default function AdmissionRecordPrint({ admission = {}, dischargeSummary = [] }) {
  return (
    <div style={{ fontFamily: "serif", fontSize: "14px", lineHeight: "1.6", color: "#000" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: "20px" }}>Admission Record</h2>
        <p style={{ margin: 0 }}>Hospital Admission ID: #{admission.id}</p>
        <hr style={{ marginTop: "10px" }} />
      </div>

      <Section title="Patient Information">
        <Field label="Hospital Number" value={admission.hospital_number} />
        <Field label="Name" value={`${admission.first_name || ""} ${admission.other_names || ""} ${admission.surname || ""}`} />
        <Field label="Sex" value={admission.sex} />
        <Field label="Date of Birth" value={formatDate(admission.date_of_birth)} />
        <Field label="Phone Number" value={admission.phone_number} />
      </Section>

      <Section title="Admission Details">
        <Field label="Admission Date" value={formatDate(admission.admission_date)} />
        <Field label="Consultant Doctor" value={admission.consultant_doctor_name} />
        <Field label="Bed Number" value={admission.bed_number} />
        <Field label="Discharge Condition" value={admission.discharge_condition} />
      </Section>

      {dischargeSummary && dischargeSummary.length > 0 && (
        <Section title="Discharge Summary">
          {dischargeSummary.map((d, idx) => (
            <div key={d.id ?? idx} style={{ marginBottom: 16 }}>
              <Field label="Discharge Date & Time" value={formatDate(d.discharge_date_time)} />
              <Field label="Condition at Discharge" value={d.condition} />
              <Field label="Discharging Doctor" value={d.doctor_name} />
              <Field label="Final Diagnosis" value={d.final_diagnosis} />
              <Field label="Outcome" value={d.outcome} />
              <Field label="Diagnosis Details" value={d.diagnosis_details} />
              <Field label="Treatment Given" value={d.treatment_given} />
              <Field label="Follow-up Instructions" value={d.follow_up} />
              <Field label="Summary Created" value={formatDate(d.created_at)} />
              {dischargeSummary.length > 1 && idx < dischargeSummary.length - 1 && (<hr style={{ margin: "12px 0" }} />)}
            </div>
          ))}
        </Section>
      )}

      <Section title="Symptoms">
        {admission.symptom_types?.length > 0 && (
          <div>
            <strong>Types:</strong>
            <ul style={{ margin: "6px 0 12px 20px" }}>
              {admission.symptom_types.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        )}
        <Field label="Description" value={admission.symptom_description} />
      </Section>

      <Section title="Notes & History">
        <Field label="Previous Medical Issues" value={admission.previous_medical_issue} />
        <Field label="Note" value={admission.note} />
      </Section>

      <Section title="Timeline">
        <Field label="Admission Created" value={`${formatDate(admission.created_at)} (${admission.consultant_doctor_name || 'N/A'})`} />
        {dischargeSummary && dischargeSummary[0] && (
          <Field label="Patient Discharged" value={`${formatDate(dischargeSummary[0].discharge_date_time)} (Dr. ${dischargeSummary[0].doctor_name}, ${dischargeSummary[0].condition})`} />
        )}
        <Field label="Last Updated" value={formatDate(admission.updated_at)} />
      </Section>
    </div>
  );
}

/* helpers */
function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <h3 style={{ marginBottom: 8, fontSize: 16, borderBottom: "1px solid #ccc" }}>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <p style={{ margin: "4px 0", color: value ? "#000" : "#666" }}>
      <strong>{label}:</strong> {value ?? <span style={{ color: "#777" }}>N/A</span>}
    </p>
  );
}
