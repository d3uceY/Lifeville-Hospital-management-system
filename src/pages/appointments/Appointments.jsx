import {
  ClipboardList,
  Search,
  Calendar
} from "lucide-react"


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ScheduleAppointmentDialog from "./components/ScheduleAppointmentDialog"
import { useAppointmentsData } from "../../providers/ApiContextProvider"
import AppointmentCard from "./components/AppointmentCard"



export default function DoctorAppointmentsUI() {
  const { appointments } = useAppointmentsData();

  const pastAppointments = appointments.filter(appointment => new Date(appointment.appointment_date) < new Date());
  const upcomingAppointments = appointments.filter(appointment => new Date(appointment.appointment_date) > new Date());

  // today's appointments
  const today = new Date();
  today.setHours(0, 0, 0, 0); // reset current date time to midnight

  const todayAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.appointment_date);
    appointmentDate.setHours(0, 0, 0, 0); // reset appointment date time to midnight
    return appointmentDate.getTime() === today.getTime();
  });

  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="border-l-4  pl-4">
            <h1 className="text-2xl font-bold ">My Appointments</h1>
            <p className="text-muted-foreground mt-1">Manage your patient appointments</p>
          </div>
          <div className="flex gap-2">
            <ScheduleAppointmentDialog />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar - Filters */}
          <div className="lg:col-span-1">
            <Card className=" shadow-sm">
              <CardHeader className="bg-[#f0f8f4] border-b  pb-3">
                <CardTitle className="text-lg flex items-center">
                  <ClipboardList className="mr-2 h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Search Patient</label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Patient name..."
                        className="pl-9 border-[#268a6461] focus-visible:ring-[#268a6429]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <Select defaultValue="all">
                      <SelectTrigger className="border-[#268a6461] focus:ring-[#268a6429]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>


                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Location</label>
                    <Select defaultValue="all">
                      <SelectTrigger className="border-[#268a6461] focus:ring-[#268a6429]">
                        <SelectValue placeholder="Filter by location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="main">Main Building</SelectItem>
                        <SelectItem value="east">East Wing</SelectItem>
                        <SelectItem value="outpatient">Outpatient Clinic</SelectItem>
                        <SelectItem value="surgical">Surgical Wing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-2">
                    <Button variant="outline" className="w-full border-[#268a6461] hover:bg-[#e6f2ed]">
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content - Appointments */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="today" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger
                  value="upcoming"
                  className="data-[state=active]:bg-[#106041] data-[state=active]:text-white"
                >
                  Upcoming
                </TabsTrigger>
                <TabsTrigger value="today" className="data-[state=active]:bg-[#106041] data-[state=active]:text-white">
                  Today
                </TabsTrigger>
                <TabsTrigger value="past" className="data-[state=active]:bg-[#106041] data-[state=active]:text-white">
                  Past
                </TabsTrigger>
              </TabsList>
              {/* Upcoming Appointments */}
              <TabsContent value="upcoming" className="mt-0">
                <div className="space-y-6">
                  {/* Tomorrow's appointments */}
                  <Card className=" shadow-sm py-0">
                    <CardHeader className="bg-[#f0f8f4] border-b  pb-3 pt-6">
                      <CardTitle className="">Coming soon</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-[#e0f0e8]">
                        {/* Appointments */}
                        {
                          upcomingAppointments.length === 0 && (
                            <NoAvailableAppointments>No upcoming appointments</NoAvailableAppointments>
                          )
                        }
                        {
                          upcomingAppointments.map((appointment) => (
                            <AppointmentCard key={appointment.appointment_id} appointment={appointment} />
                          ))
                        }
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              {/* Today's Appointments */}
              <TabsContent value="today" className="mt-0">
                <Card className=" shadow-sm mb-6 py-0">
                  <CardHeader className="bg-[#f0f8f4] border-b  pb-3 pt-6">
                    <div className="flex justify-between items-center">
                      <CardTitle className="">Today's Schedule</CardTitle>
                      <p className="text-sm text-gray-500">
                        {new Date().toLocaleString('default', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0">
                    <div className="divide-y divide-[#e0f0e8]">
                      {/* Appointments */}
                      {
                        todayAppointments.length === 0 && (
                          <NoAvailableAppointments>You have no appointments today</NoAvailableAppointments>
                        )
                      }
                      {
                        todayAppointments.map((appointment) => (
                          <AppointmentCard key={appointment.appointment_id} appointment={appointment} />
                        ))
                      }
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* Past Appointments */}
              <TabsContent value="past" className="mt-0">
                <ScrollArea className="h-[700px] pr-4">
                  <div className="space-y-4">
                    <Card className=" shadow-sm">
                      <CardContent className="p-4">
                        <div className="divide-y divide-[#e0f0e8]">
                          {/* Filter appointments to only include those in the past */}
                          {
                            pastAppointments.length === 0 && (
                              <NoAvailableAppointments>No past appointments</NoAvailableAppointments>
                            )
                          }
                          {
                            pastAppointments.map((appointment) => (
                              <AppointmentCard key={appointment.appointment_id} appointment={appointment} />
                            ))
                          }
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      {/* <Toaster richColors /> */}
    </TooltipProvider>
  )
}

function NoAvailableAppointments({ children }) {
  return (
    <Card className=" shadow-sm">
      <CardContent className="flex flex-col items-center justify-center py-10 px-4 text-center">
        <div className="bg-[#f0f8f4] p-4 rounded-full mb-4">
          <Calendar className="h-10 w-10 " />
        </div>

        <h3 className="text-xl font-semibold mb-2">{children}</h3>
      </CardContent>
    </Card>
  )
}

