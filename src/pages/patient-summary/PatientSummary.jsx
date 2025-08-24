import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdmissionSummaryTable } from "./components/AdmissionSummaryTable"
import { DiagnosisSummaryTable } from "./components/DiagnosisSummaryTable"
import { LabTestSummaryTable } from "./components/LabTestSummaryTable"
import { VitalSignSummaryTable } from "./components/VitalSignSummaryTable"
import {
    Activity, ClipboardList, TestTube, Hospital,
    SquareArrowOutUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"

export default function PatientSummaryPage() {
    const { patient_id, surname, first_name } = useParams()
    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Patient Summary Dashboard</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                <Card className="w-full col-span-7 pt-0">
                    <CardHeader className="pb-3 border-b bg-[#f0f8f4] pt-6 flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            Recent Vital Signs
                        </CardTitle>
                        <Button variant="outline" size="sm" className="action-view-btn">
                            <Link to={`/patient-profile/${patient_id}/${surname}/${first_name}/vital-signs`}>
                                <SquareArrowOutUpRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <VitalSignSummaryTable />
                    </CardContent>
                </Card>
                <Card className="w-full col-span-4 pt-0">
                    <CardHeader className="pb-3 border-b bg-[#f0f8f4] pt-6 flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Hospital className="h-5 w-5" />
                            Recent Admissions
                        </CardTitle>
                        <Button variant="outline" size="sm" className="action-view-btn">
                            <Link to={`/patient-profile/${patient_id}/${surname}/${first_name}/admissions`}>
                                <SquareArrowOutUpRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <AdmissionSummaryTable />
                    </CardContent>
                </Card>

                <Card className="w-full col-span-3 pt-0">
                    <CardHeader className="pb-3 border-b bg-[#f0f8f4] pt-6 flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <ClipboardList className="h-5 w-5" />
                            Recent Diagnosis
                        </CardTitle>
                        <Button variant="outline" size="sm" className="action-view-btn">
                            <Link to={`/patient-profile/${patient_id}/${surname}/${first_name}/diagnosis`}>
                                <SquareArrowOutUpRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <DiagnosisSummaryTable />
                    </CardContent>
                </Card>

                <Card className="w-full col-span-7 pt-0">
                    <CardHeader className="pb-3 border-b bg-[#f0f8f4] pt-6 flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <TestTube className="h-5 w-5" />
                            Recent Analysis/Tests
                        </CardTitle>
                        <Button variant="outline" size="sm" className="action-view-btn">
                            <Link to={`/patient-profile/${patient_id}/${surname}/${first_name}/lab-tests`}>
                                <SquareArrowOutUpRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <LabTestSummaryTable />
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}
