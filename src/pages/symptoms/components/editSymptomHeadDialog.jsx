import { useSymptomHeads } from "../../../providers/ApiContextProvider"
import { useState } from "react"
import { FileText, Tags, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import spinnerLight from '/spinner-light.svg'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from "react-hook-form"
import { Controller } from "react-hook-form"
import { useSymptomTypes } from "../../../providers/ApiContextProvider"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateSymptomHead } from "../../../providers/ApiProviders"



export function EditSymptomHeadDialog({ symptomHead }) {
    const { symptom_head_id, symptom_type_id, symptom_head, symptom_description } = symptomHead;
    const { refreshSymptomHeads } = useSymptomHeads();
    const { symptomTypes, loadingSymptomTypes } = useSymptomTypes();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [open, setOpen] = useState(false)

    const schema = z.object({
        symptomHeadText: z.string().nonempty({ message: "Symptom head is required" }),
        symptomTypeId: z.string().nonempty({ message: "Symptom type is required" }),
        symptomDescription: z.string().nonempty({ message: "Symptom description is required" }),
    });

    const { register, formState: { isValid, errors }, handleSubmit, control } = useForm({

        resolver: zodResolver(schema),
        defaultValues: {
            symptomHeadText: symptom_head,
            symptomTypeId: `${symptom_type_id}`,
            symptomDescription: symptom_description,
        }
    })

    const onSubmit = (data) => {
        const promise = async () => {
            setIsSubmitting(true)
            const payload = {
                ...data,
                symptomTypeId: Number(data.symptomTypeId)
            }
            try {
                const response = await updateSymptomHead(symptom_head_id, payload)
                setOpen(false)
                refreshSymptomHeads()
                return response;
            } catch (error) {
                console.log(error)
                throw error
            } finally {
                setIsSubmitting(false)
            }
        }

        toast.promise(promise(), {
            loading: 'Creating symptom head...',
            success: (data) => `${data.message}`,
            error: (err) => err.response?.data?.message || err?.message || 'An error occurred'
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="action-edit-btn">
                    <Edit2 className=" h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]   overflow-y-auto ">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Create Symptom Head
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="grid gap-4 py-4">

                        <div className="grid gap-2">
                            <Label htmlFor="symptomHeadText" className="text-gray-700 flex items-center gap-1">
                                <FileText className="h-3.5 w-3.5 " />
                                Symptom Head
                            </Label>
                            <Input
                                id="symptomHeadText"
                                placeholder="write symptom head..."
                                required
                                className="border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                                {...register("symptomHeadText")}
                            />
                            {errors.symptomHeadText && <p className="text-red-500">{errors.symptomHeadText.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="symptomTypeId" className="text-gray-700 flex items-center gap-1">
                                <Tags className="h-3.5 w-3.5 " />
                                Symptom Type
                            </Label>
                            <div className="relative">
                                {
                                    loadingSymptomTypes && (
                                        <img src={spinnerLight} alt="" className="absolute left-1 top-1/2 -translate-y-1/2 h-8 w-8" />
                                    )
                                }
                                <Controller
                                    name="symptomTypeId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={(value) => field.onChange(value)} value={field.value || ""}>
                                            <SelectTrigger id="symptomTypeId" className="border-[#268a6461] focus:ring-[#268a6429]">
                                                <SelectValue placeholder={loadingSymptomTypes ? "Loading..." : symptomTypes.length > 0 ? `Select a symptom type` : `No symptom types found`} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {symptomTypes
                                                    .map((symptomType) => (
                                                        <SelectItem key={symptomType.symptom_type_id} value={`${symptomType.symptom_type_id}`}>
                                                            <span>{symptomType.symptom_text}</span>
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            {errors.symptomTypeId && <p className="text-red-500">{errors.symptomTypeId.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="symptomDescription" className="text-gray-700 flex items-center gap-1">
                                <FileText className="h-3.5 w-3.5 " />
                                Description
                            </Label>
                            <Textarea
                                id="symptomDescription"
                                placeholder="write description..."
                                required
                                className="min-h-[120px] border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                                {...register("symptomDescription")}
                            />
                            {errors.symptomDescription && <p className="text-red-500">{errors.symptomDescription.message}</p>}
                        </div>
                    </div>

                    <DialogFooter className="gap-2 flex items-center">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="border-[#268a6461] text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </Button>
                        <Button disabled={!isValid || isSubmitting} type="submit" className="bg-[#106041] hover:bg-[#0d4e34]">
                            {
                                isSubmitting && (<img src={spinnerLight} alt="" className=" h-8 w-8" />)
                            }

                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
