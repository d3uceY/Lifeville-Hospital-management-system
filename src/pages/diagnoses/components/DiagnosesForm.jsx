import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList } from "lucide-react"
import { getConditions, createDiagnoses } from "../../../providers/ApiProviders"
import { useAuth } from "../../../providers/AuthContext"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
} from "@/components/ui/select"
import { Controller } from "react-hook-form"
import { useConditions } from "../../../providers/ApiContextProvider"

export default function DiagnosesForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { user } = useAuth()
    const { patient_id } = useParams()
    const queryClient = useQueryClient()
    const { conditions } = useConditions();

    const schema = z.object({
        recorded_by: z.string().nonempty({ message: "Recorded by is required" }),
        condition: z.string().nonempty({ message: "Condition is required" }),
        notes: z.string().optional(),
    })

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
            recorded_by: user?.name || "",
            condition: "",
            notes: "",
        },
    })

    

    const onSubmit = async (data) => {
        const promise = async () => {
            try {
                setIsSubmitting(true)
                const payload = { ...data, patient_id }
                await createDiagnoses(payload)
                queryClient.invalidateQueries({ queryKey: ["diagnoses", patient_id] })
                reset({ recorded_by: user?.name || "", condition: "", notes: "" })
            } catch (error) {
                console.error(error)
                throw error
            } finally {
                setIsSubmitting(false)
            }
        }
        toast.promise(promise(), {
            loading: "Saving...",
            success: "Diagnosis saved successfully",
            error: "Failed to save diagnosis",
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
                <CardHeader className="bg-[#f0f8f4] border-b flex items-center justify-between">
                    <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
                        <ClipboardList size={20} />
                        Add Diagnosis
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    {/* Condition Dropdown */}
                    <div className="mb-4">
                        <Label className="mb-3" htmlFor="condition">Condition</Label>
                        <Controller
                            name="condition"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full bg-gray-50">
                                        <SelectValue placeholder="Select test type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Conditions</SelectLabel>
                                            {conditions.map((condition) => (
                                                <SelectItem key={condition.id} value={condition.name}>
                                                    {condition.name}
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

                    {/* Notes */}
                    <div className="mb-4">
                        <Label className="mb-3" htmlFor="notes">Notes</Label>
                        <textarea
                            className="bg-gray-50 border border-gray-300 rounded-md p-2 w-full resize-y"
                            id="notes"
                            placeholder="Enter notes"
                            rows={4}
                            {...register("notes")}
                        />
                    </div>

                    {/* Save Button */}
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
