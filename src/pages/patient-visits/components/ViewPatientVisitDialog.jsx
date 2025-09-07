import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Calendar, Stethoscope, ClipboardList } from "lucide-react"
import { formatDate } from "../../../helpers/formatDate"

export function ViewPatientVisitDialog({ visit, children }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="w-[100vw] !max-w-[60vw] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <ClipboardList className="h-5 w-5 shrink-0" />
                        Patient Visit - #{visit.id}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Patient & Visit Info */}
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
                                    <label className="text-sm font-medium text-gray-500">Patient Name</label>
                                    <p className="text-sm font-medium">
                                        {visit.patient_first_name} {visit.patient_surname}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Hospital Number</label>
                                    <p className="text-sm font-medium">{visit.hospital_number}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Phone Number</label>
                                    <p className="text-sm font-medium">{visit.patient_phone_number}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-[#268a6461] pt-0">
                            <CardHeader className="pb-3 pt-6 bg-[#f0f8f4]">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Stethoscope className="h-4 w-4" />
                                    Visit Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Doctor</label>
                                    <p className="text-sm font-medium">{visit.doctor_name ?? "N/A"}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Purpose</label>
                                    <p className="text-sm font-medium">{visit.purpose}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Recorded By</label>
                                    <p className="text-sm font-medium">{visit.recorded_by}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Date Recorded</label>
                                    <p className="text-sm font-medium">{formatDate(visit.created_at)}</p>
                                </div>
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
                                <div className="flex items-start gap-4">
                                    <div className="w-2 h-2 bg-[#268a64] rounded-full mt-2"></div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium">Visit Recorded</p>
                                            <span className="text-xs text-gray-500">{formatDate(visit.created_at)}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Recorded by {visit.recorded_by}</p>
                                    </div>
                                </div>

                                {visit.updated_at && visit.updated_at !== visit.created_at && (
                                    <div className="flex items-start gap-4">
                                        <div className="w-2 h-2 bg-[#268a64] rounded-full mt-2"></div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium">Last Updated</p>
                                                <span className="text-xs text-gray-500">{formatDate(visit.updated_at)}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Updated by {visit.updated_by || "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </DialogContent>
        </Dialog>
    )
}
