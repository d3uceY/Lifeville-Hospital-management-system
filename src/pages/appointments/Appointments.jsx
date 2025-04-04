import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  FileText,
  Plus,
  ClipboardList,
  PenSquare,
  Search,
  MoreVertical,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ScheduleAppointmentDialog from "./components/ScheduleAppointmentDialog"
import { Toaster } from "sonner"
import { useAppointmentsData } from "../../providers/ApiContextProvider"
import AppointmentCard from "./components/AppointmentCard"



export default function DoctorAppointmentsUI() {
  const { appointments } = useAppointmentsData();
  console.log("appointments", appointments)
  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="border-l-4 border-[#106041] pl-4">
            <h1 className="text-2xl font-bold text-[#106041]">My Appointments</h1>
            <p className="text-muted-foreground mt-1">Manage your patient appointments</p>
          </div>
          <div className="flex gap-2">
            <ScheduleAppointmentDialog />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar - Filters */}
          <div className="lg:col-span-1">
            <Card className="border-[#e0f0e8] shadow-sm">
              <CardHeader className="bg-[#f0f8f4] border-b border-[#e0f0e8] pb-3">
                <CardTitle className="text-[#106041] text-lg flex items-center">
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
                    <label className="text-sm font-medium text-gray-700">Date Range</label>
                    <Select defaultValue="upcoming">
                      <SelectTrigger className="border-[#268a6461] focus:ring-[#268a6429]">
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="tomorrow">Tomorrow</SelectItem>
                        <SelectItem value="thisWeek">This Week</SelectItem>
                        <SelectItem value="nextWeek">Next Week</SelectItem>
                        <SelectItem value="thisMonth">This Month</SelectItem>
                        <SelectItem value="upcoming">All Upcoming</SelectItem>
                        <SelectItem value="past">Past Appointments</SelectItem>
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
                    <Button variant="outline" className="w-full border-[#268a6461] text-[#106041] hover:bg-[#e6f2ed]">
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
                <TabsTrigger value="today" className="data-[state=active]:bg-[#106041] data-[state=active]:text-white">
                  Today
                </TabsTrigger>
                <TabsTrigger
                  value="upcoming"
                  className="data-[state=active]:bg-[#106041] data-[state=active]:text-white"
                >
                  Upcoming
                </TabsTrigger>
                <TabsTrigger value="past" className="data-[state=active]:bg-[#106041] data-[state=active]:text-white">
                  Past
                </TabsTrigger>
              </TabsList>

              {/* Today's Appointments */}
              <TabsContent value="today" className="mt-0">
                <Card className="border-[#e0f0e8] shadow-sm mb-6">
                  <CardHeader className="bg-[#f0f8f4] border-b border-[#e0f0e8] pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-[#106041]">Today's Schedule</CardTitle>
                      <p className="text-sm text-gray-500">Wednesday, October 25, 2023</p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-[#e0f0e8]">
                      {/* Appointments */}
                      {
                        appointments.map((appointment) => (
                          <AppointmentCard key={appointment.appointment_id} appointment={appointment} />
                        ))
                      }
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Upcoming Appointments */}
              <TabsContent value="upcoming" className="mt-0">
                <div className="space-y-6">
                  {/* Tomorrow's appointments */}
                  <Card className="border-[#e0f0e8] shadow-sm">
                    <CardHeader className="bg-[#f0f8f4] border-b border-[#e0f0e8] pb-3">
                      <CardTitle className="text-[#106041]">Tomorrow</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-[#e0f0e8]">
                        <div className="p-4 hover:bg-[#f9fcfa] transition-colors">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-1 h-12 rounded-full bg-blue-100"></div>
                              <div className="text-center">
                                <p className="text-lg font-bold text-[#106041]">9:00</p>
                                <p className="text-xs text-gray-500">AM</p>
                              </div>
                              <div className="ml-2">
                                <p className="font-medium">Maria Garcia</p>
                                <Badge className="mt-1 bg-blue-100 text-blue-800 border-blue-200">Scheduled</Badge>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-gray-500 hover:text-[#106041] hover:bg-[#e6f2ed]"
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
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-gray-500 hover:text-[#106041] hover:bg-[#e6f2ed]"
                                  >
                                    <PenSquare className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Edit Appointment</p>
                                </TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-gray-500 hover:text-[#106041] hover:bg-[#e6f2ed]"
                                  >
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>More Options</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </div>
                          <div className="ml-7 pl-3 border-l-2 border-[#e0f0e8]">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="flex items-center gap-2 text-gray-700">
                                <Clock className="h-3 w-3 text-[#268A64]" />
                                <span>60 minutes</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-700">
                                <MapPin className="h-3 w-3 text-[#268A64]" />
                                <span>Main Building, Room 204</span>
                              </div>
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                              <p className="line-clamp-1">Pre-surgery consultation</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Past Appointments */}
              <TabsContent value="past" className="mt-0">
                <ScrollArea className="h-[700px] pr-4">
                  <div className="space-y-4">
                    <Card className="border-[#e0f0e8] shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border border-[#e0f0e8]">
                              <AvatarFallback className="bg-[#f0f8f4] text-[#106041]">DL</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">David Lee</p>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="h-3 w-3" />
                                <span>Oct 20, 2023</span>
                                <span>•</span>
                                <Clock className="h-3 w-3" />
                                <span>1:30 PM</span>
                              </div>
                            </div>
                          </div>
                          <Badge className="bg-purple-100 text-purple-800 border-purple-200">Completed</Badge>
                        </div>

                        <div className="mt-3 text-sm text-gray-600 bg-[#f9fcfa] p-3 rounded-md border border-[#e0f0e8]">
                          <p>Post-procedure follow-up</p>
                        </div>

                        <div className="flex justify-end mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-[#106041] border-[#268a6461] hover:bg-[#e6f2ed]"
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
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
      <Toaster richColors />
    </TooltipProvider>
  )
}

