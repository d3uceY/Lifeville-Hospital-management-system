"use client"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"


// Mock data for doctors
const doctors = [
    { id: 1, name: "Dr. Emily Wilson", specialty: "Cardiology" },
    { id: 2, name: "Dr. Michael Chen", specialty: "Neurology" },
    { id: 3, name: "Dr. Lisa Thompson", specialty: "Dermatology" },
    { id: 4, name: "Dr. James Wilson", specialty: "Orthopedics" },
    { id: 5, name: "Dr. Sarah Johnson", specialty: "Endocrinology" },
    { id: 6, name: "Dr. Robert Davis", specialty: "Pediatrics" },
    { id: 7, name: "Dr. Maria Garcia", specialty: "Ophthalmology" },
    { id: 8, name: "Dr. David Lee", specialty: "Psychiatry" },
]

// Time slots
const timeSlots = [
    "08:00 AM",
    "08:30 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
]

export default function BookAppointmentDialog({ children }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-[#106041] hover:bg-[#0d4e34]">Book Appointment</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-[#e0f0e8] bg-[#f0f8f4]">
                    <DialogTitle className="text-xl font-bold text-[#106041]">{children}</DialogTitle>
                    <DialogDescription className="text-[#268A64]">
                        Fill out the form below to schedule a new appointment.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 px-6 py-6">
                    <div className="space-y-2">
                        <Label className="text-gray-700" htmlFor="doctor">
                            Doctor
                        </Label>
                        <Select>
                            <SelectTrigger id="doctor" className="border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]">
                                <SelectValue placeholder="Select a doctor" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[200px]">
                                {doctors.map((doctor) => (
                                    <SelectItem
                                        key={doctor.id}
                                        value={doctor.id.toString()}
                                        className="hover:bg-[#e6f2ed] hover:text-[#106041]"
                                    >
                                        <div className="flex flex-col">
                                            <span>{doctor.name}</span>
                                            <span className="text-xs text-gray-500">{doctor.specialty}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-gray-700" htmlFor="date">
                                Date
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="date"
                                        variant="outline"
                                        className="w-full pl-3 text-left font-normal border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64] text-muted-foreground"
                                    >
                                        <span>Pick a date</span>
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="single" initialFocus className="border-[#e0f0e8]" />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-gray-700" htmlFor="time">
                                Time
                            </Label>
                            <Select>
                                <SelectTrigger id="time" className="border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]">
                                    <SelectValue placeholder="Select a time" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                    {timeSlots.map((time) => (
                                        <SelectItem key={time} value={time} className="hover:bg-[#e6f2ed] hover:text-[#106041]">
                                            {time}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-gray-700" htmlFor="reason">
                            Reason for Visit
                        </Label>
                        <Textarea
                            id="reason"
                            placeholder="Brief description of your reason for visit"
                            className="resize-none border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                        />
                        <p className="text-xs text-gray-500">
                            Please provide a brief description of your symptoms or reason for the appointment.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-gray-700" htmlFor="notes">
                            Additional Notes (Optional)
                        </Label>
                        <Textarea
                            id="notes"
                            placeholder="Any additional information for the doctor"
                            className="resize-none border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                        />
                    </div>

                    <DialogFooter className="pt-2">
                        <Button type="button" variant="outline" className="border-[#268a6461] text-gray-700 hover:bg-gray-100">
                            Cancel
                        </Button>
                        <Button type="button" className="bg-[#106041] hover:bg-[#0d4e34]">
                            Book Appointment
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}

