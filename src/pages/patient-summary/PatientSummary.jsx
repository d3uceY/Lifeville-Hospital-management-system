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
import ProfileFormHeader from "../../components/profile-form-header"

export default function PatientSummaryPage() {
    const { patient_id, surname, first_name } = useParams()
    return (
        <div className="container mx-auto md:p-6  space-y-6">
            <div className="space-y-4">
                <ProfileFormHeader title="Patient Summary Dashboard" description="" noID />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-7 gap-6">
                {/* Vital Signs - full width always */}
                <Card className="w-full col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-7 pt-0">
                    <CardHeader className="pb-3 border-b bg-[#f0f8f4] pt-6 flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5 shrink-0" />
                            Recent Vital Signs
                        </CardTitle>
                        <Link to={`/patient-profile/${patient_id}/${surname}/${first_name}/vital-signs`}>
                            <Button variant="outline" size="sm" className="action-view-btn">
                                <SquareArrowOutUpRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <VitalSignSummaryTable />
                    </CardContent>
                </Card>

                {/* Admissions - grows to half width on sm, 4/6 on md, 4/7 on lg */}
                <Card className="w-full col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-4 pt-0">
                    <CardHeader className="pb-3 border-b bg-[#f0f8f4] pt-6 flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Hospital className="h-5 w-5 shrink-0" />
                            Recent Admissions
                        </CardTitle>
                        <Link to={`/patient-profile/${patient_id}/${surname}/${first_name}/admissions`}>
                            <Button variant="outline" size="sm" className="action-view-btn">
                                <SquareArrowOutUpRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <AdmissionSummaryTable />
                    </CardContent>
                </Card>

                {/* Diagnosis - sits next to Admissions */}
                <Card className="w-full col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-3 pt-0">
                    <CardHeader className="pb-3 border-b bg-[#f0f8f4] pt-6 flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <ClipboardList className="h-5 w-5 shrink-0" />
                            Recent Diagnosis
                        </CardTitle>
                        <Link to={`/patient-profile/${patient_id}/${surname}/${first_name}/diagnoses`}>
                            <Button variant="outline" size="sm" className="action-view-btn">
                                <SquareArrowOutUpRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <DiagnosisSummaryTable />
                    </CardContent>
                </Card>

                {/* Lab Tests - full width again */}
                <Card className="w-full col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-7 pt-0">
                    <CardHeader className="pb-3 border-b bg-[#f0f8f4] pt-6 flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <TestTube className="h-5 w-5 shrink-0" />
                            Recent Analysis/Tests
                        </CardTitle>
                        <Link to={`/patient-profile/${patient_id}/${surname}/${first_name}/analysis`}>
                            <Button variant="outline" size="sm" className="action-view-btn">
                                <SquareArrowOutUpRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <LabTestSummaryTable />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
