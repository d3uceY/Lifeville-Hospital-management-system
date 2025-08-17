import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Calendar, FileText, Stethoscope } from "lucide-react"
import { formatDate } from "../../../helpers/formatDate"

export function ViewNurseNoteDialog({ note, children }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="w-[100vw] !max-w-[60vw] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <Stethoscope className="h-5 w-5" />
                        Nurse's Note - #{note.id}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Patient & Note Info */}
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
                                        {note.first_name} {note.surname}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-[#268a6461] pt-0">
                            <CardHeader className="pb-3 pt-6 bg-[#f0f8f4]">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <FileText className="h-4 w-4" />
                                    Note Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Recorded By</label>
                                    <p className="text-sm font-medium">{note.recorded_by}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Date Recorded</label>
                                    <p className="text-sm font-medium">{formatDate(note.created_at)}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Note Description */}
                    <Card className="border-[#268a6461] pt-0">
                        <CardHeader className="pb-3 pt-6 bg-[#f0f8f4]">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <FileText className="h-4 w-4" />
                                Nurse's Note
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            {note.note ? (
                                <div className="p-4 bg-gray-50 rounded-lg border">
                                    <p className="text-sm">{note.note}</p>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <p className="text-sm">No note available</p>
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
                                            <p className="text-sm font-medium">Note Recorded</p>
                                            <span className="text-xs text-gray-500">{formatDate(note.created_at)}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Recorded by {note.recorded_by}</p>
                                    </div>
                                </div>

                                {note.updated_at && note.updated_at !== note.created_at && (
                                    <div className="flex items-start gap-4">
                                        <div className="w-2 h-2 bg-[#268a64] rounded-full mt-2"></div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium">Last Updated</p>
                                                <span className="text-xs text-gray-500">{formatDate(note.updated_at)}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Updated by {note.updated_by || "N/A"}
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
