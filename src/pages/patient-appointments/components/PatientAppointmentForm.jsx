import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { CalendarDays, User, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { useDoctorData } from "../../../providers/ApiContextProvider"
import { createAppointment } from "../../../providers/ApiProviders"
import spinnerLight from "/spinner-light.svg"
import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

export default function PatientAppointmentForm() {
    const queryClient = useQueryClient()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const schema = z.object({
        patientId: z.string().nonempty({ message: "Patient is required" }),
        doctorId: z.string().nonempty({ message: "Doctor is required" }),
        appointmentDate: z.string().nonempty({ message: "Date is required" }),
        notes: z.string().optional(),
    })

    const { patient_id } = useParams()

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
        control,
    } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            patientId: patient_id,
            doctorId: "",
            appointmentDate: "",
            notes: "",
        },
    })

    const onSubmit = async (values) => {
        const promise = async () => {
            try {
                const payload = {
                    ...values,
                    doctorId: Number(values.doctorId),
                    patientId: Number(values.patientId),
                }
                setIsSubmitting(true)
                const response = await createAppointment(payload)
                reset()
                queryClient.invalidateQueries({ queryKey: ['appointments', patient_id] })
                return response
            } catch (error) {
                throw error
            } finally {
                setIsSubmitting(false)
            }
        }

        toast.promise(promise(), {
            loading: "Creating appointment...",
            success: (data) => `${data.message}`,
            error: (err) => err.response?.message || "An error occurred",
        })
    }

    const { doctors, loadingDoctors, refreshDoctors } = useDoctorData()

    // Refresh dropdown data on mount
    useState(() => {
        refreshDoctors()
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
                <CardHeader className="bg-[#f0f8f4] border-b flex items-center justify-between">
                    <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
                        <CalendarDays size={20} />
                        Schedule Appointment
                    </CardTitle>
                    <Button type="submit" disabled={!isValid || isSubmitting}>
                        {isSubmitting ? "Scheduling..." : "Schedule"}
                    </Button>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Appointment Date */}
                    <div className = "grid grid-cols-2 gap-2">
                        <div>
                            <Label htmlFor="appointment_date" className="text-sm font-medium mb-2 block text-gray-700">
                                Appointment Date & Time <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="appointment_date"
                                    type="datetime-local"
                                    className="bg-gray-50"
                                    {...register("appointmentDate")}
                                />
                            </div>
                            {errors.appointmentDate && (
                                <p className="text-red-500 text-sm">{errors.appointmentDate.message}</p>
                            )}
                        </div>

                        {/* Doctor */}
                        <div>
                            <Label htmlFor="doctor" className="text-sm font-medium mb-2 block text-gray-700">
                                Doctor <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                {loadingDoctors ? (
                                    <img src={spinnerLight} alt="" className="absolute left-1 top-1/2 -translate-y-1/2 h-6 w-6" />
                                ) : (
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                )}
                                <Controller
                                    name="doctorId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value || ""}>
                                            <SelectTrigger id="doctor" className="pl-10 bg-gray-50 w-full">
                                                <SelectValue placeholder={loadingDoctors ? "Loading..." : "Select a doctor"} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {doctors.map((doctor) => (
                                                    <SelectItem key={doctor.id} value={`${doctor.id}`}>
                                                        {doctor?.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            {errors.doctorId && <p className="text-red-500 text-sm">{errors.doctorId.message}</p>}
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <Label htmlFor="notes" className="text-sm font-medium mb-2 block text-gray-700">
                            Notes
                        </Label>
                        <Textarea
                            id="notes"
                            placeholder="Enter appointment notes or reason for visit"
                            className="bg-gray-50"
                            {...register("notes")}
                        />
                    </div>

                    <Button
                        className="mt-6 ml-auto flex items-center"
                        type="submit"
                        disabled={!isValid || isSubmitting}
                    >
                        {isSubmitting ? (
                            <img src={spinnerLight} alt="" className="h-6 w-6" />
                        ) : (
                            <CheckCircle className="mr-2 h-4 w-4" />
                        )}
                        Schedule Appointment
                    </Button>
                </CardContent>
            </Card>
        </form>
    )
}
