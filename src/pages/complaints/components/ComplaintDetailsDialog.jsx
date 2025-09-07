import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Calendar, FileText, ClipboardList } from "lucide-react"
import { formatDate } from "../../../helpers/formatDate"

export function ComplaintDetailsDialog({ complaint, children }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="w-[100vw] !max-w-[60vw] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <ClipboardList className="h-5 w-5 shrink-0" />
                        Complaint Details - #{complaint.id}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Patient & Complaint Info */}
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
                                        {complaint.first_name} {complaint.surname}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Patient ID</label>
                                    <p className="text-sm font-medium">{complaint.patient_id}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-[#268a6461] pt-0">
                            <CardHeader className="pb-3 pt-6 bg-[#f0f8f4]">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <FileText className="h-4 w-4" />
                                    Complaint Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Recorded By</label>
                                    <p className="text-sm font-medium">{complaint.recorded_by}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Date Recorded</label>
                                    <p className="text-sm font-medium">{formatDate(complaint.created_at)}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Complaint Description */}
                    <Card className="border-[#268a6461] pt-0">
                        <CardHeader className="pb-3 pt-6 bg-[#f0f8f4]">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <FileText className="h-4 w-4" />
                                Complaint Description
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            {complaint.complaint ? (
                                <div className="p-4 bg-gray-50 rounded-lg border">
                                    <p className="text-sm">{complaint.complaint}</p>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <p className="text-sm">No description available</p>
                                </div>
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
                                            <p className="text-sm font-medium">Complaint Recorded</p>
                                            <span className="text-xs text-gray-500">{formatDate(complaint.created_at)}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Recorded by {complaint.recorded_by}</p>
                                    </div>
                                </div>

                                {complaint.updated_at && complaint.updated_at !== complaint.created_at && (
                                    <div className="flex items-start gap-4">
                                        <div className="w-2 h-2 bg-[#268a64] rounded-full mt-2"></div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium">Last Updated</p>
                                                <span className="text-xs text-gray-500">{formatDate(complaint.updated_at)}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Complaint details were modified</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    {/* <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button variant="outline" className="border-[#268a6461] hover:bg-[#e6f2ed] text-[#106041] bg-transparent">
                            Print Complaint
                        </Button>
                    </div> */}
                </div>
            </DialogContent>
        </Dialog>
    )
}
