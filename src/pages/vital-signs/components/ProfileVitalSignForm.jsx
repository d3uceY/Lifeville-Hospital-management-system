import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Activity } from "lucide-react"
import { createVitalSign } from "../../../providers/ApiProviders"
import { useState } from "react"
import { toast } from "sonner"
import { useAuth } from "../../../providers/AuthContext"
import { useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

export default function ProfileVitalSignForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { user } = useAuth()
    const { patient_id } = useParams()
    const queryClient = useQueryClient()

    const schema = z.object({
        temperature: z.number().min(0).max(45).optional(),
        diastolicBloodPressure: z.number().min(0).max(150).optional(),
        systolicBloodPressure: z.number().min(0).max(250).optional(),
        heartRate: z.number().min(0).max(220).optional(),
        weight: z.number().min(0).max(300).optional(),
        spo2: z.number().min(0).max(100).optional(),
        recordedBy: z.string().nonempty({ message: "Recorded by is required" }),
        date: z.string().nonempty({ message: "Date is required" }),
    })

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
    } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            temperature: 0,
            diastolicBloodPressure: 0,
            systolicBloodPressure: 0,
            heartRate: 0,
            weight: 0,
            spo2: 0,
            date: new Date().toISOString().split("T")[0],
            recordedBy: user?.name,
        }
    })

    const onSubmit = async (data) => {
        const promise = async () => {
            try {
                setIsSubmitting(true)
                const payload = { ...data, patientId: patient_id }
                await createVitalSign(payload)
                queryClient.invalidateQueries({ queryKey: ['vitalSigns', patient_id] })
                reset()
            } catch (error) {
                console.error(error)
            } finally {
                setIsSubmitting(false)
            }
        }
        toast.promise(promise(), {
            loading: "Saving...",
            success: "Saved successfully",
            error: "Failed to save",
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
                <CardHeader className="bg-[#f0f8f4] border-b flex items-center justify-between">
                    <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
                        <Activity size={20} />
                        Vital Signs
                    </CardTitle>
                    <Button
                        className="mt-6"
                        type="submit"
                        disabled={!isValid || isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : "Save"}
                    </Button>
                </CardHeader>

                <CardContent>
                    {/* Temperature */}
                    <div className="mb-4">
                        <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="temperature">
                            Temperature (°C)
                        </Label>
                        <Input
                            className="bg-gray-50"
                            id="temperature"
                            type="number"
                            step="0.1"
                            placeholder="°C"
                            {...register("temperature", { valueAsNumber: true })}
                        />
                        {errors.temperature && <p className="text-red-500 text-sm">{errors.temperature.message}</p>}
                    </div>

                    

                    {/* Blood Pressure */}
                    <div className="mb-4">
                        <Label className="text-sm font-medium mb-2 block text-gray-700">
                            Blood Pressure (mmHg)
                        </Label>
                        <div className="flex items-center gap-2">
                            <Input
                                className="bg-gray-50"
                                type="number"
                                placeholder="120"
                                {...register("systolicBloodPressure", { valueAsNumber: true })}
                            />
                            <span className="text-lg font-medium">/</span>
                            <Input
                                className="bg-gray-50"
                                type="number"
                                placeholder="80"
                                {...register("diastolicBloodPressure", { valueAsNumber: true })}
                            />
                        </div>
                        {errors.systolicBloodPressure && <p className="text-red-500 text-sm">{errors.systolicBloodPressure.message}</p>}
                        {errors.diastolicBloodPressure && <p className="text-red-500 text-sm">{errors.diastolicBloodPressure.message}</p>}
                    </div>

                    

                    {/* Weight */}
                    <div className="mb-4">
                        <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="weight">
                            Weight (kg)
                        </Label>
                        <Input
                            className="bg-gray-50"
                            id="weight"
                            type="number"
                            step="0.1"
                            placeholder="70"
                            {...register("weight", { valueAsNumber: true })}
                        />
                        {errors.weight && <p className="text-red-500 text-sm">{errors.weight.message}</p>}
                    </div>

                    

                    {/* Heart Rate */}
                    <div className="mb-4">
                        <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="heartRate">
                            Pulse Rate (bpm)
                        </Label>
                        <Input
                            className="bg-gray-50"
                            id="heartRate"
                            type="number"
                            placeholder="75"
                            {...register("heartRate", { valueAsNumber: true })}
                        />
                        {errors.heartRate && <p className="text-red-500 text-sm">{errors.heartRate.message}</p>}
                    </div>

                    

                    {/* SpO₂ */}
                    <div className="mb-4">
                        <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="spo2">
                            SpO₂ (%)
                        </Label>
                        <Input
                            className="bg-gray-50"
                            id="spo2"
                            type="number"
                            step="1"
                            placeholder="98"
                            {...register("spo2", { valueAsNumber: true })}
                        />
                        {errors.spo2 && <p className="text-red-500 text-sm">{errors.spo2.message}</p>}
                    </div>

                    

                    {/* Date */}
                    <div>
                        <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="date">
                            Date
                        </Label>
                        <Input
                            className="bg-gray-50"
                            id="date"
                            type="date"
                            {...register("date")}
                        />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                    </div>

                    <Button
                        className="mt-6 ml-auto block"
                        type="submit"
                        disabled={!isValid || isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : "Save"}
                    </Button>
                </CardContent>
            </Card>
        </form>
    )
}
