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

export default function DiagnosesForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [conditions, setConditions] = useState([])
    const { user } = useAuth()
    const { patient_id } = useParams()
    const queryClient = useQueryClient()

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
    } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            recorded_by: user?.name || "",
            condition: "",
            notes: "",
        },
    })

    useEffect(() => {
        const fetchConditions = async () => {
            try {
                const data = await getConditions()
                setConditions(data)
            } catch (error) {
                console.error("Failed to fetch conditions", error)
            }
        }
        fetchConditions()
    }, [])

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
                    <Button
                        className="mt-6"
                        type="submit"
                        disabled={!isValid || isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : "Save"}
                    </Button>
                </CardHeader>

                <CardContent>
                    {/* Recorded By */}
                    <div className="mb-4">
                        <Label htmlFor="recorded_by">Recorded By</Label>
                        <Input
                            className="bg-gray-50"
                            id="recorded_by"
                            type="text"
                            {...register("recorded_by")}
                        />
                        {errors.recorded_by && (
                            <p className="text-red-500 text-sm">{errors.recorded_by.message}</p>
                        )}
                    </div>

                    {/* Condition Dropdown */}
                    <div className="mb-4">
                        <Label htmlFor="condition">Condition</Label>
                        <select
                            id="condition"
                            className="bg-gray-50 border border-gray-300 rounded-md p-2 w-full"
                            {...register("condition")}
                        >
                            <option value="">Select a condition</option>
                            {conditions.map((cond) => (
                                <option key={cond.id} value={cond.name}>
                                    {cond.name}
                                </option>
                            ))}
                        </select>
                        {errors.condition && (
                            <p className="text-red-500 text-sm">{errors.condition.message}</p>
                        )}
                    </div>

                    {/* Notes */}
                    <div className="mb-4">
                        <Label htmlFor="notes">Notes</Label>
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
