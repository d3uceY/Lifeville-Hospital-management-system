import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList } from "lucide-react"
import { getConditions, createDiagnoses, updateDiagnoses } from "../../../providers/ApiProviders"
import { useAuth } from "../../../providers/AuthContext"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"

export default function EditDiagnosisDialog({ children, diagnosis }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [conditions, setConditions] = useState([])
    const [open, setOpen] = useState(false)
    const { user } = useAuth()
    const { patient_id } = useParams()
    const queryClient = useQueryClient()

    const schema = z.object({
        updated_by: z.string().nonempty({ message: "Updated by is required" }),
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
            updated_by: user?.name || "",
            condition: diagnosis?.condition || "",
            notes: diagnosis?.notes || "",
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
                await updateDiagnoses(diagnosis?.diagnosis_id, data)
                queryClient.invalidateQueries({ queryKey: ["diagnoses", patient_id] })
                reset({ updated_by: user?.name || "", condition: diagnosis?.condition || "", notes: diagnosis?.notes || "" })
                setOpen(false)
            } catch (error) {
                console.error(error)
                throw error
            } finally {
                setIsSubmitting(false)
            }
        }
        toast.promise(promise(), {
            loading: "Updating...",
            success: "Diagnosis updated successfully",
            error: "Failed to update diagnosis",
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto p-0">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card className="pt-0 mb-0 shadow-sm border-t-4 border-t-[#106041]">
                        <CardHeader className="bg-[#f0f8f4] border-b flex items-center justify-between">
                            <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
                                <ClipboardList size={20} />
                                Edit Diagnosis
                            </CardTitle>
                            <Button
                                className="mt-6"
                                type="submit"
                                disabled={!isValid || isSubmitting}
                            >
                                {isSubmitting ? "Updating..." : "Update"}
                            </Button>
                        </CardHeader>

                        <CardContent>
                            {/* Condition Dropdown */}
                            <div className="mb-4">
                                <Label className="mb-3" htmlFor="condition">Condition</Label>
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
                                {isSubmitting ? "Updating..." : "Update"}
                            </Button>
                        </CardContent>
                    </Card>
                </form>
            </DialogContent>
        </Dialog>
    )
}
