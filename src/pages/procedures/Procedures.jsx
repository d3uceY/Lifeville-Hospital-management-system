import ProceduresTable from "./components/ProcedureTable";
import ProfileProcedureForm from "./components/ProcedureForm";
import ProfileFormHeader from "../../components/profile-form-header";
export default function Procedures() {
    return (
        <div>
            <ProfileFormHeader title="Procedures" description="Manage procedures" />
            <ProfileProcedureForm />
            <ProceduresTable />
        </div>
    )
}
