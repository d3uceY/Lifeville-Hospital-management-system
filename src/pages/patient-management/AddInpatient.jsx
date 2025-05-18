import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { usePatientData } from "../../providers/ApiContextProvider"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"

// Format date from this 2023-09-30T23:00:00.000Z to this 2023-09-30
import { formatForDateInput } from "../../helpers/formatForDateInput"

export default function AddInpatient() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { patientData } = usePatientData()

    // Form validation schema
    const schema = z.object({
        // Required Fields
        patient_id: z.string().min(1, "Patient is required"),
        admissionDate: z.string().min(1, "Admission date is required"),
        note: z.string().min(1, "Note is required"),
        previousMedicalIssue: z.string().min(1, "Previous medical issue is required"),
        symptomsDescription: z.string().min(1, "Symptoms description is required"),

    })



    //form methods that are going to be parsed throughout the form tree
    const methods = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            // Basic Information
            patient_id: "",
            admissionDate: formatForDateInput(new Date()),
            note: "",
            previousMedicalIssue: "",
            symptomsDescription: "",
        },
    })

    //this is destructured from the methods variable
    const {
        handleSubmit,
        formState: { isValid, errors },
        register,
        control,
    } = methods

    const onSubmit = async (values) => {
        const promise = async () => {
            try {
                setIsSubmitting(true)
                const response = await updateRegisteredPatient(values)
                return response;
            } catch (err) {
                console.log(err)
                throw err;
            } finally {
                setIsSubmitting(false)
            }
        }

        toast.promise(promise(), {
            loading: 'Adding inpatient...',
            success: (data) => `${data.message}`,
            error: (err) => `An error occurred (${err?.response?.data?.message}, ${err?.message})`
        });
    }

    return (
        <div className="container mx-auto py-8 px-4 max-w-5xl">
            <div className="mb-8 border-l-4 border-[#106041] pl-4 bg-[#f0f8f4] p-4 rounded-r-md shadow-sm">
                <h1 className="text-3xl font-bold text-[#106041]">
                    Add Inpatient
                </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="relative">
                {/* Inpatient Information */}
                <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
                    <CardHeader className="bg-[#f0f8f4] border-b border-[#e0f0e8]">
                        <CardTitle className="pt-6 text-xl text-[#106041] font-semibold flex items-center gap-2">
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
                                className="lucide lucide-contact"
                            >
                                <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
                                <rect width="18" height="18" x="3" y="4" rx="2" />
                                <circle cx="12" cy="10" r="2" />
                                <line x1="8" x2="8" y1="2" y2="4" />
                                <line x1="16" x2="16" y1="2" y2="4" />
                            </svg>
                            Inpatient Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="patient_id">
                                    Patient
                                </Label>
                                <Controller
                                    name="patient_id"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={(value) => field.onChange(value)} value={field.value || ""}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select patient" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Patients</SelectLabel>
                                                    {patientData?.map((patient) => (
                                                        <SelectItem key={patient.patient_id} value={`${patient.patient_id}`}>
                                                            {patient.first_name} {patient.surname} ({patient.hospital_number})
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.patient_id && <p className="text-red-500 text-sm mt-1">{errors.patient_id.message}</p>}
                            </div>
                            <div>
                                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="admission_date">
                                    Admission Date
                                </Label>
                                <Input
                                    className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                                    id="admission_date"
                                    type="date"
                                    {...register("admissionDate")}
                                />
                                {errors.admissionDate && <p className="text-red-500 text-sm mt-1">{errors.admissionDate.message}</p>}
                            </div>
                        </div>
                        <div className="mt-6">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="note">
                                Note
                            </Label>
                            <Textarea
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[80px]"
                                id="note"
                                {...register("note")}
                            />
                            {errors.note && <p className="text-red-500 text-sm mt-1">{errors.note.message}</p>}
                        </div>
                        <div>
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="previousMedicalIssue">
                                Previous Medical issue
                            </Label>
                            <Input
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                                id="previousMedicalIssue"
                                {...register("previousMedicalIssue")}
                            />
                            {errors.previousMedicalIssue && <p className="text-red-500 text-sm mt-1">{errors.previousMedicalIssue.message}</p>}
                        </div>
                        <div className="mt-6">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="placeOfWorkAddress">
                                Symptoms description
                            </Label>
                            <Textarea
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[80px]"
                                id="symptomsDescription"
                                {...register("symptomsDescription")}
                            />
                            {errors.symptomsDescription && (
                                <p className="text-red-500 text-sm mt-1">{errors.symptomsDescription.message}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="text-right mt-8 flex items-center justify-end gap-4">
                    <button
                        type="button"
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                    <Button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className="px-6 py-2 bg-[#106041] text-white rounded-md hover:bg-[#106041]/80 flex items-center gap-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                            <polyline points="17 21 17 13 7 13 7 21"></polyline>
                            <polyline points="7 3 7 8 15 8"></polyline>
                        </svg>
                        Add Inpatient
                    </Button>
                </div>
            </form>
            {/* <Toaster position="top-right" /> */}
        </div>
    )
}

