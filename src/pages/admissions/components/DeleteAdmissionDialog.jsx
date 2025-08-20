import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteInpatient } from "../../../providers/ApiProviders";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { hasPermission } from "../../../helpers/hasPermission";
import { useParams } from "react-router-dom";

export function DeleteAdmissionDialog({ admission }) {
    const { id, surname, first_name } = admission;
    const queryClient = useQueryClient();
    const { patient_id } = useParams();

    const handleDeleteAdmission = async () => {
        const promise = async () => {
            try {
                const response = await deleteInpatient(id);
                queryClient.invalidateQueries({ queryKey: ['admissions', patient_id] });
                return response;
            } catch (err) {
                throw err;
            }
        };

        toast.promise(promise(), {
            loading: 'Deleting admission...',
            success: `Admission deleted successfully`,
            error: (err) => `An error occurred (${err?.response?.data?.message || err?.message})`,
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    className="action-delete-btn"
                >
                    <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="border-t-4 border-t-[#106041] max-w-md">
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#106041] rounded-full p-3 border-4 border-white shadow-md">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-alert-triangle"
                    >
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                        <path d="M12 9v4" />
                        <path d="M12 17h.01" />
                    </svg>
                </div>
                <AlertDialogHeader className="pt-6">
                    <AlertDialogTitle className="text-center text-xl font-bold">
                        Delete Admission
                    </AlertDialogTitle>

                    {/* Bed Information Box */}
                    <div className="mt-2 mb-4 bg-[#f0f8f4] border /30 rounded-md p-3 text-center">
                        <div className="flex items-center justify-center mb-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2"
                            >
                                <path d="M3 7v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7" />
                                <path d="M3 7l9 6 9-6" />
                            </svg>
                            <span className="font-bold ">{`${surname} ${first_name}`}</span>
                        </div>
                        <div className="text-sm text-gray-600 flex items-center justify-center">
                            <span className="bg-[#106041] text-white text-xs px-2 py-0.5 rounded mr-2">ID</span>
                            ID: {id || "N/A"}
                        </div>
                    </div>

                    <AlertDialogDescription className="text-center">
                        <span className="text-red-600 font-medium mb-2 block">This action cannot be undone.</span>
                        <span className="text-gray-600 block">
                            This will permanently delete the admission record.
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="bg-amber-50 border-l-4 border-amber-400 p-3 my-2 text-sm text-amber-800">
                    <p className="font-medium">Important Notice:</p>
                    <p>
                        Deleting this admission may affect patient assignments and hospital records. Ensure you have proper authorization before proceeding.
                    </p>
                </div>
                <AlertDialogFooter className="flex items-center gap-2">
                    <AlertDialogCancel className=" hover:bg-[#f0f8f4] hover:">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDeleteAdmission}
                        className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 flex items-center gap-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1="10" x2="10" y1="11" y2="17" />
                            <line x1="14" x2="14" y1="11" y2="17" />
                        </svg>
                        Delete Permanently
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
