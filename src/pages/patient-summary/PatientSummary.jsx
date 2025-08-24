import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdmissionSummaryTable } from "./components/AdmissionSummaryTable"
import { DiagnosisSummaryTable } from "./components/DiagnosisSummaryTable"
import { LabTestSummaryTable } from "./components/LabTestSummaryTable"
import { VitalSignSummaryTable } from "./components/VitalSignSummaryTable"

export default function PatientSummaryPage() {
    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Patient Summary Dashboard</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Admissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AdmissionSummaryTable />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Diagnosis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DiagnosisSummaryTable />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Analysis/Tests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <LabTestSummaryTable />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Vital Signs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <VitalSignSummaryTable />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
