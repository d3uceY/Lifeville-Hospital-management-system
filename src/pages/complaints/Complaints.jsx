import React from 'react'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { FileText } from 'lucide-react'
import { useAuth } from "../../providers/AuthContext"
import { useParams } from 'react-router-dom'
import { createComplaint } from '../../providers/ApiProviders'
import ComplaintsTable from './components/ComplaintsTable'
import { useQueryClient } from '@tanstack/react-query'

export default function Complaints() {
    const { user } = useAuth()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { patient_id } = useParams()

    const schema = z.object({
        recordedBy: z.string().optional(),
        patientId: z.string().nonempty({ message: "Patient selection is required" }),
        complaint: z.string().nonempty({ message: "Complaint is required" }),
    })

    const methods = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            recordedBy: user?.name,
            patientId: patient_id,
            complaint: "",
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
                const response = await createComplaint({
                    ...data,
                    patientId: parseInt(patient_id),
                })
                setIsSubmitting(false)
                return response;
            } catch (error) {
                setIsSubmitting(false)
                return error;
            }
        }
        toast.promise(promise(), {
            loading: 'Creating complaint...',
            success: `Complaint created successfully`,
            error: (err) => err.response?.data?.message || err?.message || 'An error occurred'
        });
        reset();
        queryClient.invalidateQueries({
            queryKey: ['patientComplaints'],
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
                    <CardHeader className="bg-[#f0f8f4] border-b flex items-center justify-between">
                        <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
                            <FileText size={20} />
                            Record Complaint
                        </CardTitle>

                        <Button className="mt-6" type="submit" disabled={!isValid || isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Add Complaint"}
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="complaint">
                                Complaint
                            </Label>
                            <Textarea
                                className="text-black border-[#268a6477] bg-gray-50"
                                id="complaint"
                                placeholder="Any additional notes or comments about this bill..."
                                {...register("complaint")}
                            />
                        </div>
                        <p className="text-red-500">{errors.complaint?.message}</p>
                    </CardContent>
                </Card>

            </form>
            <ComplaintsTable patientId={patient_id} />
        </div>
    )
}
