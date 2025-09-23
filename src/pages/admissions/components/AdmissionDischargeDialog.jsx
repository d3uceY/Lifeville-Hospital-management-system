import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
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
import { toast } from "sonner"
import { useDoctorData } from "../../../providers/ApiContextProvider"
import { dischargeInpatient } from "../../../providers/ApiProviders"
import { useQueryClient } from "@tanstack/react-query"
import { formatDateForDateTimeLocal } from "../../../helpers/formatDateForDateTimeLocal"
import { useParams } from "react-router-dom"
import { useAuth } from "../../../providers/AuthContext"
import { UserX } from "lucide-react"
import { useConditions } from "../../../providers/ApiContextProvider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

// Schema
const schema = z.object({
    final_diagnosis: z.string().min(1, "Final diagnosis is required"),
    diagnosis_details: z.string().optional(),
    treatment_given: z.string().optional(),
    outcome: z.string().optional(),
    condition: z.string().min(1, "Condition is required"),
    discharge_date_time: z.string().min(1, "Discharge date/time is required"),
    follow_up: z.string().optional(),
    doctor_id: z.string().min(1, "Doctor is required"),
})

export default function DischargeDialog({ admissionId, children }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [open, setOpen] = useState(false);
    const { doctors } = useDoctorData();
    const queryClient = useQueryClient();
    const { patient_id, first_name, surname } = useParams();
    const { user } = useAuth();

    const finalDiagnosis = useConditions()?.conditions;

    const methods = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: {
            final_diagnosis: "",
            diagnosis_details: "",
            treatment_given: "",
            outcome: "",
            condition: "",
            discharge_date_time: formatDateForDateTimeLocal(new Date()),
            follow_up: "",
            doctor_id: "",
        },
    })

    const { handleSubmit, control, register, formState: { errors, isValid }, reset } = methods

    const onSubmit = async (values) => {
        const payload = {
            ...values,
            doctor_id: Number(values.doctor_id),
            patient_id: Number(patient_id),
            admission_id: Number(admissionId),
            recorded_by: user?.name,
        }

        const promise = async () => {
            try {
                setIsSubmitting(true)
                const response = await dischargeInpatient(payload)
                queryClient.invalidateQueries({
                    queryKey: ["admissions", patient_id],
                })
                queryClient.invalidateQueries({
                    queryKey: ["discharge-summary", admissionId],
                })
                setOpen(false)
                reset()
                return response
            } catch (err) {
                console.error(err)
                throw err
            } finally {
                setIsSubmitting(false)
            }
        }

        toast.promise(promise(), {
            loading: "Discharging patient...",
            success: (data) => `${data.message}`,
            error: (err) => `${err?.response?.data?.message || err?.message}`,
        })
    }

    const dischargeConditions = [
        { value: "stable", label: "Stable" },
        { value: "recovered", label: "Recovered" },
        { value: "improved", label: "Improved" },
        { value: "referred", label: "Referred" },
        { value: "left", label: "Left" },
        { value: "deceased", label: "Deceased" },
    ]

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto !p-0">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card className="pt-0 shadow-sm border-t-4 border-t-red-600">
                        <CardHeader className="bg-red-50 border-b flex items-center justify-between">
                            <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
                                <UserX size={20} />
                                Discharge Patient - <span className="capitalize">{surname} {first_name}</span>
                            </CardTitle>
                            <Button
                                className="mt-6 bg-red-600 hover:bg-red-700 text-white"
                                type="submit"
                                disabled={!isValid || isSubmitting}
                            >
                                {isSubmitting ? "Discharging..." : "Confirm Discharge"}
                            </Button>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Final Diagnosis */}
                            <div>
                                <Label
                                    className="text-sm font-medium mb-2 block text-gray-700"
                                    htmlFor="final_diagnosis"
                                >
                                    Final Diagnosis
                                </Label>
                                <Controller
                                    name="final_diagnosis"
                                    control={control}
                                    render={({ field }) => (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className="w-full justify-between bg-gray-50"
                                                >
                                                    {field.value
                                                        ? finalDiagnosis?.find(
                                                            (condition) => condition.name === field.value
                                                        )?.name
                                                        : "Select diagnosis"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[300px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search diagnosis..." />
                                                    <CommandList>
                                                        <CommandEmpty>No diagnosis found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {finalDiagnosis?.map((condition) => (
                                                                <CommandItem
                                                                    key={condition.id}
                                                                    value={condition.name}
                                                                    onSelect={() => field.onChange(condition.name)}
                                                                >
                                                                    {condition.name}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                />
                                {errors.final_diagnosis && (
                                    <p className="text-red-500 text-sm">{errors.final_diagnosis.message}</p>
                                )}
                            </div>


                            {/* Diagnosis Details */}
                            <div>
                                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="diagnosis_details">
                                    Diagnosis Details
                                </Label>
                                <Textarea
                                    className="bg-gray-50"
                                    id="diagnosis_details"
                                    {...register("diagnosis_details")}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Treatment Given */}
                                <div>
                                    <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="treatment_given">
                                        Treatment Given
                                    </Label>
                                    <Textarea
                                        className="bg-gray-50"
                                        id="treatment_given"
                                        {...register("treatment_given")}
                                    />
                                </div>

                                {/* Outcome */}
                                <div>
                                    <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="outcome">
                                        Outcome
                                    </Label>
                                    <Textarea
                                        className="bg-gray-50"
                                        id="outcome"
                                        {...register("outcome")}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Condition */}
                                <div>
                                    <Label className="text-sm font-medium mb-2 block text-gray-700">
                                        Condition
                                    </Label>
                                    <Controller
                                        name="condition"
                                        control={control}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value || ""}>
                                                <SelectTrigger className="bg-gray-50">
                                                    <SelectValue placeholder="Select condition" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Discharge Condition</SelectLabel>
                                                        {dischargeConditions.map((c) => (
                                                            <SelectItem key={c.value} value={c.value}>
                                                                {c.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {errors.condition && (
                                        <p className="text-red-500 text-sm">{errors.condition.message}</p>
                                    )}
                                </div>

                                {/* Doctor */}
                                <div>
                                    <Label className="text-sm font-medium mb-2 block text-gray-700">
                                        Doctor
                                    </Label>
                                    <Controller
                                        name="doctor_id"
                                        control={control}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value || ""}>
                                                <SelectTrigger className="bg-gray-50">
                                                    <SelectValue placeholder="Select doctor" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Doctors</SelectLabel>
                                                        {doctors?.map((doctor) => (
                                                            <SelectItem key={doctor.id} value={`${doctor.id}`}>
                                                                {doctor.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {errors.doctor_id && (
                                        <p className="text-red-500 text-sm">{errors.doctor_id.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Discharge Date/Time */}
                            <div>
                                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="discharge_date_time">
                                    Discharge Date & Time
                                </Label>
                                <Input
                                    className="bg-gray-50"
                                    id="discharge_date_time"
                                    type="datetime-local"
                                    {...register("discharge_date_time")}
                                />
                                {errors.discharge_date_time && (
                                    <p className="text-red-500 text-sm">{errors.discharge_date_time.message}</p>
                                )}
                            </div>

                            {/* Follow Up */}
                            <div>
                                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="follow_up">
                                    Follow Up Instructions
                                </Label>
                                <Textarea
                                    className="bg-gray-50"
                                    id="follow_up"
                                    {...register("follow_up")}
                                />
                            </div>

                            <Button
                                className="mt-6 ml-auto block bg-red-600 hover:bg-red-700 text-white"
                                type="submit"
                                disabled={!isValid || isSubmitting}
                            >
                                {isSubmitting ? "Discharging..." : "Confirm Discharge"}
                            </Button>
                        </CardContent>
                    </Card>
                </form>
            </DialogContent>
        </Dialog>
    )
}