import { useQuery } from "@tanstack/react-query"
import { getVitalSignSummaryByPatientId } from "../../../providers/ApiProviders"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useParams } from "react-router-dom"

export function VitalSignSummaryTable() {
    const { patient_id } = useParams()
    const {
        data: vitalSigns,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["vitalSigns", patient_id],
        queryFn: () => getVitalSignSummaryByPatientId(patient_id),
        enabled: !!patient_id,
    })

    if (isLoading) {
        return <div className="text-center py-4">Loading vital signs...</div>
    }

    if (error) {
        return <div className="text-center py-4 text-destructive">Error loading vital signs</div>
    }

    if (!vitalSigns || vitalSigns.length === 0) {
        return <div className="text-center py-4 text-muted-foreground">No vital signs found</div>
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Vital Signs</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {vitalSigns.map((vital, index) => (
                    <TableRow key={index}>
                        <TableCell>{new Date(vital.recorded_at).toLocaleDateString()}</TableCell>
                        <TableCell>{vital.recorded_by}</TableCell>
                        <TableCell>{vital.vital_signs}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
