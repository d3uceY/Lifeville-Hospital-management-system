import { createSymptomType } from "../../../providers/ApiProviders"
import { useSymptomTypes } from "../../../providers/ApiContextProvider"
import { useState } from "react"
import { FilePlus, FileText } from "lucide-react"

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


export function CreateSymptomTypeDialog() {
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
            symptomText: "",
        }
    })

    const onSubmit = (data) => {
        const promise = async () => {
            setIsSubmitting(true)
            try {
                const response = await createSymptomType(data)
                setOpen(false)
                refreshSymptomTypes()
                return response;
            } catch (error) {
                console.log(error)
                throw error
            } finally {
                setIsSubmitting(false)
            }
        }

        toast.promise(promise(), {
            loading: 'Creating symptom type...',
            success: (data) => `${data.message}`,
            error: (err) => err.response?.data?.message || err?.message || 'An error occurred'
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#106041] hover:bg-[#0d4e34]">
                    <FilePlus className="mr-2 h-4 w-4" />
                    Create Symptom Type
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]   overflow-y-auto ">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Create Symptom Type
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

                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
