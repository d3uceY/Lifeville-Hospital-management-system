import React from 'react'
import { useState } from "react"
import { useForm, Controller, useFieldArray } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { FileText } from 'lucide-react'
import { useAuth } from "../../providers/AuthContext"
import { useLabTests } from '../../providers/ApiContextProvider'
import { useParams } from 'react-router-dom'
import { createLabTest } from '../../providers/ApiProviders'

export default function LabTestAnalysis() {
    const { user } = useAuth()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { labTestTypes } = useLabTests()
    const { patient_id } = useParams()

    const schema = z.object({
        prescribedBy: z.string().optional(),
        patientId: z.string().nonempty({ message: "Patient selection is required" }),
        testType: z.string().nonempty({ message: "Test type is required" }),
        comments: z.string().optional(),
    })

    const methods = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            prescribedBy: user?.name,
            patientId: patient_id,
            testType: "",
            comments: "",
        },
    })


    const {
        handleSubmit,
        formState: { isValid, errors },
        register,
        getValues,
        control,
        watch,
        setValue,
    } = methods

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        const promise = async () => {
            try {
                const response = await createLabTest({
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
            loading: 'Creating lab test...',
            success: `Lab test created successfully`,
            error: (err) => err.response?.data?.message || err?.message || 'An error occurred'
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
                    <CardHeader className="bg-[#f0f8f4] border-b flex items-center justify-between">
                        <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
                            <FileText size={20} />
                            Prescribe Analysis
                        </CardTitle>

                        <Button className="mt-6" type="submit" disabled={!isValid || isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Add Analysis"}
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="testType">
                                Test Type
                            </Label>
                            <Controller
                                name="testType"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full bg-gray-50">
                                            <SelectValue placeholder="Select test type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Test Types</SelectLabel>
                                                {labTestTypes.map((testType) => (
                                                    <SelectItem key={testType.id} value={testType.name}>
                                                        {testType.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.testType && <p className="text-red-500 text-sm mt-1">{errors.testType.message}</p>}
                        </div>

                        <div>
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="comments">
                                Comments
                            </Label>
                            <Textarea
                                className="text-black border-[#268a6477] bg-gray-50"
                                id="comments"
                                placeholder="Any additional notes or comments about this bill..."
                                {...register("comments")}
                            />
                        </div>
                    </CardContent>
                </Card>

            </form>
        </div>
    )
}
