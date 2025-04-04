"use client"

import { useState, useEffect } from "react"
import { format, parseISO } from "date-fns"
import { Phone, PenSquare, MoreVertical, User, Calendar, FileText, ClipboardList } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
        case "cancelled":
            return "bg-red-100 text-red-800 border-red-200"
        default:
            return "bg-blue-100 text-blue-800 border-blue-200"
    }
}

export default function AppointmentCard({ appointment }) {
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
        patient_id,
        patient_phone_number,
        status,
        updated_at,
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

    return (
        <div className="p-4 hover:bg-[#f9fcfa] transition-colors border-b border-[#e0f0e8] last:border-b-0">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    <div className={`w-1 h-12 rounded-full ${statusColor}`}></div>
                    <div className="text-center">
                        <p className="text-lg font-bold text-[#106041]">{formattedTime.time}</p>
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
                                    className="h-8 w-8 text-gray-500 hover:text-[#106041] hover:bg-[#e6f2ed]"
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
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-gray-500 hover:text-[#106041] hover:bg-[#e6f2ed]"
                                >
                                    <PenSquare className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Edit Appointment</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-gray-500 hover:text-[#106041] hover:bg-[#e6f2ed]"
                                >
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>More Options</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            <div className="ml-7 pl-3 border-l-2 border-[#e0f0e8]">
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
                    <div className="mt-3 p-2 bg-[#f0f8f4] border border-[#e0f0e8] rounded-md">
                        <div className="flex items-start gap-2">
                            <FileText className="h-4 w-4 text-[#106041] mt-0.5" />
                            <div>
                                <p className="font-medium text-[#106041] text-sm">Notes:</p>
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

