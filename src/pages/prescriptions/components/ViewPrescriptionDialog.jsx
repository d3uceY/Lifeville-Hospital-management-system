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
    Pill,
    Download
} from "lucide-react";
import { formatDate } from "../../../helpers/formatDate";
import { getFrequencyLabel } from "../../../helpers/getFrequencyLabel";

export function ViewPrescriptionDialog({ prescription, children }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="w-[100vw] !max-w-[80vw] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <ClipboardList className="h-5 w-5" />
                        Prescription - #{prescription.prescription_id}
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
                                <InfoField label="Patient ID" value={prescription.patient_id} />
                                <InfoField label="Prescribed By" value={prescription.prescribed_by} />
                                <InfoField label="Notes" value={prescription.notes} />
                            </CardContent>
                        </Card>

                        {/* Prescription Info */}
                        <Card className="border-[#268a6461] pt-0">
                            <CardHeader className="pb-3 pt-6 bg-[#f0f8f4]">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Pill className="h-4 w-4" />
                                    Prescription Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-3">
                                <InfoField
                                    label="Prescription Date"
                                    value={formatDate(prescription.prescription_date)}
                                />
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Drugs</label>
                                    <div className="mt-2 space-y-3">
                                        {prescription.items?.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="border rounded-lg p-3 bg-gray-50"
                                            >
                                                <p className="font-medium">{item.drug_name}</p>
                                                <p className="text-sm text-gray-600">
                                                    {item.dosage} - {getFrequencyLabel(item.frequency)} - {item.duration} days
                                                </p>
                                                <p className="text-xs text-gray-500 italic">
                                                    {item.instructions}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Timeline */}
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
                title="Prescription Created"
                date={prescription.prescription_date}
                subtitle={`Prescribed by ${prescription.prescribed_by}`}
            />

            {prescription.updated_at && prescription.updated_by && (
                <TimelineItem
                    title="Prescription Updated"
                    date={prescription.updated_at}
                    subtitle={`Updated by ${prescription.updated_by}`}
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
                            Download Prescription
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
