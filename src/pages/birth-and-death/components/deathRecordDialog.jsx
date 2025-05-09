import { usePatientData, useBirthAndDeaths } from "../../../providers/ApiContextProvider"
import { useState } from "react"
import { Calendar, Upload, FilePlus, X, User, FileText, UserRound, Clock } from "lucide-react"
import { createDeath } from "../../../providers/ApiProviders"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import spinnerLight from '/spinner-light.svg'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from "react-hook-form"
import { Controller } from "react-hook-form"


export function DeathRecordDialog() {
    const { patientData, loading } = usePatientData();
    const { refreshDeaths } = useBirthAndDeaths();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [open, setOpen] = useState(false)

    const schema = z.object({
        patientId: z.string().nonempty({ message: "Patient is required" }),
        deathDate: z.string().nonempty({ message: "Death date is required" }),
        guardian: z.string().nonempty({ message: "Guardian is required" }),
        report: z.string().optional()
    });

    const { register, formState: { isValid, errors }, handleSubmit, control } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            patientId: "",
            deathDate: "",
            guardian: "",
            report: ""
        }
    })

    const onSubmit = (data) => {
        const promise = async () => {
            const payload = {
                ...data,
                patientId: Number(data.patientId)
            }
            setIsSubmitting(true)
            try {
                const response = await createDeath(payload)
                setOpen(false)
                refreshDeaths()
                return response;
            } catch (error) {
                console.log(error)
                throw error
            } finally {
                setIsSubmitting(false)
            }
        }

        toast.promise(promise(), {
            loading: 'Creating death record...',
            success: (data) => `${data.message}`,
            error: (err) => err.response?.data?.message || err?.message || 'An error occurred'
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#106041] hover:bg-[#0d4e34]">
                    <FilePlus className="mr-2 h-4 w-4" />
                    Add Death Record
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]   overflow-y-auto border-[#e0f0e8]">
                <DialogHeader>
                    <DialogTitle className="text-[#106041] flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Add Patient Death Record
                    </DialogTitle>
                    <DialogDescription>
                        Enter the details of the patient's death record. All fields are required.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="patient" className="text-gray-700 flex items-center gap-1">
                                <UserRound className="h-3.5 w-3.5 text-[#268A64]" />
                                Patient
                            </Label>
                            <div className="relative">
                                {
                                    loading ? (
                                        <img src={spinnerLight} alt="" className="absolute left-1 top-1/2 -translate-y-1/2 h-8 w-8" />
                                    ) : (
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                    )
                                }
                                <Controller
                                    name="patientId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={(value) => field.onChange(value)} value={field.value || ""}>
                                            <SelectTrigger id="patient" className="pl-10 border-[#268a6461] focus:ring-[#268a6429]">
                                                <SelectValue placeholder={loading ? "Loading..." : patientData.length > 0 ? `Select a patient` : `No patients found`} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {patientData
                                                    .sort((a, b) => a.first_name.localeCompare(b.first_name))
                                                    .map((patient) => (
                                                        <SelectItem key={patient.patient_id} value={`${patient.patient_id}`}>
                                                            <span>{patient.first_name} {patient.surname}</span>
                                                            <span className="text-gray-500 !text-[12px]">({patient.hospital_number})</span>
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            {errors.patientId && <p className="text-red-500">{errors.patientId.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="deathDate" className="text-gray-700 flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5 text-[#268A64]" />
                                Date and Time of Death
                            </Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                    id="deathDate"
                                    type="datetime-local"
                                    required
                                    className="pl-10 border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                                    {...register("deathDate")}
                                />
                                {errors.deathDate && <p className="text-red-500">{errors.deathDate.message}</p>}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="guardianName" className="text-gray-700 flex items-center gap-1">
                                <User className="h-3.5 w-3.5 text-[#268A64]" />
                                Guardian/Next of Kin Name
                            </Label>
                            <Input
                                id="guardianName"
                                placeholder="Enter guardian's full name"
                                required
                                className="border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                                {...register("guardian")}
                            />
                            {errors.guardian && <p className="text-red-500">{errors.guardian.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="report" className="text-gray-700 flex items-center gap-1">
                                <FileText className="h-3.5 w-3.5 text-[#268A64]" />
                                Report
                            </Label>
                            <Textarea
                                id="report"
                                placeholder="Enter detailed report about the death..."
                                required
                                className="min-h-[120px] border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                                {...register("report")}
                            />
                            {errors.report && <p className="text-red-500">{errors.report.message}</p>}
                        </div>
                    </div>

                    <DialogFooter className="gap-2 flex items-center">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="border-[#268a6461] text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </Button>
                        <Button disabled={!isValid || isSubmitting} type="submit" className="bg-[#106041] hover:bg-[#0d4e34]">
                            {
                                isSubmitting && (<img src={spinnerLight} alt="" className=" h-8 w-8" />)
                            }

                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

// Example usage
export default function DeathRecordPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-[#106041] mb-6">Patient Records</h1>
            <DeathRecordDialog />
        </div>
    )
}
