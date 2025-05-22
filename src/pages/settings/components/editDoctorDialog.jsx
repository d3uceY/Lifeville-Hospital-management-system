import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateDoctor } from "../../../providers/ApiProviders"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react'
import spinnerLight from '/spinner-light.svg'


const specialties = [
    "Allergy and Immunology",
    "Anesthesiology",
    "Bariatric Medicine",
    "Cardiology",
    "Cardiothoracic Surgery",
    "Colorectal Surgery",
    "Critical Care Medicine",
    "Dermatology",
    "Emergency Medicine",
    "Endocrinology",
    "Family Medicine",
    "Gynecology",
    "Gastroenterology",
    "General Surgery",
    "Genetics",
    "Geriatrics",
    "Gynecologic Oncology",
    "Hematology",
    "Hepatology",
    "Hospice and Palliative Medicine",
    "Infectious Disease",
    "Internal Medicine",
    "Interventional Radiology",
    "Maternal-Fetal Medicine",
    "Medical Toxicology",
    "Neonatology",
    "Nephrology",
    "Neurology",
    "Neurosurgery",
    "Nuclear Medicine",
    "Obstetrics and Gynecology",
    "Occupational Medicine",
    "Oncology",
    "Ophthalmology",
    "Oral and Maxillofacial Surgery",
    "Orthopedics",
    "Otolaryngology",
    "Pain Medicine",
    "Pathology",
    "Pediatric Surgery",
    "Pediatrics",
    "Physical Medicine and Rehabilitation",
    "Plastic Surgery",
    "Podiatry",
    "Preventive Medicine",
    "Psychiatry",
    "Pulmonology",
    "Radiation Oncology",
    "Radiology",
    "Reproductive Endocrinology",
    "Rheumatology",
    "Sleep Medicine",
    "Sports Medicine",
    "Surgical Oncology",
    "Thoracic Surgery",
    "Transplant Surgery",
    "Trauma Surgery",
    "Urology",
    "Vascular Surgery"
]

export default function EditDoctorDialog({ children, doctor, refresh }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const schema = z.object({
        firstName: z.string().nonempty({ message: "First Name is required" }),
        lastName: z.string().nonempty({ message: "Last Name is required" }),
        specialty: z.string().nonempty({ message: "Specialty is required" }),
    });

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        control
    } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: doctor?.first_name,
            lastName: doctor?.last_name,
            specialty: doctor?.specialty,
        }
    })

    const onSubmit = async (data) => {
        const promise = async () => {
            try {
                setIsSubmitting(true);
                const payload = {
                    ...data,
                    doctorId: doctor?.doctor_id
                }
                const response = await updateDoctor(payload);

                //this function calls the refresh function to update the doctor list
                refresh();
                return response; // Resolving the response data
            } catch (err) {
                console.error(err)
                throw err; // Throwing error to be caught by `toast.promise`
            } finally {
                setIsSubmitting(false);
            }
        };

        toast.promise(promise(), {
            loading: 'Updating doctor...',
            success: (data) => `${data.message}`, // Display success message from response
            error: (err) => err.response?.data?.message || 'An error occurred', // Display error message
        });
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="">Edit Doctor</DialogTitle>
                    <DialogDescription>
                        Edit the doctor information. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                className="border-[#268a6461] focus-visible:ring-[#268a6429]"
                                {...register("firstName")}
                            />
                            {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                className="border-[#268a6461] focus-visible:ring-[#268a6429]"
                                {...register("lastName")}
                            />
                            {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="specialty">Specialty</Label>
                            <Controller
                                name="specialty"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={(value) => field.onChange(value)}
                                        value={field.value || ""}
                                    >
                                        <SelectTrigger id="specialty" className="border-[#268a6461] focus:ring-[#268a6429]">
                                            <SelectValue placeholder="Select a specialty" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Medical Specialties</SelectLabel>
                                                {specialties.map((specialty) => (
                                                    <SelectItem
                                                        key={specialty}
                                                        value={specialty}
                                                        className="hover:bg-[#e6f2ed] hover:"
                                                    >
                                                        {specialty}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.specialty && <p className="text-red-500">{errors.specialty.message}</p>}
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="border-[#268a6461]">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={!isValid || isSubmitting} className="bg-[#106041] hover:bg-[#0d4e34]">
                            {isSubmitting && <img src={spinnerLight} alt="loading" className="w-8 h-8" />}
                            Save Doctor
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

    )
}
