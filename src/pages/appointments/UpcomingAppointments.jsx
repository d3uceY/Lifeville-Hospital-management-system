"use client"
import { format, isPast, isToday, isTomorrow, addMinutes, parseISO } from "date-fns"
import { Calendar, Clock, MapPin, User, Phone, FileText, Mail, CheckCircle, ChevronRight } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for appointments based on the provided structure
const appointments = [
  {
    id: 1,
    patientName: "John Smith",
    patientContact: "555-1234 / john@email.com",
    doctorName: "Dr. Emily Wilson",
    doctorSpecialty: "Cardiology",
    appointmentDate: "2023-10-25T10:30:00",
    appointmentNotes: "Follow-up on ECG results",
    status: "Scheduled",
    duration: 30, // minutes
    location: "Main Building, Room 204",
  },
  {
    id: 2,
    patientName: "Sarah Johnson",
    patientContact: "555-5678 / sarah@email.com",
    doctorName: "Dr. Michael Chen",
    doctorSpecialty: "Neurology",
    appointmentDate: "2023-10-26T14:15:00",
    appointmentNotes: "Initial consultation for headaches",
    status: "Confirmed",
    duration: 45, // minutes
    location: "East Wing, Room 115",
  },
  {
    id: 3,
    patientName: "Robert Davis",
    patientContact: "555-9012 / robert@email.com",
    doctorName: "Dr. Lisa Thompson",
    doctorSpecialty: "Dermatology",
    appointmentDate: "2023-10-28T09:00:00",
    appointmentNotes: "Skin examination",
    status: "Pending",
    duration: 30, // minutes
    location: "Outpatient Clinic, Room 8",
  },
  {
    id: 4,
    patientName: "Maria Garcia",
    patientContact: "555-3456 / maria@email.com",
    doctorName: "Dr. James Wilson",
    doctorSpecialty: "Orthopedics",
    appointmentDate: "2023-11-02T11:00:00",
    appointmentNotes: "Pre-surgery consultation",
    status: "Scheduled",
    duration: 60, // minutes
    location: "Surgical Wing, Room 302",
  },
  {
    id: 5,
    patientName: "David Lee",
    patientContact: "555-7890 / david@email.com",
    doctorName: "Dr. Sarah Johnson",
    doctorSpecialty: "Endocrinology",
    appointmentDate: "2023-10-20T13:30:00",
    appointmentNotes: "Diabetes check-up",
    status: "Completed",
    duration: 30, // minutes
    location: "Main Building, Room 118",
  },
]

// Helper function to get initials from name
const getInitials = (name) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

