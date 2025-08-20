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
    Bed,
    Download
} from "lucide-react";
import { formatDate } from "../../../helpers/formatDate";

export function ViewAdmissionDialog({ admission, children }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="w-[100vw] !max-w-[80vw] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <ClipboardList className="h-5 w-5" />
                        Admission - #{admission.id}
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
                                <InfoField label="Hospital Number" value={admission.hospital_number} />
                                <InfoField label="Name" value={`${admission.first_name} ${admission.other_names || ""} ${admission.surname}`} />
                                <InfoField label="Sex" value={admission.sex} />
                                <InfoField label="Date of Birth" value={formatDate(admission.date_of_birth)} />
                                <InfoField label="Phone Number" value={admission.phone_number} />
                            </CardContent>
                        </Card>

                        {/* Admission Info */}
                        <Card className="border-[#268a6461] pt-0">
                            <CardHeader className="pb-3 pt-6 bg-[#f0f8f4]">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Stethoscope className="h-4 w-4" />
                                    Admission Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-3">
                                <InfoField label="Admission Date" value={formatDate(admission.admission_date)} />
                                <InfoField label="Consultant Doctor" value={admission.consultant_doctor_name} />
                                <InfoField label="Discharge Condition" value={admission.discharge_condition} />
                                <InfoField label="Bed Number" value={admission.bed_number} />
                                <InfoField label="Bed Group" value={admission.bed_group || "Not assigned"} />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Medical Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="border-[#268a6461] pt-0">
                            <CardHeader className="pb-3 pt-6 bg-[#f0f8f4]">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <ClipboardList className="h-4 w-4" />
                                    Symptoms
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Symptom Types</label>
                                    <ul className="mt-2 list-disc list-inside space-y-1">
                                        {admission.symptom_types.map((symptom, idx) => (
                                            <li key={idx} className="text-sm">{symptom}</li>
                                        ))}
                                    </ul>
                                </div>
                                <InfoField label="Symptom Description" value={admission.symptom_description} />
                            </CardContent>
                        </Card>

                        <Card className="border-[#268a6461] pt-0">
                            <CardHeader className="pb-3 pt-6 bg-[#f0f8f4]">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <ClipboardList className="h-4 w-4" />
                                    Notes & History
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-3">
                                <InfoField label="Previous Medical Issues" value={admission.previous_medical_issue} />
                                <InfoField label="Note" value={admission.note} />
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
                                    title="Admission Created"
                                    date={admission.created_at}
                                    subtitle={`Consulted by Dr. ${admission.consultant_doctor_name}`}
                                />

                                {admission.updated_at && (
                                    <TimelineItem
                                        title="Last Updated"
                                        date={admission.updated_at}
                                        subtitle="Admission record updated"
                                    />
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button
                            variant="outline"
                            className="border-[#268a6461] hover:bg-[#e6f2ed] text-[#106041] bg-transparent"
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Download Admission Record
                        </Button>
                    </div>
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
                <p className="text-sm font-medium whitespace-pre-wrap">{value}</p>
            ) : (
                <p className="text-sm text-gray-400 italic">No data provided</p>
            )}
        </div>
    );
}

// Timeline item
function TimelineItem({ title, date, subtitle }) {
    return (
        <div className="flex items-start gap-4">
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
