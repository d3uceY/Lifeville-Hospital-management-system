import DiagnosesTable from "./components/DiagnosesTable";
import DiagnosesForm from "./components/DiagnosesForm";

export default function Diagnoses() {
    return (
        <div>
            <DiagnosesForm />
            <DiagnosesTable />
        </div>
    );
}