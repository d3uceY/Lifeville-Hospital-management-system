import { useQuery } from "@tanstack/react-query"
import { getDiagnosisSummaryByPatientId } from "../../../providers/ApiProviders"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useParams } from "react-router-dom"



export function DiagnosisSummaryTable() {
    const { patient_id } = useParams()
    const {
        data: diagnoses = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["diagnoses", patient_id],
        queryFn: () => getDiagnosisSummaryByPatientId(patient_id),
        enabled: !!patient_id,
    })

    if (isLoading) {
        return <div className="text-center py-4">Loading diagnoses...</div>
    }

    if (error) {
        return <div className="text-center py-4 text-destructive">Error loading diagnoses</div>
    }

    if (!diagnoses || diagnoses.length === 0) {
        return <div className="text-center py-4 text-muted-foreground">No diagnoses found</div>
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Diagnosis Date</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Condition</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {diagnoses.map((diagnosis, index) => (
                    <TableRow key={index}>
                        <TableCell>{new Date(diagnosis.diagnosis_date).toLocaleDateString()}</TableCell>
                        <TableCell>{diagnosis.consultant_doctor_name}</TableCell>
                        <TableCell>{diagnosis.condition}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
