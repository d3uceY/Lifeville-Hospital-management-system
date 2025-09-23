import React from 'react'
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { FileText, ChevronsUpDown } from 'lucide-react'
import { useAuth } from "../../providers/AuthContext"
import { useLabTests } from '../../providers/ApiContextProvider'
import { useParams } from 'react-router-dom'
import { createLabTest } from '../../providers/ApiProviders'
import LabTestAnalysisTable from './components/LabTestAnalysisTable'
import { useQueryClient } from '@tanstack/react-query'
import ProfileFormHeader from '../../components/profile-form-header'
import { hasPermission } from '../../helpers/hasPermission'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"


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
        reset,
        setValue,
    } = methods


    const queryClient = useQueryClient()
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
        reset();
        queryClient.invalidateQueries({
            queryKey: ['patientLabTests'],
        })
    }

    return (
        <div>
            <ProfileFormHeader title="Lab Test Analysis / investigations" description="Fill in the details to create a lab test analysis" />
            {
                hasPermission(['doctor', 'superadmin']) && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
                            <CardHeader className="bg-[#f0f8f4] border-b flex items-center justify-between">
                                <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
                                    <FileText size={20} />
                                    Prescribe Test
                                </CardTitle>

                            </CardHeader>
                            <CardContent>
                                <div className="mb-4">
                                    <Controller
                                        name="testType"
                                        control={control}
                                        render={({ field }) => {
                                            const selectedTest = labTestTypes.find((t) => t.name === field.value)

                                            return (
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                "w-full justify-between bg-gray-50",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {selectedTest ? selectedTest.name : "Select test type"}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[300px] p-0">
                                                        <Command>
                                                            <CommandInput placeholder="Search test type..." className="h-9" />
                                                            <CommandList>
                                                                <CommandEmpty>No test type found.</CommandEmpty>
                                                                <CommandGroup heading="Test Types">
                                                                    {labTestTypes.map((testType) => (
                                                                        <CommandItem
                                                                            key={testType.id}
                                                                            value={testType.name}
                                                                            onSelect={() => {
                                                                                field.onChange(testType.name)
                                                                            }}
                                                                        >
                                                                            <Check
                                                                                className={cn(
                                                                                    "mr-2 h-4 w-4",
                                                                                    field.value === testType.name ? "opacity-100" : "opacity-0"
                                                                                )}
                                                                            />
                                                                            {testType.name}
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </CommandList>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                            )
                                        }}
                                    />
                                    {errors.testType && (
                                        <p className="text-red-500 text-sm mt-1">{errors.testType.message}</p>
                                    )}
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
                                <Button className="mt-6 ml-auto block w-fit" type="submit" disabled={!isValid || isSubmitting}>
                                    {isSubmitting ? "Submitting..." : "Add Test"}
                                </Button>

                            </CardContent>
                        </Card>

                    </form>
                )
            }
            <LabTestAnalysisTable patientId={patient_id} />
        </div>
    )
}
