import React from "react";
import { formatDate } from "../../../helpers/formatDate";

export default function LabTestResultPrint({ testResult = {} }) {
  return (
    <div style={{ fontFamily: "serif", fontSize: "14px", lineHeight: "1.6", color: "#000" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: "20px" }}>Lab Test Report</h2>
        <p style={{ margin: 0 }}>Test ID: #{testResult.id}</p>
        <hr style={{ marginTop: "10px" }} />
      </div>

      <Section title="Patient Information">
        <Field label="Hospital Number" value={testResult.hospital_number} />
        <Field label="Patient ID" value={testResult.patient_id} />
        <Field label="Name" value={`${testResult.first_name || ""} ${testResult.surname || ""}`} />
      </Section>

      <Section title="Test Information">
        <Field label="Test Type" value={testResult.test_type} />
        <Field label="Prescribed By" value={testResult.prescribed_by} />
        <Field label="Status" value={testResult.status} />
      </Section>

      <Section title="Test Results">
        {testResult.results ? (
          <div style={{ padding: "12px", background: "#f9f9f9", border: "1px solid #ccc", borderRadius: 4 }}>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: "13px" }}>{testResult.results}</pre>
          </div>
        ) : (
          <p style={{ color: "#777" }}>No results available yet</p>
        )}
      </Section>

      {testResult.comments && (
        <Section title="Comments & Notes">
          <p>{testResult.comments}</p>
        </Section>
      )}

      <Section title="Timeline">
        <Field label="Test Ordered" value={formatDate(testResult.created_at)} />
        {testResult.updated_at !== testResult.created_at && (
          <Field label="Last Updated" value={formatDate(testResult.updated_at)} />
        )}
        {testResult.status === "completed" && (
          <Field label="Completed On" value={formatDate(testResult.updated_at)} />
        )}
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
