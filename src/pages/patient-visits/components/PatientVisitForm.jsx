import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Repeat } from "lucide-react"
import { useAuth } from "../../../providers/AuthContext"
import { useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { createPatientVisit } from "../../../providers/ApiProviders"
import { useDoctorData } from "../../../providers/ApiContextProvider"
import { Controller } from "react-hook-form"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
} from "@/components/ui/select"

export default function PatientVisitForm() {
    const { user, accessToken } = useAuth()
    const { patient_id } = useParams()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const queryClient = useQueryClient()
    const { doctors } = useDoctorData()

    const schema = z.object({
        recordedBy: z.string().optional(),
        patientId: z.string().nonempty({ message: "Patient is required" }),
        doctorId: z.string().nonempty({ message: "Doctor is required" }),
        purpose: z.string().nonempty({ message: "Purpose of visit is required" }),
    })

    const methods = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            recordedBy: user?.name,
            patientId: patient_id,
            doctorId: "",
            purpose: "",
        },
    })

    const {
        handleSubmit,
        formState: { isValid, errors },
        register,
        reset,
        control,
    } = methods

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        const patientVisitData = {
            ...data,
            patientId: parseInt(patient_id),
            doctorId: parseInt(data.doctorId),
        }
        const promise = async () => {
            try {
                const response = await createPatientVisit({ accessToken, patientVisitData })
                queryClient.invalidateQueries({
                    queryKey: ["patientVisits", patient_id],
                })
                setIsSubmitting(false)
                return response
            } catch (error) {
                setIsSubmitting(false)
                throw error
            }
        }

        toast.promise(promise(), {
            loading: "Recording visit...",
            success: "Patient visit recorded successfully",
            error: (err) =>
                err.response?.data?.message || err?.message || "An error occurred",
        })
        reset()
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
                    <CardHeader className="bg-[#f0f8f4] border-b flex items-center justify-between">
                        <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
                            <Repeat size={20} />
                            Patient Visit
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Purpose */}
                        <div className="mb-4">
                            <Label
                                className="text-sm font-medium mb-2 block text-gray-700"
                                htmlFor="purpose"
                            >
                                Purpose of Visit
                            </Label>
                            <Textarea
                                id="purpose"
                                placeholder="Describe purpose of visit..."
                                className="text-black border-[#268a6477] bg-gray-50"
                                {...register("purpose")}
                            />
                            <p className="text-red-500">{errors.purpose?.message}</p>
                        </div>

                        {/* Doctor (optional if you want it visible) */}
                        <div>
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="doctorId">
                                Consultant Doctor
                            </Label>
                            <Controller
                                name="doctorId"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={(value) => field.onChange(value)} value={field.value || ""}>
                                        <SelectTrigger className="w-full border-[#268a6477] bg-gray-50">
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
                            {errors.doctorId && <p className="text-red-500 text-sm mt-1">{errors.doctorId.message}</p>}
                        </div>

                        <Button
                            className="ml-auto mt-3 block w-fit"
                            type="submit"
                            disabled={!isValid || isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : "Record Visit"}
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}
