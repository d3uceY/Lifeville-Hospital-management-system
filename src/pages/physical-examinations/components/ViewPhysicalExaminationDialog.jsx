import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    User,
    Calendar,
    ClipboardList,
    FileText,
    Stethoscope,
    Download,
    Activity,
    Heart,
    Wind,
    Utensils,
    Baby,
    Dumbbell,
    Brain,
    Eye,
} from "lucide-react";
import { formatDate } from "../../../helpers/formatDate";

export function ViewPhysicalExaminationDialog({ examination, children }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="w-[100vw] !max-w-[80vw] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <ClipboardList className="h-5 w-5" />
                        Physical Examination - #{examination.id}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Patient & Examination Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="border-[#268a6461] pt-0">
                            <CardHeader className="pb-3 pt-6 bg-[#f0f8f4]">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <User className="h-4 w-4" />
                                    Patient Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">
                                        Patient Name
                                    </label>
                                    <p className="text-sm font-medium">
                                        {examination.first_name} {examination.surname}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">
                                        Patient ID
                                    </label>
                                    <p className="text-sm font-medium">{examination.patient_id}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">
                                        Recorded By
                                    </label>
                                    <p className="text-sm font-medium">{examination.recorded_by}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-[#268a6461] pt-0">
                            <CardHeader className="pb-3 pt-6 bg-[#f0f8f4]">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Stethoscope className="h-4 w-4" />
                                    Examination Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">
                                        Date Recorded
                                    </label>
                                    <p className="text-sm font-medium">
                                        {formatDate(examination.created_at)}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Examination Findings */}
                    <Card className="border-[#268a6461] pt-0">
                        <CardHeader className="pb-3 pt-6 bg-[#f0f8f4] flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <ClipboardList className="h-4 w-4" />
                                Examination Results
                            </CardTitle>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-[#268a6461] hover:bg-[#e6f2ed] text-[#106041] bg-transparent"
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                            {renderField("General Appearance", examination.general_appearance)}
                            {renderField("HEENT", examination.heent)}
                            {renderField("Cardiovascular", examination.cardiovascular)}
                            {renderField("Respiration", examination.respiration)}
                            {renderField("Gastrointestinal", examination.gastrointestinal)}
                            {renderField(
                                "Gynecology / Obstetrics",
                                examination.gynecology_obstetrics
                            )}
                            {renderField("Musculoskeletal", examination.musculoskeletal)}
                            {renderField("Neurological", examination.neurological)}
                            {renderField("Skin", examination.skin)}
                            {renderField("Findings", examination.findings)}
                        </CardContent>
                    </Card>

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
                                <div className="flex items-start gap-4">
                                    <div className="w-2 h-2 bg-[#268a64] rounded-full mt-2"></div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium">Examination Recorded</p>
                                            <span className="text-xs text-gray-500">
                                                {formatDate(examination.created_at)}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Recorded by {examination.recorded_by}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button
                            variant="outline"
                            className="border-[#268a6461] hover:bg-[#e6f2ed] text-[#106041] bg-transparent"
                        >
                            Print Report
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

// Helper to render each field in a styled block
function renderField(label, value) {
    return (
        <div>
            <label className="text-sm font-medium text-gray-500">{label}</label>
            {value ? (
                <div className="p-3 bg-gray-50 rounded-lg border mt-1">
                    <p className="text-sm">{value}</p>
                </div>
            ) : (
                <p className="text-sm text-gray-400 italic mt-1">No data provided</p>
            )}
        </div>
    );
}
