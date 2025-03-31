
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

export default function VitalSignsDialog({ children, patient }) {
    return (
        <Dialog>
            <DialogTrigger asChild className="focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive-foreground data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/40 data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:!text-destructive-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Vital Signs for <span>{patient?.surname} {patient?.first_name}</span></DialogTitle>
                    <DialogDescription>
                        Record patient vital signs. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4">
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
                            />
                        </div>
                    </div>

                    <Separator />

                    {/* Blood Pressure */}
                    <div className="grid gap-2">
                        <Label htmlFor="bp-systolic">Blood Pressure (mmHg)</Label>
                        <div className="flex items-center gap-2">
                            <Input id="bp-systolic" type="number" placeholder="120" className="flex-1" />
                            <span className="text-lg font-medium">/</span>
                            <Input id="bp-diastolic" type="number" placeholder="80" className="flex-1" />
                        </div>
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
                            />
                        </div>
                    </div>

                    <Separator />

                    {/* Pulse Rate */}
                    <div className="grid gap-2">
                        <Label htmlFor="pulse">Pulse Rate (bpm)</Label>
                        <Input id="pulse" type="number" placeholder="75" />
                    </div>

                    <Separator />

                    {/* SPO₂ */}
                    <div className="grid gap-2">
                        <Label htmlFor="spo2">SPO₂ (%)</Label>
                        <Input id="spo2" type="number" min="0" max="100" placeholder="98" />
                    </div>

                    <Button type="submit" className="mt-4">
                        Save Vital Signs
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
