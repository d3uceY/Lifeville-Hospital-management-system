" ";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuSeparator,
    DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
    MoreVertical,
    Activity,
    PauseCircle,
    Edit,
    XCircle,
    CheckCircle2,
    Clock,
    Ban,
    RefreshCw,
    AlertTriangle,
    FileX,
} from "lucide-react";
import { changePrescriptionStatus } from "../../../providers/ApiProviders";
import { useAuth } from "../../../providers/AuthContext";
import { useState } from "react";
import { useQueryClient } from '@tanstack/react-query'
import { toast } from "sonner";


export default function PrescriptionStatusDropdown({ prescriptionId }) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient()

    const handleUpdateStatus = async (newStatus) => {
        if (!user?.name) return;

        setLoading(true);
        const promise = async () => {
            try {
                const updated = await changePrescriptionStatus(prescriptionId, {
                    status: newStatus,
                    updatedBy: user.name,
                });
                queryClient.invalidateQueries({ queryKey: ['patientPrescriptions'] })
                return updated;
            } catch (error) {
                console.error("Error updating prescription status:", error);
                throw error;
            } finally {
                setLoading(false);
            }
        } 
        toast.promise(promise(), {
            loading: 'Updating prescription status...',
            success: "Prescription status updated successfully",
            error: (err) => err.response?.data?.error || err.message || 'An error occurred'
        })
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:bg-[#e6f2ed]"
                    disabled={loading}
                >
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="flex items-center gap-2 cursor-pointer hover:bg-[#e6f2ed]">
                        <RefreshCw className="h-4 w-4" />
                        <span>Change Status</span>
                    </DropdownMenuSubTrigger>

                    <DropdownMenuPortal>
                        <DropdownMenuSubContent className="min-w-[200px]">
                            <DropdownMenuItem
                                className="flex items-center gap-2 hover:bg-green-50 focus:bg-green-50"
                                onClick={() => handleUpdateStatus("Active")}
                            >
                                <Activity className="h-4 w-4 text-green-600" />
                                <span className="text-green-800">Active</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className="flex items-center gap-2 hover:bg-yellow-50 focus:bg-yellow-50"
                                onClick={() => handleUpdateStatus("On Hold")}
                            >
                                <PauseCircle className="h-4 w-4 text-yellow-600" />
                                <span className="text-yellow-800">On Hold</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className="flex items-center gap-2 hover:bg-blue-50 focus:bg-blue-50"
                                onClick={() => handleUpdateStatus("Modified")}
                            >
                                <Edit className="h-4 w-4 text-blue-600" />
                                <span className="text-blue-800">Modified</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className="flex items-center gap-2 hover:bg-red-50 focus:bg-red-50"
                                onClick={() => handleUpdateStatus("Discontinued")}
                            >
                                <XCircle className="h-4 w-4 text-red-600" />
                                <span className="text-red-800">Discontinued</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className="flex items-center gap-2 hover:bg-purple-50 focus:bg-purple-50"
                                onClick={() => handleUpdateStatus("Completed")}
                            >
                                <CheckCircle2 className="h-4 w-4 text-purple-600" />
                                <span className="text-purple-800">Completed</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className="flex items-center gap-2 hover:bg-orange-50 focus:bg-orange-50"
                                onClick={() => handleUpdateStatus("Expired")}
                            >
                                <Clock className="h-4 w-4 text-orange-600" />
                                <span className="text-orange-800">Expired</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className="flex items-center gap-2 hover:bg-indigo-50 focus:bg-indigo-50"
                                onClick={() => handleUpdateStatus("Pending")}
                            >
                                <Clock className="h-4 w-4 text-indigo-600" />
                                <span className="text-indigo-800">Pending</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className="flex items-center gap-2 hover:bg-red-50 focus:bg-red-50"
                                onClick={() => handleUpdateStatus("Rejected")}
                            >
                                <Ban className="h-4 w-4 text-red-600" />
                                <span className="text-red-800">Rejected</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className="flex items-center gap-2 hover:bg-gray-50 focus:bg-gray-50"
                                onClick={() => handleUpdateStatus("Superseded")}
                            >
                                <AlertTriangle className="h-4 w-4 text-gray-600" />
                                <span className="text-gray-800">Superseded</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className="flex items-center gap-2 hover:bg-red-50 focus:bg-red-50"
                                onClick={() => handleUpdateStatus("Cancelled")}
                            >
                                <FileX className="h-4 w-4 text-red-600" />
                                <span className="text-red-800">Cancelled</span>
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuSeparator className="bg-[#e0f0e8]" />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
