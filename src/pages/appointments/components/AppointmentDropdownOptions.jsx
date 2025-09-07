
import {
    Phone, PenSquare, MoreVertical, Calendar, RefreshCw, Trash2, CheckCircle,
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
import { useQueryClient } from "@tanstack/react-query"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import EditAppointmentDialog from "./EditAppointmentDialog"
import { hasPermission } from "../../../helpers/hasPermission"

export default function AppointmentDropdownOptions({ appointment }) {

    const queryClient = useQueryClient();
    const {
        appointment_id,
        patient_phone_number,
    } = appointment;

    // Parse the ISO date string
    const handleUpdateStatus = (newStatus) => {
        const promise = async () => {
            try {
                const response = await updateAppointmentStatus(appointment_id, newStatus)
                queryClient.invalidateQueries({ queryKey: ['appointments'] })
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
                queryClient.invalidateQueries({ queryKey: ['appointments'] })
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
            {
                hasPermission(["superadmin"]) && (
                    <TooltipProvider>
                        <Tooltip>
                            <EditAppointmentDialog appointment={appointment}>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="action-edit-btn"
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
                )
            }
            {
                hasPermission(["superadmin", "doctor"]) && (
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
                                <DropdownMenuSubTrigger className="flex items-center gap-2 cursor-pointer hover:bg-[#e6f2ed] hover:focus:bg-[#e6f2ed] focus:">
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
                )
            }
        </div>

    )
}



