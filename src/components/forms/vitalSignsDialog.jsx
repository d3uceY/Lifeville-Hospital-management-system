import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { createVitalSign } from "../../providers/ApiProviders"

export default function VitalSignsDialog({ children, patient }) {
    const schema = z.object({
        temperature: z.number().min(0).max(45).optional(),
        diastolicBloodPressure: z.number().min(0).max(150).optional(),
        systolicBloodPressure: z.number().min(0).max(250).optional(),
        heartRate: z.number().min(0).max(220).optional(),
        weight: z.number().min(0).max(300).optional(),
        spo2: z.number().min(0).max(100).optional(), // Added SpO₂ field (percentage)
        date: z.string().nonempty({ message: "Date is required" }),
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: "onSubmit",
        resolver: zodResolver(schema),
        defaultValues: {
            temperature: 0,
            diastolicBloodPressure: 0,
            systolicBloodPressure: 0,
            heartRate: 0,
            weight: 0,
            spo2: 0, // Default value for SpO₂
            date: new Date(),
        }
    })
    const onSubmit = async (data) => {
        try {
            // Merge the form data with the patient ID into one payload object
            const payload = {
                ...data,
                patientId: patient?.patient_id, // adding patientId into the body
            };
            const response = await createVitalSign(payload);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild className="focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive-foreground data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/40 data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:!text-destructive-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        Vital Signs for <span>{patient?.surname} {patient?.first_name}</span>
                    </DialogTitle>
                    <DialogDescription>
                        Record patient vital signs. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    {/* Temperature */}
                    <div className="grid gap-2">
                        <Label htmlFor="temperature">Temperature (°C)</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                id="temperature"
                                type="number"
                                step="0.1"
                                placeholder="°C"
                                className="flex-1"
                                {...register("temperature", { valueAsNumber: true })}
                            />
                        </div>
                        {errors.temperature && <p className="text-sm text-red-500">{errors.temperature.message}</p>}
                    </div>

                    <Separator />

                    {/* Blood Pressure */}
                    <div className="grid gap-2">
                        <Label htmlFor="bp-systolic">Blood Pressure (mmHg)</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                id="bp-systolic"
                                type="number"
                                placeholder="120"
                                className="flex-1"
                                {...register("systolicBloodPressure", { valueAsNumber: true })}
                            />
                            <span className="text-lg font-medium">/</span>
                            <Input
                                id="bp-diastolic"
                                type="number"
                                placeholder="80"
                                className="flex-1"
                                {...register("diastolicBloodPressure", { valueAsNumber: true })}
                            />
                        </div>
                        {errors.systolicBloodPressure && <p className="text-sm text-red-500">{errors.systolicBloodPressure.message}</p>}
                        {errors.diastolicBloodPressure && <p className="text-sm text-red-500">{errors.diastolicBloodPressure.message}</p>}
                    </div>

                    <Separator />

                    {/* Weight */}
                    <div className="grid gap-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                id="weight"
                                type="number"
                                step="0.1"
                                placeholder="70"
                                className="flex-1"
                                {...register("weight", { valueAsNumber: true })}
                            />
                        </div>
                        {errors.weight && <p className="text-sm text-red-500">{errors.weight.message}</p>}
                    </div>

                    <Separator />

                    {/* Pulse Rate */}
                    <div className="grid gap-2">
                        <Label htmlFor="pulse">Pulse Rate (bpm)</Label>
                        <Input
                            id="pulse"
                            type="number"
                            placeholder="75"
                            {...register("heartRate", { valueAsNumber: true })}
                        />
                        {errors.heartRate && <p className="text-sm text-red-500">{errors.heartRate.message}</p>}
                    </div>

                    <Separator />

                    {/* SpO₂ */}
                    <div className="grid gap-2">
                        <Label htmlFor="spo2">SpO₂ (%)</Label>
                        <Input
                            id="spo2"
                            type="number"
                            step="1"
                            placeholder="98"
                            {...register("spo2", { valueAsNumber: true })}
                        />
                        {errors.spo2 && <p className="text-sm text-red-500">{errors.spo2.message}</p>}
                    </div>

                    <Separator />

                    {/* Date */}
                    <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                            id="date"
                            type="date"
                            placeholder="2024-10-21"
                            {...register("date")}
                        />
                        {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
                    </div>

                    <Separator />

                    <Button type="submit" className="mt-4">
                        Save Vital Signs
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
