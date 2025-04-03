import { Calendar, Clock, User, Users, X, CalendarDays, CheckCircle } from "lucide-react"

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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ScheduleAppointmentDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-[#106041] hover:bg-[#0d4e34]">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Schedule Appointment
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle className="text-[#106041] text-xl flex items-center gap-2">
                        <CalendarDays className="h-5 w-5" />
                        Schedule New Appointment
                    </DialogTitle>
                    <DialogDescription>
                        Fill in the appointment details below to schedule a new patient appointment.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-5 py-4">
                    {/* Date and Time */}
                    <div className="grid gap-2">
                        <Label htmlFor="appointment_date" className="text-gray-700 font-medium">
                            Appointment Date & Time <span className="text-red-500">*</span>
                        </Label>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                    id="appointment_date"
                                    type="date"
                                    className="pl-10 border-[#268a6461] focus-visible:ring-[#268a6429]"
                                />  
                            </div>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                    id="appointment_time"
                                    type="time"
                                    className="pl-10 border-[#268a6461] focus-visible:ring-[#268a6429]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Patient Selection */}
                    <div className="grid gap-2">
                        <Label htmlFor="patient" className="text-gray-700 font-medium">
                            Patient <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Select>
                                <SelectTrigger id="patient" className="pl-10 border-[#268a6461] focus:ring-[#268a6429]">
                                    <SelectValue placeholder="Select a patient" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="john-smith">John Smith</SelectItem>
                                    <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                                    <SelectItem value="robert-davis">Robert Davis</SelectItem>
                                    <SelectItem value="maria-garcia">Maria Garcia</SelectItem>
                                    <SelectItem value="david-lee">David Lee</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Doctor Selection */}
                    <div className="grid gap-2">
                        <Label htmlFor="doctor" className="text-gray-700 font-medium">
                            Doctor <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Select>
                                <SelectTrigger id="doctor" className="pl-10 border-[#268a6461] focus:ring-[#268a6429]">
                                    <SelectValue placeholder="Select a doctor" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="dr-emily-wilson">Dr. Emily Wilson (Cardiology)</SelectItem>
                                    <SelectItem value="dr-michael-chen">Dr. Michael Chen (Neurology)</SelectItem>
                                    <SelectItem value="dr-sarah-johnson">Dr. Sarah Johnson (Endocrinology)</SelectItem>
                                    <SelectItem value="dr-james-wilson">Dr. James Wilson (Orthopedics)</SelectItem>
                                    <SelectItem value="dr-lisa-thompson">Dr. Lisa Thompson (Dermatology)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Duration */}
                    <div className="grid gap-2">
                        <Label htmlFor="duration" className="text-gray-700 font-medium">
                            Duration <span className="text-red-500">*</span>
                        </Label>
                        <Select>
                            <SelectTrigger id="duration" className="border-[#268a6461] focus:ring-[#268a6429]">
                                <SelectValue placeholder="Select appointment duration" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="15">15 minutes</SelectItem>
                                <SelectItem value="30">30 minutes</SelectItem>
                                <SelectItem value="45">45 minutes</SelectItem>
                                <SelectItem value="60">60 minutes</SelectItem>
                                <SelectItem value="90">90 minutes</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Location */}
                    <div className="grid gap-2">
                        <Label htmlFor="location" className="text-gray-700 font-medium">
                            Location <span className="text-red-500">*</span>
                        </Label>
                        <Select>
                            <SelectTrigger id="location" className="border-[#268a6461] focus:ring-[#268a6429]">
                                <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="main-204">Main Building, Room 204</SelectItem>
                                <SelectItem value="main-205">Main Building, Room 205</SelectItem>
                                <SelectItem value="east-115">East Wing, Room 115</SelectItem>
                                <SelectItem value="outpatient-8">Outpatient Clinic, Room 8</SelectItem>
                                <SelectItem value="surgical-302">Surgical Wing, Room 302</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Status */}
                    <div className="grid gap-2">
                        <Label htmlFor="status" className="text-gray-700 font-medium">
                            Status
                        </Label>
                        <Select defaultValue="scheduled">
                            <SelectTrigger id="status" className="border-[#268a6461] focus:ring-[#268a6429]">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="scheduled">Scheduled</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Notes */}
                    <div className="grid gap-2">
                        <Label htmlFor="notes" className="text-gray-700 font-medium">
                            Notes
                        </Label>
                        <Textarea
                            id="notes"
                            placeholder="Enter appointment notes or reason for visit"
                            className="min-h-[100px] border-[#268a6461] focus-visible:ring-[#268a6429]"
                        />
                    </div>
                </div>

                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" className="border-[#268a6461] hover:bg-[#e6f2ed] hover:text-[#106041]">
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                    </Button>
                    <Button className="bg-[#106041] hover:bg-[#0d4e34]">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Schedule Appointment
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

