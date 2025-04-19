import { useBirthAndDeaths } from "../../../providers/ApiContextProvider"
import { useState } from "react"
import { updateBirthRecord } from "../../../providers/ApiProviders"
import { User, FileText, Clock, Baby, Weight, Phone, MapPin, VenusAndMars, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import spinnerLight from '/spinner-light.svg'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from "react-hook-form"
import { Controller } from "react-hook-form"


export function EditBirthDialog({ children, birthRecord }) {
    const { refreshBirths } = useBirthAndDeaths();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [open, setOpen] = useState(false)
    const { birth_id, child_name, gender, birth_date, mother_name, father_name, weight, phone_number, address, report } = birthRecord
    console.log(birth_date)
    const schema = z.object({
        childName: z.string().nonempty({ message: "Child name is required" }),
        gender: z.string().nonempty({ message: "Gender is required" }),
        birthDate: z.string().nonempty({ message: "Birth date is required" }),
        motherName: z.string().nonempty({ message: "Mother name is required" }),
        fatherName: z.string().optional(),
        weight: z.string().nonempty({ message: "Weight is required" }),
        phoneNumber: z.string().nonempty({ message: "Phone number is required" })
            .regex(/^\+?\d{7,15}$/, { message: "Enter a valid phone number (7-15 digits, optional +)" }),
        address: z.string().nonempty({ message: "Address is required" }),
        report: z.string().optional()
    });

    const { register, formState: { isValid, errors }, handleSubmit, control } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            childName: child_name || '',
            gender: gender || '',
            birthDate: new Date(birth_date) || '',
            motherName: mother_name || '',
            fatherName: father_name || '',
            weight: weight || '',
            phoneNumber: phone_number || '',
            address: address || '',
            report: report || ''
        }
    })

    const onSubmit = (data) => {
        const promise = async () => {
            const payload = {
                ...data,
                weight: Number(data.weight)
            }
            setIsSubmitting(true)
            try {
                const response = await updateBirthRecord(birth_id, payload)
                console.log(response)
                setOpen(false)
                refreshBirths()
                return response;
            } catch (error) {
                console.log(error)
                throw error
            } finally {
                setIsSubmitting(false)
            }
        }

        toast.promise(promise(), {
            loading: 'Updating birth record...',
            success: (data) => `${data.message}`,
            error: (err) => err.response?.data?.message || err?.message || 'An error occurred'
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-transparent text-black hover:bg-[#e6f2ed] hover:text-[#106041] w-full justify-start">
                    <Edit2 className="mr-2 h-4 w-4" />
                    {children}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] h-[80vh] max-h-[700px]   overflow-y-auto border-[#e0f0e8]">
                <DialogHeader>
                    <DialogTitle className="text-[#106041] flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Add Patient Birth Record
                    </DialogTitle>
                    <DialogDescription>
                        Enter the details of the patient's Birth record. All fields are required.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="childName" className="text-gray-700 flex items-center gap-1">
                                <Baby className="h-3.5 w-3.5 text-[#268A64]" />
                                Child Name
                            </Label>
                            <div className="relative">
                                <Input type="text" placeholder="write name of child" id="childName" {...register('childName')} />
                            </div>
                            {errors.childName && <p className="text-red-500">{errors.childName.message}</p>}
                        </div>


                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="gender" className="text-gray-700 flex items-center gap-1">
                                    <VenusAndMars className="h-3.5 w-3.5 text-[#268A64]" />
                                    Gender
                                </Label>
                                <div className="relative">
                                    <Controller
                                        name="gender"
                                        control={control}
                                        render={({ field }) => (
                                            <Select onValueChange={(value) => field.onChange(value)} value={field.value || ""}>
                                                <SelectTrigger id="gender" className=" border-[#268a6461] focus:ring-[#268a6429] w-full">
                                                    <SelectValue placeholder="Select gender" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Male">Male</SelectItem>
                                                    <SelectItem value="Female">Female</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>
                                {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="birthDate" className="text-gray-700 flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5 text-[#268A64]" />
                                    Date and Time of Birth
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="birthDate"
                                        type="datetime-local"
                                        required
                                        className=" border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                                        {...register("birthDate")}
                                    />
                                    {errors.birthDate && <p className="text-red-500">{errors.birthDate.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="motherName" className="text-gray-700 flex items-center gap-1">
                                <User className="h-3.5 w-3.5 text-[#268A64]" />
                                Mother's Name
                            </Label>
                            <Input
                                id="motherName"
                                placeholder="Enter mother's full name"
                                required
                                className="border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                                {...register("motherName")}
                            />
                            {errors.motherName && <p className="text-red-500">{errors.motherName.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="fatherName" className="text-gray-700 flex items-center gap-1">
                                <User className="h-3.5 w-3.5 text-[#268A64]" />
                                Father's Name
                            </Label>
                            <Input
                                id="fatherName"
                                placeholder="Enter father's full name"
                                className="border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                                {...register("fatherName")}
                            />
                            {errors.fatherName && <p className="text-red-500">{errors.fatherName.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="weight" className="text-gray-700 flex items-center gap-1">
                                <Weight className="h-3.5 w-3.5 text-[#268A64]" />
                                Weight (kg)
                            </Label>
                            <Input
                                id="weight"
                                placeholder="Enter weight in kilograms"
                                type="number"
                                className="border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                                {...register("weight")}
                            />
                            {errors.weight && <p className="text-red-500">{errors.weight.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phoneNumber" className="text-gray-700 flex items-center gap-1">
                                <Phone className="h-3.5 w-3.5 text-[#268A64]" />
                                Phone Number
                            </Label>
                            <Input
                                id="phoneNumber"
                                placeholder="e.g. 0712345678"
                                type="text"
                                required
                                className="border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                                {...register("phoneNumber")}
                            />
                            {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="address" className="text-gray-700 flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5 text-[#268A64]" />
                                Address
                            </Label>
                            <Textarea
                                id="address"
                                placeholder="Enter address"
                                required
                                className="min-h-[120px] border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                                {...register("address")}
                            />
                            {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                        </div>


                        <div className="grid gap-2">
                            <Label htmlFor="report" className="text-gray-700 flex items-center gap-1">
                                <FileText className="h-3.5 w-3.5 text-[#268A64]" />
                                Report
                            </Label>
                            <Textarea
                                id="report"
                                placeholder="Enter detailed report about the death..."
                                required
                                className="min-h-[120px] border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                                {...register("report")}
                            />
                            {errors.report && <p className="text-red-500">{errors.report.message}</p>}
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

                            Save Record
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

// Example usage
export default function BirthRecordPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-[#106041] mb-6">Patient Records</h1>
            <DeathRecordDialog />
        </div>
    )
}
