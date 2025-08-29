// src/components/print/prints/PhysicalExaminationPrint.jsx
import React from "react";
import { formatDate } from "../../../helpers/formatDate";

export default function PhysicalExaminationPrint({ examination = {} }) {
  return (
    <div style={{ fontFamily: "serif", fontSize: "14px", lineHeight: "1.6", color: "#000" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: "20px" }}>Physical Examination Report</h2>
        <p style={{ margin: 0 }}>Examination ID: #{examination.id}</p>
        <hr style={{ marginTop: "10px" }} />
      </div>

      {/* Patient Info */}
      <Section title="Patient Information">
        <Field label="Patient Name" value={`${examination.first_name || ""} ${examination.surname || ""}`} />
        <Field label="Patient ID" value={examination.patient_id} />
        <Field label="Hospital Number" value={examination.hospital_number} />
        <Field label="Recorded By" value={examination.recorded_by} />
      </Section>

      {/* Examination Details */}
      <Section title="Examination Details">
        <Field label="Date Recorded" value={formatDate(examination.created_at)} />
      </Section>

      {/* Examination Findings */}
      <Section title="Examination Results">
        <Field label="General Appearance" value={examination.general_appearance} />
        <Field label="HEENT" value={examination.heent} />
        <Field label="Cardiovascular" value={examination.cardiovascular} />
        <Field label="Respiration" value={examination.respiration} />
        <Field label="Gastrointestinal" value={examination.gastrointestinal} />
        <Field label="Gynecology / Obstetrics" value={examination.gynecology_obstetrics} />
        <Field label="Musculoskeletal" value={examination.musculoskeletal} />
        <Field label="Neurological" value={examination.neurological} />
        <Field label="Skin" value={examination.skin} />
        <Field label="Genitourinary" value={examination.genitourinary} />
        <Field label="Findings" value={examination.findings} />
      </Section>

      {/* Timeline */}
      <Section title="Timeline">
        <Field label="Examination Recorded" value={`${formatDate(examination.created_at)} (by ${examination.recorded_by})`} />
        {examination.updated_at && (
          <Field label="Last Updated" value={formatDate(examination.updated_at)} />
        )}
      </Section>
    </div>
  );
}

/* Helpers */
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
