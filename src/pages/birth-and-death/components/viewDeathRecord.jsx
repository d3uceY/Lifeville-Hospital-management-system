
import { FileText, Calendar, User, ClipboardList, Info, Printer, Download, MoreVertical, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { formatDate } from "../../../helpers/formatDate"
import { Badge } from "@/components/ui/badge"


export default function ViewDeathRecordDialog({ deathRecord }) {
    const { report, death_date, sex, patient_surname, patient_first_name, guardian, hospital_number, id } = deathRecord
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>
                    <Button
                        variant="outline"
                        className="action-view-btn"
                    >
                        <Eye className="h-4 w-4 " />
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] ">
                <DialogHeader className="flex flex-row items-start justify-between">
                    <div>
                        <DialogTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Death Record
                        </DialogTitle>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge className="bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200">
                                DREF-{id}
                            </Badge>
                            <Badge className="bg-[#f0f8f4]  hover:bg-[#e6f2ed]">
                                HS-{hospital_number}
                            </Badge>
                        </div>
                    </div>
                </DialogHeader>

                <div className="mt-4  border  rounded-md p-5 space-y-4">
                    {/* Patient Information */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Patient Information
                        </h3>
                        <div className="grid grid-cols-2 gap-3 pl-6">
                            <div>
                                <p className="text-xs text-gray-500">Full Name</p>
                                <p className="text-sm font-medium">
                                    {patient_first_name} {patient_surname}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Gender</p>
                                <p className="text-sm font-medium">{sex}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Hospital Number</p>
                                <p className="text-sm font-medium">{hospital_number}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Guradian</p>
                                <p className="text-sm font-medium">{guardian}</p>
                            </div>
                        </div>
                    </div>

                    {/* Death Information */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Death Information
                        </h3>
                        <div className="pl-6">
                            <p className="text-xs text-gray-500">Date and Time of Death</p>
                            <p className="text-sm font-medium">{formatDate(death_date)}</p>
                        </div>
                    </div>

                    {/* Report */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold flex items-center gap-2">
                            <ClipboardList className="h-4 w-4" />
                            Report
                        </h3>
                        <div className="pl-6">
                            <p className="text-sm">{report}</p>
                        </div>
                    </div>

                    {/* Record Information */}
                    {/* <div className="space-y-3">
                        <h3 className="text-sm font-semibold flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            Record Information
                        </h3>
                        <div className="grid grid-cols-2 gap-3 pl-6">
                            <div>
                                <p className="text-xs text-gray-500">Reference Number</p>
                                <p className="text-sm font-medium">{deathRecord.referenceNumber}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Created By</p>
                                <p className="text-sm font-medium">Dr. Anthony Onyekwelu</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Created On</p>
                                <p className="text-sm font-medium">04 Mar 2025, 09:15 am</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Last Updated</p>
                                <p className="text-sm font-medium">04 Mar 2025, 09:15 am</p>
                            </div>
                        </div>
                    </div> */}
                </div>

                <div className="mt-4 flex justify-end">
                    <DialogClose>
                        <Button
                            variant="outline"
                            className="border-[#268a6461] text-gray-700 hover:bg-gray-100"
                        >
                            Close
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}

