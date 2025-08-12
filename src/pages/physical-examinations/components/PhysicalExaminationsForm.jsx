import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ClipboardList } from "lucide-react"
import { createPhysicalExamination } from "../../../providers/ApiProviders"
import { useState } from "react"
import { toast } from "sonner"
import { useAuth } from "../../../providers/AuthContext"
import { useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

export default function ProfilePhysicalExaminationForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { user } = useAuth()
    const { patient_id } = useParams()
    const queryClient = useQueryClient()

    const schema = z.object({
        recorded_by: z.string().nonempty({ message: "Recorded by is required" }),
        general_appearance: z.string().optional(),
        heent: z.string().optional(),
        cardiovascular: z.string().optional(),
        respiration: z.string().optional(),
        gastrointestinal: z.string().optional(),
        gynecology_obstetrics: z.string().optional(),
        musculoskeletal: z.string().optional(),
        neurological: z.string().optional(),
        skin: z.string().optional(),
        findings: z.string().optional(),
    }).refine(
        (data) => {
            // Get all keys except recorded_by
            const otherFields = { ...data };
            delete otherFields.recorded_by;
    
            // Check if at least one is truthy & not an empty string
            return Object.values(otherFields).some(val => val && val.trim() !== "");
        },
        {
            message: "At least one examination field must be filled in",
            path: ["general_appearance"], // you can attach the error to a generic field
        }
    );
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
            general_appearance: "",
            heent: "",
            cardiovascular: "",
            respiration: "",
            gastrointestinal: "",
            gynecology_obstetrics: "",
            musculoskeletal: "",
            neurological: "",
            skin: "",
            findings: "",
        }
    })

    const onSubmit = async (data) => {
        const promise = async () => {
            try {
                setIsSubmitting(true)
                const payload = { ...data, patient_id }
                await createPhysicalExamination(payload)
                queryClient.invalidateQueries({ queryKey: ['physicalExaminations', patient_id] })
                reset()
            } catch (error) {
                console.error(error)
                throw error
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

    const renderField = (id, label) => (
        <div className="mb-4">
            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor={id}>
                {label}
            </Label>
            {id === "findings" ? (
                <textarea
                    className="bg-gray-50 border border-gray-300 rounded-md p-2 w-full resize-y"
                    id={id}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    rows={4}
                    {...register(id)}
                />
            ) : (
                <Input
                    className="bg-gray-50"
                    id={id}
                    type="text"
                    placeholder={`Enter ${label.toLowerCase()}`}
                    {...register(id)}
                />
            )}
            {errors[id] && <p className="text-red-500 text-sm">{errors[id]?.message}</p>}
        </div>
    )

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
                <CardHeader className="bg-[#f0f8f4] border-b flex items-center justify-between">
                    <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
                        <ClipboardList size={20} />
                        Physical Examination
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
                  
                    {renderField("general_appearance", "General Appearance")}
                  
                    {renderField("heent", "HEENT")}
                  
                    {renderField("cardiovascular", "Cardiovascular")}
                  
                    {renderField("respiration", "Respiration")}
                  
                    {renderField("gastrointestinal", "Gastrointestinal")}
                  
                    {renderField("gynecology_obstetrics", "Gynecology / Obstetrics")}
                  
                    {renderField("musculoskeletal", "Musculoskeletal")}
                  
                    {renderField("neurological", "Neurological")}
                  
                    {renderField("skin", "Skin")}
                  
                    {renderField("findings", "Findings")}

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
