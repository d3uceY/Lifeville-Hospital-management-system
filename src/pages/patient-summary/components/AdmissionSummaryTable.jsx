import { useQuery } from "@tanstack/react-query"
import { getAdmissionSummaryByPatientId } from "../../../providers/ApiProviders"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getDischargeConditionBadge } from "../../../helpers/getDischargeConditionBadge"
import { useParams } from "react-router-dom"
import Loader from "../../../components/loader"

export function AdmissionSummaryTable() {
    const { patient_id } = useParams()
    const {
        data: admissions = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["admissions", patient_id],
        queryFn: () => getAdmissionSummaryByPatientId(patient_id),
        staleTime: 60 * 60 * 1000,
        enabled: !!patient_id,
    })


    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return <div className="text-center py-4 text-destructive">Error loading admissions</div>
    }

    if (!admissions || admissions.length === 0) {
        return <div className="text-center py-4 text-muted-foreground">No admissions found</div>
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Admission Date</TableHead>
                    <TableHead>Discharge Condition</TableHead>
                    <TableHead>Doctor</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {admissions?.map((admission, index) => (
                    <TableRow key={index}>
                        <TableCell>{new Date(admission.admission_date).toLocaleDateString()}</TableCell>
                        <TableCell>{getDischargeConditionBadge(admission.discharge_condition)}</TableCell>
                        <TableCell>{admission.consultant_doctor_name}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
