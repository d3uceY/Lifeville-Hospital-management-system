import { Calendar, User, Users, X, CalendarDays, CheckCircle } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePatientData, useDoctorData, useAppointmentsData } from "../../../providers/ApiContextProvider"
import spinnerLight from '/spinner-light.svg'
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { updateAppointment } from "../../../providers/ApiProviders"


export default function EditAppointmentDialog({ children, appointment }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    // context hooks
    const { refreshAppointments } = useAppointmentsData();
    // destructured prop
    const { appointment_id, doctor_id, patient_id, status, notes } = appointment;

    // form validation schema
    const schema = z.object({
        patientId: z.string().nonempty({ message: "Patient is required" }),
        doctorId: z.string().nonempty({ message: "Doctor is required" }),
        appointmentDate: z.string().nonempty({ message: "Date is required" }),
        notes: z.string().optional(),
        status: z.string().nonempty({ message: "Status is required" })
    });

    // form hooks
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        control
    } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            patientId: `${patient_id}`,
            doctorId: `${doctor_id}`,
            appointmentDate: "",
            notes: notes,
            status: status
        }
    });


    // form submission
    const onSubmit = async (values) => {
        const promise = async () => {
            try {
                setIsSubmitting(true);
                const payload = {
                    ...values,
                    patientId: Number(values.patientId),
                    doctorId: Number(values.doctorId)
                }
                const response = await updateAppointment(payload, appointment_id);
                refreshAppointments();
                return response;
            } catch (error) {
                console.error(error)
                throw error;
            } finally {
                setIsSubmitting(false);
            }
        }

        toast.promise(promise(), {
            loading: 'Updating appointment...',
            success: (data) => `${data.message}`,
            error: (err) => err.response.data.error || err.message || 'An error occurred'
        });
    }


    // fetch patient and doctor data from context
    const { patientData, loading } = usePatientData();
    const { doctors, loadingDoctors } = useDoctorData();

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle className="text-xl flex items-center gap-2">
                        <CalendarDays className="h-5 w-5" />
                        Edit Appointment with
                    </DialogTitle>
                    <DialogDescription>
                        Fill in the appointment details below to update an existing patient appointment.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-5 py-4">
                        {/* Date and Time */}
                        <div className="grid gap-2">
                            <Label htmlFor="appointment_date" className="text-gray-700 font-medium">
                                Appointment Date & Time <span className="text-red-500">*</span>
                            </Label>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                    <Input
                                        id="appointment_date"
                                        type="datetime-local"
                                        className="pl-10 border-[#268a6461] focus-visible:ring-[#268a6429]"
                                        {...register("appointmentDate")}
                                    />
                                </div>
                                {errors.appointmentDate && <p className="text-red-500 text-[12px]">{errors.appointmentDate.message}</p>}
                            </div>
                        </div>

                        {/* Patient Selection */}
                        <div className="grid gap-2">
                            <Label htmlFor="patient" className="text-gray-700 font-medium">
                                Patient <span className="text-red-500">*</span>
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
                                                <SelectValue placeholder="Select a patient" />
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
                        </div>
                        {errors.patientId && <p className="text-red-500 text-[12px]">{errors.patientId.message}</p>}

                        {/* Doctor Selection */}
                        <div className="grid gap-2">
                            <Label htmlFor="doctor" className="text-gray-700 font-medium">
                                Doctor <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                {
                                    loadingDoctors ? (
                                        <img src={spinnerLight} alt="" className="absolute left-1 top-1/2 -translate-y-1/2 h-8 w-8" />
                                    ) : (
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                    )
                                }
                                <Controller
                                    name="doctorId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={(value) => field.onChange(value)} value={field.value || ""}>
                                            <SelectTrigger id="doctor" className="pl-10 border-[#268a6461] focus:ring-[#268a6429]">
                                                <SelectValue placeholder="Select a doctor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {doctors.map((doctor) => (
                                                    <SelectItem key={doctor.doctor_id} value={`${doctor.doctor_id}`}>
                                                        {doctor.first_name} {doctor.last_name} {" "}
                                                        ({doctor.specialty})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>
                        {errors.doctorId && <p className="text-red-500 text-[12px]">{errors.doctorId.message}</p>}


                        {/* Status */}
                        <div className="grid gap-2">
                            <Label htmlFor="status" className="text-gray-700 font-medium">
                                Status
                            </Label>
                            <Controller
                                name="status"
                                control={control}
                                defaultValue={status}
                                render={({ field }) => (
                                    <Select onValueChange={(value) => field.onChange(value)} value={field.value || "scheduled"}>
                                        <SelectTrigger id="status" className="border-[#268a6461] focus:ring-[#268a6429]">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="scheduled">Scheduled</SelectItem>
                                            <SelectItem value="confirmed">Confirmed</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="canceled">Canceled</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        {errors.status && <p className="text-red-500 text-[12px]">{errors.status.message}</p>}

                        {/* Notes */}
                        <div className="grid gap-2">
                            <Label htmlFor="notes" className="text-gray-700 font-medium">
                                Notes
                            </Label>
                            <Textarea
                                id="notes"
                                name="notes"
                                placeholder="Enter appointment notes or reason for visit"
                                className="min-h-[100px] border-[#268a6461] focus-visible:ring-[#268a6429]"
                                {...register("notes")}
                            />
                            {errors.notes && <p className="text-red-500 text-[12px]">{errors.notes.message}</p>}
                        </div>
                    </div>

                    <DialogFooter className="flex flex-col sm:flex-row gap-2">
                        <DialogClose asChild>
                            <Button variant="outline" className="border-[#268a6461] hover:bg-[#e6f2ed] hover:text-[#106041]">
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={!isValid || isSubmitting} type="submit" className="bg-[#106041] hover:bg-[#0d4e34]">
                            {
                                isSubmitting ? (<img src={spinnerLight} alt="" className=" h-8 w-8" />) : (<CheckCircle className="mr-2 h-4 w-4" />)
                            }

                            Update Appointment
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

