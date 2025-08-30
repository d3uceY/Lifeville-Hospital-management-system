import React from "react";
import { formatDate } from "../../../helpers/formatDate";
import { getFrequencyLabel } from "../../../helpers/getFrequencyLabel";

export default function PrescriptionPrint({ prescription = {} }) {
  return (
    <div
      style={{
        fontFamily: "serif",
        fontSize: "14px",
        lineHeight: "1.6",
        color: "#000",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: "20px" }}>Prescription</h2>
        <p style={{ margin: 0 }}>Prescription ID: #{prescription.prescription_id}</p>
        <hr style={{ marginTop: "10px" }} />
      </div>

      {/* Patient Information */}
      <Section title="Patient Information">
        <Field label="Hospital Number" value={prescription.hospital_number} />
        <Field label="Patient ID" value={prescription.patient_id} />
        <Field label="Prescribed By" value={prescription.prescribed_by} />
        <Field label="Notes" value={prescription.notes} />
      </Section>

      {/* Prescription Details */}
      <Section title="Prescription Details">
        <Field label="Prescription Date" value={formatDate(prescription.prescription_date)} />
        <div style={{ marginTop: 10 }}>
          <strong>Drugs:</strong>
          {prescription.items?.length > 0 ? (
            <ul style={{ marginTop: 8, paddingLeft: 20 }}>
              {prescription.items.map((item, idx) => (
                <li key={idx} style={{ marginBottom: 8 }}>
                  <p style={{ margin: 0, fontWeight: "bold" }}>{item.drug_name}</p>
                  <p style={{ margin: "2px 0", fontSize: "13px" }}>
                    {item.dosage} - {getFrequencyLabel(item.frequency)} - {item.duration} days
                  </p>
                  {item.instructions && (
                    <p style={{ margin: 0, fontSize: "12px", fontStyle: "italic", color: "#555" }}>
                      {item.instructions}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: "#777" }}>No drugs prescribed</p>
          )}
        </div>
      </Section>

      {/* Timeline */}
      <Section title="Timeline">
        <Field label="Prescription Created" value={formatDate(prescription.prescription_date)} />
        {prescription.updated_at && prescription.updated_by && (
          <Field
            label="Last Updated"
            value={`${formatDate(prescription.updated_at)} (by ${prescription.updated_by})`}
          />
        )}
      </Section>
    </div>
  );
}

/* Helpers */
function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <h3 style={{ marginBottom: 8, fontSize: 16, borderBottom: "1px solid #ccc" }}>
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <p style={{ margin: "4px 0", color: value ? "#000" : "#666" }}>
      <strong>{label}:</strong>{" "}
      {value ?? <span style={{ color: "#777" }}>N/A</span>}
    </p>
  );
}
