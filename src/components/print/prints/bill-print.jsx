import React from "react";
import { formatDate } from "../../../helpers/formatDate";
import { formatToNaira } from "../../../helpers/formatToNaira";

export default function BillPrint({ bill = {} }) {
  return (
    <div
      style={{
        fontFamily: "serif",
        fontSize: "14px",
        lineHeight: "1.6",
        color: "#000",
        padding: "10px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: "22px" }}>Hospital Bill Receipt</h2>
        <p style={{ margin: 0 }}>Bill Number: #{bill.billNumber || bill.bill_number || "N/A"}</p>
        <hr style={{ marginTop: "10px", borderTop: "2px solid #000" }} />
      </div>

      {/* Patient Info */}
      <Section title="Patient Information">
        <Field label="Patient Name" value={bill.patientName || bill.patient_name || "N/A"} />
        <Field label="Patient ID" value={bill.patientId || bill.patient_id || "N/A"} />
        <Field label="Hospital Number" value={bill.hospitalNumber || bill.hospital_number || "N/A"} />
      </Section>

      {/* Bill Info */}
      <Section title="Bill Information">
        <Field label="Bill Date" value={formatDate(bill.billDate || bill.bill_date || "N/A")} />
        <Field label="Issued By" value={bill.issuedBy || bill.issued_by || "N/A"} />
        {bill.updatedBy && (
          <Field
            label="Updated By"
            value={`${bill.updatedBy} on ${formatDate(bill.updatedAt || bill.updated_at || "N/A")}`}
          />
        )}
      </Section>

      {/* Items Table */}
      <Section title="Bill Items">
        {bill.items?.length > 0 ? (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
              fontSize: "13px",
            }}
          >
            <thead>
              <tr style={{ background: "#f5f5f5" }}>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Unit Price</th>
                <th style={thStyle}>Quantity</th>
                <th style={{ ...thStyle, textAlign: "right" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {bill.items.map((item, idx) => (
                <tr key={idx}>
                  <td style={tdStyle}>{item.description}</td>
                  <td style={tdStyle}>{formatToNaira(item.unitPrice || item.unit_price || "N/A")}</td>
                  <td style={tdStyle}>{item.quantity}</td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>
                    {formatToNaira(
                      (Number(item.unitPrice || item.unit_price || "N/A") * item.quantity).toString()
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: "#777" }}>No items found</p>
        )}
      </Section>

      {/* Financial Summary */}
      <Section title="Financial Summary">
        <div style={{ maxWidth: "300px", marginLeft: "auto" }}>
          <SummaryRow label="Subtotal" value={formatToNaira(bill.subtotal || bill.sub_total || "N/A")} />
          <SummaryRow
            label="Discount"
            value={`- ${formatToNaira(bill.discount || bill.discount || "N/A")}`}
          />
          <SummaryRow label="Tax" value={formatToNaira(bill.tax || bill.tax || "N/A")} />
          <hr style={{ margin: "6px 0", borderTop: "1px solid #999" }} />
          <SummaryRow
            label="Total Amount"
            value={formatToNaira(bill.totalAmount || bill.total_amount || "N/A")}
            bold
          />
          <SummaryRow
            label="Amount Paid"
            value={formatToNaira(bill.amountPaid || bill.amount_paid || "N/A")}
          />
          <SummaryRow
            label="Balance"
            value={formatToNaira(
              (bill.totalAmount - bill.amountPaid || bill.total_amount - bill.amount_paid).toString()
            )}
          />
        </div>
      </Section>

      {/* Payment Info */}
      <Section title="Payment Information">
        <Field label="Status" value={bill.status} />
        <Field
          label="Payment Method"
          value={(bill.paymentMethod || bill.payment_method)?.replace("_", " ")}
        />
        <Field
          label="Payment Date"
          value={(bill.paymentDate || bill.payment_date) ? formatDate(bill.paymentDate || bill.payment_date || "N/A") : "N/A"}
        />
        {bill.notes && (
          <div style={{ marginTop: "10px" }}>
            <strong>Notes:</strong>
            <p style={{ margin: 0 }}>{bill.notes}</p>
          </div>
        )}
      </Section>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: "30px", fontSize: "12px" }}>
        <p>Thank you for choosing our hospital.</p>
      </div>
    </div>
  );
}

/* Helpers */
function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h3
        style={{
          marginBottom: 8,
          fontSize: 15,
          borderBottom: "1px solid #ccc",
          paddingBottom: 4,
        }}
      >
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <p style={{ margin: "3px 0", color: value ? "#000" : "#666" }}>
      <strong>{label}:</strong>{" "}
      {value ?? <span style={{ color: "#777" }}>N/A</span>}
    </p>
  );
}

function SummaryRow({ label, value, bold }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "3px 0",
        fontWeight: bold ? "bold" : "normal",
      }}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "6px 8px",
  borderBottom: "1px solid #ccc",
};

const tdStyle = {
  padding: "6px 8px",
  borderBottom: "1px solid #eee",
};
