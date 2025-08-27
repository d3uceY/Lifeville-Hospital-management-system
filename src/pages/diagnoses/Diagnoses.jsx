import DiagnosesTable from "./components/DiagnosesTable";
import DiagnosesForm from "./components/DiagnosesForm";
import ProfileFormHeader from "../../components/profile-form-header";
import { hasPermission } from "../../helpers/hasPermission";

export default function Diagnoses() {
    return (
        <div>
            <ProfileFormHeader title="Diagnoses" description="Fill in the details to create a diagnosis" />
            {
                hasPermission(["superadmin", "doctor"]) && (
                    <DiagnosesForm />
                )
            }
            <DiagnosesTable />
        </div>
    );
}