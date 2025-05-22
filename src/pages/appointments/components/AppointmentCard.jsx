import { useState, useEffect } from "react"
import { format, parseISO } from "date-fns"
import {
    Phone, PenSquare, MoreVertical, User, Calendar, FileText, ClipboardList, RefreshCw, Trash2, CheckCircle,
    Clock,
    XCircle,
    CheckCircle2,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuPortal
} from "@/components/ui/dropdown-menu"
//api provider
import { deleteAppointment, updateAppointmentStatus } from "../../../providers/ApiProviders"
//api context provider
import { useAppointmentsData } from "../../../providers/ApiContextProvider"

import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import EditAppointmentDialog from "./EditAppointmentDialog"

// Helper function to get status badge color
const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
        case "scheduled":
            return "bg-blue-100 text-blue-800 border-blue-200"
        case "confirmed":
            return "bg-green-100 text-green-800 border-green-200"
        case "pending":
            return "bg-yellow-100 text-yellow-800 border-yellow-200"
        case "completed":
            return "bg-purple-100 text-purple-800 border-purple-200"
        case "canceled":
            return "bg-red-100 text-red-800 border-red-200"
        default:
            return "bg-blue-100 text-blue-800 border-blue-200"
    }
}

export default function AppointmentCard({ appointment }) {

    const { refreshAppointments } = useAppointmentsData()

    const {
        patient_first_name,
        patient_surname,
        appointment_date,
        appointment_id,
        doctor_first_name,
        doctor_last_name,
        doctor_specialty,
        hospital_number,
        notes,
        patient_phone_number,
        status,
    } = appointment

    // Parse the ISO date string
    const [parsedDate, setParsedDate] = useState(null)
    const [formattedTime, setFormattedTime] = useState({ time: "", period: "" })

    useEffect(() => {
        if (appointment_date) {
            const date = parseISO(appointment_date)
            setParsedDate(date)

            // Format time for the circle display
            const timeStr = format(date, "h:mm")
            const periodStr = format(date, "a")
            setFormattedTime({ time: timeStr, period: periodStr })
        }
    }, [appointment_date])

    // Get status badge color
    const statusColor = getStatusColor(status)


    const handleUpdateStatus = (newStatus) => {
        const promise = async () => {
            try {
                const response = await updateAppointmentStatus(appointment_id, newStatus)
                refreshAppointments()
                return response
            } catch (err) {
                console.error(err)
                throw err;
            }
        }

        toast.promise(promise(), {
            loading: 'Updating appointment status...',
            success: (data) => `${data.message}`,
            error: (err) => err.response.data.error || err.message || 'An error occurred'
        })
    }


    const handleDeleteAppointment = async () => {
        const promise = async () => {
            try {
                const response = await deleteAppointment(appointment_id)
                refreshAppointments()
                return response
            } catch (err) {
                throw err;
            }
        }

        toast.promise(promise(), {
            loading: 'Deleting appointment...',
            success: (data) => `${data.message}`,
            error: (err) => err.response.data.error || err.message || 'An error occurred'
        })
    }

    return (
        <div className="p-4 transition-colors border-b  last:border-b-0">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    <div className={`w-1 h-12 rounded-full ${statusColor}`}></div>
                    <div className="text-center">
                        <p className="text-lg font-bold">{formattedTime.time}</p>
                        <p className="text-xs text-gray-500">{formattedTime.period}</p>
                    </div>
                    <div className="ml-2">
                        <p className="font-medium">
                            {patient_first_name} {patient_surname}
                        </p>
                        <Badge className={`mt-1 ${statusColor} capitalize`}>{status}</Badge>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-gray-500 hover:hover:bg-[#e6f2ed]"
                                    onClick={() => window.open(`tel:${patient_phone_number}`)}
                                >
                                    <Phone className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Call Patient</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <EditAppointmentDialog appointment={appointment}>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-gray-500 hover:hover:bg-[#e6f2ed]"
                                    >
                                        <PenSquare className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                            </EditAppointmentDialog>
                            <TooltipContent>
                                <p>Edit Appointment</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-500 hover:hover:bg-[#e6f2ed]"
                            >
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 ">
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger className="flex items-center gap-2 cursor-pointer hover:bg-[#e6f2ed] hover:focus:bg-[#e6f2ed] focus:text-[#106041]">
                                    <RefreshCw className="h-4 w-4" />
                                    <span>Change Status</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent className=" min-w-[180px]">
                                        <DropdownMenuItem
                                            className="flex items-center gap-2 cursor-pointer hover:bg-blue-50 focus:bg-blue-50"
                                            onClick={() => handleUpdateStatus('scheduled')}
                                        >
                                            <Calendar className="h-4 w-4 text-blue-600" />
                                            <span className="text-blue-800">Scheduled</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="flex items-center gap-2 cursor-pointer hover:bg-green-50 focus:bg-green-50"
                                            onClick={() => handleUpdateStatus('confirmed')}
                                        >
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            <span className="text-green-800">Confirmed</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="flex items-center gap-2 cursor-pointer hover:bg-yellow-50 focus:bg-yellow-50"
                                            onClick={() => handleUpdateStatus('pending')}
                                        >
                                            <Clock className="h-4 w-4 text-yellow-600" />
                                            <span className="text-yellow-800">Pending</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="flex items-center gap-2 cursor-pointer hover:bg-purple-50 focus:bg-purple-50"
                                            onClick={() => handleUpdateStatus('completed')}
                                        >
                                            <CheckCircle2 className="h-4 w-4 text-purple-600" />
                                            <span className="text-purple-800">Completed</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="flex items-center gap-2 cursor-pointer hover:bg-red-50 focus:bg-red-50"
                                            onClick={() => handleUpdateStatus('canceled')}
                                        >
                                            <XCircle className="h-4 w-4 text-red-600" />
                                            <span className="text-red-800">Cancelled</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                            <DropdownMenuSeparator className="bg-[#e0f0e8]" />
                            <DropdownMenuItem
                                className="flex items-center gap-2 cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700"
                                onClick={handleDeleteAppointment}>
                                <Trash2 className="h-4 w-4" />
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="ml-7 pl-3 border-l-2 ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                        <User className="h-3 w-3 text-[#268A64]" />
                        <span className="font-medium text-[#106041]">
                            Dr. {doctor_first_name} {doctor_last_name}
                        </span>
                        <span className="text-xs text-gray-500">({doctor_specialty})</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="h-3 w-3 text-[#268A64]" />
                        <span>{parsedDate ? format(parsedDate, "EEEE, MMMM d, yyyy") : ""}</span>
                    </div>
                </div>

                {notes && (
                    <div className="mt-3 p-2 bg-[#f0f8f4] border  rounded-md">
                        <div className="flex items-start gap-2">
                            <FileText className="h-4 w-4 mt-0.5" />
                            <div>
                                <p className="font-medium text-sm">Notes:</p>
                                <p className="text-gray-800 line-clamp-2 mt-1">{notes}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-3 text-xs flex items-center gap-2">
                    <ClipboardList className="h-3 w-3 text-[#268A64]" />
                    <span className="text-gray-700">
                        <span className="font-medium">Hospital #:</span> {hospital_number}
                    </span>
                </div>
            </div>
        </div>
    )
}