// Helper function to get status badge color
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "scheduled":
      return { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200", hover: "hover:bg-blue-200" }
    case "confirmed":
      return { bg: "bg-green-100", text: "text-green-800", border: "border-green-200", hover: "hover:bg-green-200" }
    case "pending":
      return { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200", hover: "hover:bg-yellow-200" }
    case "completed":
      return { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200", hover: "hover:bg-purple-200" }
    case "cancelled":
      return { bg: "bg-red-100", text: "text-red-800", border: "border-red-200", hover: "hover:bg-red-200" }
    default:
      return { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200", hover: "hover:bg-gray-200" }
  }
}

export default function UpcomingAppointments() {
  // Convert string dates to Date objects for comparison
  const appointmentsWithDates = appointments.map((app) => ({
    ...app,
    date: parseISO(app.appointmentDate),
  }))

  // Filter appointments by date
  const upcomingAppointments = appointmentsWithDates.filter((app) => !isPast(app.date) || isToday(app.date))
  const pastAppointments = appointmentsWithDates.filter((app) => isPast(app.date) && !isToday(app.date))

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-8 border-l-4 border-[#106041] pl-4">
        <h1 className="text-2xl font-bold text-[#106041]">Appointments</h1>
        <p className="text-muted-foreground mt-1">View and manage patient appointments</p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-[#106041] data-[state=active]:text-white">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="past" className="data-[state=active]:bg-[#106041] data-[state=active]:text-white">
            Past
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-0">
          {upcomingAppointments.length === 0 ? (
            <Card className="border-[#e0f0e8] shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Calendar className="h-12 w-12 text-[#268A64] mb-4 opacity-70" />
                <p className="text-lg font-medium text-gray-700">No upcoming appointments</p>
                <p className="text-muted-foreground mt-1">Schedule a new appointment to see it here</p>
                <Button className="mt-6 bg-[#106041] hover:bg-[#0d4e34]">Schedule Appointment</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {upcomingAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} isPast={false} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-0">
          {pastAppointments.length === 0 ? (
            <Card className="border-[#e0f0e8] shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-10">
                <FileText className="h-12 w-12 text-[#268A64] mb-4 opacity-70" />
                <p className="text-lg font-medium text-gray-700">No past appointments</p>
                <p className="text-muted-foreground mt-1">Appointment history will appear here</p>
              </CardContent>
            </Card>
          ) : (
            <ScrollArea className="h-[600px] pr-4">
              <div className="grid gap-4">
                {pastAppointments.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} isPast={true} />
                ))}
              </div>
            </ScrollArea>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AppointmentCard({ appointment, isPast }) {
  const { date } = appointment
  const endTime = addMinutes(date, appointment.duration)

  // Format date for display
  const getDateDisplay = (date) => {
    if (isToday(date)) return "Today"
    if (isTomorrow(date)) return "Tomorrow"
    return format(date, "EEEE, MMMM d, yyyy")
  }

  // Split patient contact into phone and email
  const [phone, email] = appointment.patientContact.split(" / ")

  // Get status colors
  const statusColors = getStatusColor(appointment.status)

  return (
    <Card className="border-[#e0f0e8] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className={`w-1 absolute top-0 bottom-0 left-0 ${isPast ? "bg-gray-300" : "bg-[#106041]"}`}></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-[#e0f0e8]">
              <AvatarImage
                src={`/placeholder.svg?height=80&width=80&text=${getInitials(appointment.doctorName)}`}
                alt={appointment.doctorName}
              />
              <AvatarFallback className="bg-[#f0f8f4] text-[#106041]">
                {getInitials(appointment.doctorName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg font-bold text-gray-800">{appointment.doctorName}</CardTitle>
              <CardDescription className="text-[#268A64]">{appointment.doctorSpecialty}</CardDescription>
            </div>
          </div>
          <Badge className={`${statusColors.bg} ${statusColors.text} ${statusColors.border} ${statusColors.hover}`}>
            {appointment.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid gap-3 mt-2">
          <div className="flex items-center gap-2 text-gray-700">
            <User className="h-4 w-4 text-[#268A64]" />
            <span className="font-medium">{appointment.patientName}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-700">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#268A64]" />
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#268A64]" />
              <span>{email}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="h-4 w-4 text-[#268A64]" />
            <span>{getDateDisplay(date)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="h-4 w-4 text-[#268A64]" />
            <span>
              {format(date, "h:mm a")} - {format(endTime, "h:mm a")} ({appointment.duration} min)
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="h-4 w-4 text-[#268A64]" />
            <span>{appointment.location}</span>
          </div>
          {appointment.appointmentNotes && (
            <div className="mt-2 text-sm text-gray-600 bg-[#f0f8f4] p-3 rounded-md">
              <p className="font-medium mb-1">Notes:</p>
              <p>{appointment.appointmentNotes}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between border-t border-[#e0f0e8] mt-2 bg-[#f9fcfa]">
        <TooltipProvider>
          {isPast ? (
            <>
              <Button variant="outline" className="text-[#106041] border-[#268a6461] hover:bg-[#e6f2ed]">
                <FileText className="mr-2 h-4 w-4" />
                View Summary
              </Button>
              <Button variant="ghost" className="text-[#106041] hover:bg-[#e6f2ed]">
                Schedule Follow-up
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-[#106041] border-[#268a6461] hover:bg-[#e6f2ed]"
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Call Patient</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-[#106041] border-[#268a6461] hover:bg-[#e6f2ed]"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Email Patient</p>
                  </TooltipContent>
                </Tooltip>
                <Button variant="outline" className="text-[#106041] border-[#268a6461] hover:bg-[#e6f2ed]">
                  <FileText className="mr-2 h-4 w-4" />
                  Patient Records
                </Button>
              </div>
              {appointment.status.toLowerCase() === "scheduled" || appointment.status.toLowerCase() === "pending" ? (
                <Button className="bg-[#106041] hover:bg-[#0d4e34]">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Confirm Appointment
                </Button>
              ) : (
                <Button variant="ghost" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                  Cancel Appointment
                </Button>
              )}
            </>
          )}
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}

