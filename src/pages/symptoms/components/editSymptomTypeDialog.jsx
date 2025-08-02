import { updateSymptomType } from "../../../providers/ApiProviders"
import { useSymptomTypes } from "../../../providers/ApiContextProvider"
import { useState } from "react"
import { FilePlus, FileText, Edit2 } from "lucide-react"

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


export function EditSymptomTypeDialog({ symptom }) {

    const { symptom_text, symptom_type_id } = symptom;

    const { refreshSymptomTypes } = useSymptomTypes();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [open, setOpen] = useState(false)

    const schema = z.object({
        symptomText: z.string().nonempty({ message: "Symptom type is required" }),
    });

    const { register, formState: { isValid, errors }, handleSubmit, control } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            symptomText: symptom_text,
        }
    })

    const onSubmit = (data) => {
        const promise = async () => {
            setIsSubmitting(true)
            try {
                const response = await updateSymptomType(symptom_type_id, data)
                setOpen(false)
                refreshSymptomTypes()
                return response;
            } catch (error) {
                console.error(error)
                throw error
            } finally {
                setIsSubmitting(false)
            }
        }

        toast.promise(promise(), {
            loading: 'Updating symptom type...',
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
                        Edit Symptom Type
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="grid gap-4 py-4">

                        <div className="grid gap-2">
                            <Label htmlFor="symptomText" className="text-gray-700 flex items-center gap-1">
                                <FileText className="h-3.5 w-3.5 " />
                                Symptom Type
                            </Label>
                            <Input
                                id="symptomText"
                                placeholder="write symptom type..."
                                required
                                className="border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                                {...register("symptomText")}
                            />
                            {errors.symptomText && <p className="text-red-500">{errors.symptomText.message}</p>}
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

                            Update Symptom Type
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
