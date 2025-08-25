import ProceduresTable from "./components/ProcedureTable";
import ProfileProcedureForm from "./components/ProcedureForm";
import ProfileFormHeader from "../../components/profile-form-header";
import { hasPermission } from "../../helpers/hasPermission";
export default function Procedures() {
    return (
        <div>
            <ProfileFormHeader title="Procedures" description="Manage procedures" />
            {
                hasPermission(["superadmin", "doctor", "nurse"]) && (
                    <ProfileProcedureForm />
                )
            }
            <ProceduresTable />
        </div>
    )
}
