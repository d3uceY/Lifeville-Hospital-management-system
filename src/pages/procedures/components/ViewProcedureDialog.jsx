import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Calendar, ClipboardList, Activity, Download } from "lucide-react";
import { formatDate } from "../../../helpers/formatDate";

export function ViewProcedureDialog({ procedure, children }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="w-[100vw] !max-w-[80vw] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <ClipboardList className="h-5 w-5" />
                        Procedure - #{procedure.id}
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
                            <div>
                                    <label className="text-sm font-medium text-gray-500">Patient Name</label>
                                    <p className="text-sm font-medium">{procedure.surname} {procedure.first_name}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Patient ID</label>
                                    <p className="text-sm font-medium">{procedure.patient_id}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Recorded By</label>
                                    <p className="text-sm font-medium">{procedure.recorded_by}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Procedure Details */}
                        <Card className="border-[#268a6461] pt-0">
                            <CardHeader className="pb-3 pt-6 bg-[#f0f8f4]">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Activity className="h-4 w-4" />
                                    Procedure Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Procedure Name</label>
                                    <p className="text-sm font-medium">{procedure.procedure_name}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Performed At</label>
                                    <p className="text-sm font-medium">
                                        {procedure.performed_at ? formatDate(procedure.performed_at) : "Not specified"}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Comments */}
                    <Card className="border-[#268a6461] pt-0">
                        <CardHeader className="pb-3 pt-6 bg-[#f0f8f4] flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <ClipboardList className="h-4 w-4" />
                                Comments
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            {procedure.comments ? (
                                <div className="p-3 bg-gray-50 rounded-lg border">
                                    <p className="text-sm">{procedure.comments}</p>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-400 italic">No comments provided</p>
                            )}
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
                                            <p className="text-sm font-medium">Procedure Recorded</p>
                                            <span className="text-xs text-gray-500">
                                                {formatDate(procedure.created_at)}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Recorded by {procedure.recorded_by}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </DialogContent>
        </Dialog>
    );
}
