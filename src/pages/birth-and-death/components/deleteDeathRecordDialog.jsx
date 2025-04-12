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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

import { deleteDeath } from "../../../providers/ApiProviders";
import { useBirthAndDeaths } from "../../../providers/ApiContextProvider";
import { toast } from "sonner";


export default function DeleteDeathRecordDialog({ children, deletedDeathRecordInfo }) {

    const { refreshDeaths } = useBirthAndDeaths();
    const { patient_surname, patient_first_name, hospital_number, id, patient_id } = deletedDeathRecordInfo;

    const deletePatient = async () => {
        const promise = async () => {
            try {
                const response = await deleteDeath(id);
                refreshDeaths();
                return response;
            } catch (err) {
                throw err;
            }
        }

        toast.promise(promise(), {
            loading: 'Deleting death record...',
            success: (data) => `${data.message}`,
            error: (err) => `An error occurred (${err?.response?.data?.message}, ${err?.message})`
        });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    className="flex justify-start px-0 py-0 bg-transparent w-full items-center cursor-pointer border-0 outline-0 text-red-600 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700"
                >
                    <Trash2 className="h-4 w-4 text-red-600" />
                    {children}
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
                    <AlertDialogTitle className="text-center text-xl text-[#106041] font-bold">
                        Delete Patient Record
                    </AlertDialogTitle>

                    {/* Patient Information Box */}
                    <div className="mt-2 mb-4 bg-[#f0f8f4] border border-[#106041]/30 rounded-md p-3 text-center">
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
                                className="text-[#106041] mr-2"
                            >
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            <span className="font-bold text-[#106041]">{patient_surname} {patient_first_name}</span>
                        </div>
                        <div className="text-sm text-gray-600 flex items-center justify-center">
                            <span className="bg-[#106041] text-white text-xs px-2 py-0.5 rounded mr-2">ID</span>
                            Hospital Number: {hospital_number || "N/A"}
                        </div>
                    </div>

                    <AlertDialogDescription className="text-center">
                        <span className="text-red-600 font-medium mb-2 block">This action cannot be undone.</span>
                        <span className="text-gray-600 block">
                            This will parmanently delete the patient's death record.
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="bg-amber-50 border-l-4 border-amber-400 p-3 my-2 text-sm text-amber-800">
                    <p className="font-medium">Important Medical Notice:</p>
                    <p>
                        Deleting patient records may have legal and medical implications. Ensure you have proper authorization
                        before proceeding.
                    </p>
                </div>
                <AlertDialogFooter className="flex items-center gap-2 ">
                    <AlertDialogCancel className="border-[#106041] text-[#106041] hover:bg-[#f0f8f4] hover:text-[#106041]">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={deletePatient}
                        className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 flex items-center gap-2">
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
    )
}

