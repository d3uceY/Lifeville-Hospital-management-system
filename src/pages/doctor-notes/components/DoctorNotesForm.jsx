import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { NotebookPen } from 'lucide-react'
import { useAuth } from '../../../providers/AuthContext'
import { useParams } from 'react-router-dom'
import { createDoctorsNote } from "../../../providers/ApiProviders"
import { useQueryClient } from '@tanstack/react-query'
import ProfileFormHeader from '../../../components/profile-form-header'

export default function DoctorsNotesForm() {
    const { user } = useAuth()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { patient_id } = useParams()

    const schema = z.object({
        recordedBy: z.string().optional(),
        patientId: z.string().nonempty({ message: "Patient selection is required" }),
        note: z.string().nonempty({ message: "Doctor's note is required" }),
    })

    const methods = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            recordedBy: user?.name,
            patientId: patient_id,
            note: "",
        },
    })

    const {
        handleSubmit,
        formState: { isValid, errors },
        register,
        reset,
    } = methods

    const queryClient = useQueryClient()
    const onSubmit = async (data) => {
        setIsSubmitting(true)
        const promise = async () => {
            try {
                const response = await createDoctorsNote({
                    ...data,
                    patientId: parseInt(patient_id),
                })
                setIsSubmitting(false)
                return response
            } catch (error) {
                setIsSubmitting(false)
                return error
            }
        }
        toast.promise(promise(), {
            loading: "Saving note...",
            success: `Doctor's note added successfully`,
            error: (err) => err.response?.data?.message || err?.message || "An error occurred"
        })
        reset()
        queryClient.invalidateQueries({
            queryKey: ["doctorNotes", patient_id],
        })
    }

    return (
        <div>
            <ProfileFormHeader 
                title="Add Doctor's Note" 
                description={`Fill in the details to record a doctor's note for patient #${patient_id}`} 
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
                    <CardHeader className="bg-[#f0f8f4] border-b flex items-center justify-between">
                        <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
                            <NotebookPen size={20} />
                            Doctor's Note
                        </CardTitle>

                        <Button className="mt-6" type="submit" disabled={!isValid || isSubmitting}>
                            {isSubmitting ? "Saving..." : "Add Note"}
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <Label 
                                className="text-sm font-medium mb-2 block text-gray-700" 
                                htmlFor="note"
                            >
                                Note
                            </Label>
                            <Textarea
                                className="text-black border-[#268a6477] bg-gray-50"
                                id="note"
                                placeholder="Write doctor's note here..."
                                {...register("note")}
                            />
                        </div>
                        <p className="text-red-500">{errors.note?.message}</p>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}
