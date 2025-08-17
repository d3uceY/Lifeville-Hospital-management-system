import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { FileText } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useAuth } from "../../../providers/AuthContext"
import { useParams } from "react-router-dom"
import { updateDoctorsNote } from "../../../providers/ApiProviders"
import { useQueryClient } from "@tanstack/react-query"

export default function EditDoctorNoteDialog({ children, note }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [open, setOpen] = useState(false)
    const { user } = useAuth()
    const { patient_id, surname, first_name } = useParams()
    const queryClient = useQueryClient()

    const schema = z.object({
        note: z.string().nonempty({ message: "Doctor's note is required" }),
        date: z.string().nonempty({ message: "Date is required" }),
        updatedBy: z.string().nonempty({ message: "Updated by is required" }),
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
            note: note?.note || "",
            date: note?.date || new Date().toISOString().split("T")[0],
            updatedBy: user?.name,
        }
    })

    const onSubmit = async (data) => {
        const promise = async () => {
            try {
                setIsSubmitting(true)
                const payload = { ...data, patientId: patient_id }
                setOpen(false)
                await updateDoctorsNote(note?.id, payload)
                queryClient.invalidateQueries({ queryKey: ["doctorNotes", patient_id] })
                reset()
            } catch (error) {
                console.error(error)
            } finally {
                setIsSubmitting(false)
            }
        }

        toast.promise(promise(), {
            loading: "Updating...",
            success: "Note updated successfully",
            error: "Failed to update note",
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto p-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
                        <CardHeader className="bg-[#f0f8f4] border-b flex items-center justify-between">
                            <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
                                <FileText size={20} />
                                Edit Doctor Note for {surname} {first_name}
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
                            {/* Doctor's Note */}
                            <div className="mb-4">
                                <Label
                                    className="text-sm font-medium mb-2 block text-gray-700"
                                    htmlFor="note"
                                >
                                    Doctor's Note
                                </Label>
                                <textarea
                                    id="note"
                                    className="w-full p-2 rounded-md border bg-gray-50"
                                    rows={5}
                                    placeholder="Enter doctor's note..."
                                    {...register("note")}
                                />
                                {errors.note && (
                                    <p className="text-red-500 text-sm">
                                        {errors.note.message}
                                    </p>
                                )}
                            </div>

                            {/* Date */}
                            <div className="mb-4">
                                <Label
                                    className="text-sm font-medium mb-2 block text-gray-700"
                                    htmlFor="date"
                                >
                                    Date
                                </Label>
                                <Input
                                    className="bg-gray-50"
                                    id="date"
                                    type="date"
                                    {...register("date")}
                                />
                                {errors.date && (
                                    <p className="text-red-500 text-sm">
                                        {errors.date.message}
                                    </p>
                                )}
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
            </DialogContent>
        </Dialog>
    )
}
