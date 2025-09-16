import { useQuery } from "@tanstack/react-query"
import { getLabTestSummaryByPatientId } from "../../../providers/ApiProviders"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useParams } from "react-router-dom"
import { getLabTestStatusBadge } from "../../../helpers/getLabTestStatusBadge"
import Loader from "../../../components/loader"

export function LabTestSummaryTable() {
    const { patient_id } = useParams()
    const {
        data: labTests = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["labTests", patient_id],
        queryFn: () => getLabTestSummaryByPatientId(patient_id),
        staleTime: 60 * 60 * 1000,
        enabled: !!patient_id,
    })

    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return <div className="text-center py-4 text-destructive">Error loading lab tests</div>
    }

    if (!labTests || labTests.length === 0) {
        return <div className="text-center py-4 text-muted-foreground">No lab tests found</div>
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Test Date</TableHead>
                    <TableHead>Recorded By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Test Type</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {labTests?.map((test, index) => (
                    <TableRow key={index}>
                        <TableCell>{new Date(test.test_date).toLocaleDateString()}</TableCell>
                        <TableCell>{test.consultant_doctor_name}</TableCell>
                        <TableCell>{getLabTestStatusBadge(test.status)}</TableCell>
                        <TableCell>{test.test_type}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
