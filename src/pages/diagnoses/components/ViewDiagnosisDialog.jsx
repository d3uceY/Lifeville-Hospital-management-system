import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    User,
    Calendar,
    ClipboardList,
    Stethoscope,
    Download
} from "lucide-react";
import { formatDate } from "../../../helpers/formatDate";

export function ViewDiagnosisDialog({ diagnosis, children }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="w-[100vw] !max-w-[80vw] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <ClipboardList className="h-5 w-5" />
                        Diagnosis - #{diagnosis.diagnosis_id}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Patient Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="border-[#268a6461] pt-0">
                            <CardHeader className="pb-3 pt-6 bg-[#f0f8f4]">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <User className="h-4 w-4" />
                                    Patient Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-3">
                                <InfoField
                                    label="Patient Name"
                                    value={`${diagnosis.first_name} ${diagnosis.surname}`}
                                />
                                <InfoField label="Hospital Number" value={diagnosis.hospital_number} />
                                <InfoField label="Patient ID" value={diagnosis.patient_id} />
                                <InfoField label="Recorded By" value={diagnosis.recorded_by} />
                            </CardContent>
                        </Card>

                        {/* Diagnosis Info */}
                        <Card className="border-[#268a6461] pt-0">
                            <CardHeader className="pb-3 pt-6 bg-[#f0f8f4]">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Stethoscope className="h-4 w-4" />
                                    Diagnosis Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-3">
                                <InfoField
                                    label="Date Recorded"
                                    value={formatDate(diagnosis.diagnosis_date)}
                                />
                                <InfoField label="Condition" value={diagnosis.condition} />
                                <InfoField label="Notes" value={diagnosis.notes} />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Timeline */}
                    <Card className="border-[#268a6461] pt-0">
                        <CardHeader className="pb-3 pt-6 bg-[#f0f8f4]">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Calendar className="h-4 w-4" />
                                Timeline
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="space-y-4">
                                <TimelineItem
                                    title="Diagnosis Recorded"
                                    date={diagnosis.diagnosis_date}
                                    subtitle={`Recorded by ${diagnosis.recorded_by}`}
                                />
                            </div>
                            {
                                (diagnosis.updated_at && diagnosis.updated_by) && (
                                    <TimelineItem
                                        title="Diagnosis Updated"
                                        date={diagnosis.updated_at}
                                        subtitle={`Updated by ${diagnosis.updated_by}`}
                                    />
                                )
                            }
                        </CardContent>
                    </Card>
                </div>
            </DialogContent>
        </Dialog>
    );
}

// Info field block
function InfoField({ label, value }) {
    return (
        <div>
            <label className="text-sm font-medium text-gray-500">{label}</label>
            {value ? (
                <p className="text-sm font-medium">{value}</p>
            ) : (
                <p className="text-sm text-gray-400 italic">No data provided</p>
            )}
        </div>
    );
}

// Timeline item
function TimelineItem({ title, date, subtitle }) {
    return (
        <div className="flex items-start gap-4 mt-2">
            <div className="w-2 h-2 bg-[#268a64] rounded-full mt-2"></div>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{title}</p>
                    <span className="text-xs text-gray-500">{formatDate(date)}</span>
                </div>
                {subtitle && (
                    <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
                )}
            </div>
        </div>
    );
}
