import React, { use } from "react"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { formatDate } from "../../helpers/formatDate"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Filter, Loader, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AppointmentDropdownOptions from "./components/AppointmentDropdownOptions"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getAppointmentStatusColor } from "../../helpers/getAppointmentStatusColor"
import { getAppointments } from "../../providers/ApiProviders"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDebounce } from "../../hooks/use-debounce"
import TableSkeleton from "../../components/table-skeleton"


export default function DoctorAppointmentsUI() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [term, setTerm] = useState("")
  const debouncedSearchTerm = useDebounce(term, 1000)

  const { data, isLoading, error } = useQuery({
    queryKey: ["appointments", page, pageSize, debouncedSearchTerm],
    queryFn: () => getAppointments(page, pageSize, debouncedSearchTerm),
  })

  const handleSearchTermChange = async (value) => {
    setTerm(value)
  }

  if (isLoading) return <TableSkeleton title="Appointments" icon={<CalendarDays className="h-5 w-5" />} />

  if (error) return <div className="flex justify-center items-center h-64 text-red-500">Error: {error.message}</div>

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const handleNextPage = () => {
    if (page < data?.totalPages) {
      setPage(page + 1)
    }
  }

  // Filter the data based on current filters

  return (
    <div>
      <div className="lg:p-6">
        <Card className="shadow-sm py-0 overflow-hidden">
          <CardHeader className="pb-3 border-b flex items-center justify-between bg-[#f0f8f4] pt-6">
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Appointments
            </CardTitle>
          </CardHeader>
          <CardContent className="md:p-6">
            <div className="mb-6 bg-white rounded-lg border p-4 shadow-sm">
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter Appointments
              </h3>
              <div className="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500">Appointment</label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search appointment"
                      value={term}
                      onChange={(event) => handleSearchTermChange(event.target.value)}
                      className="pl-9 border-[#268a6461] rounded-md focus-visible:ring-[#268a6429] focus-visible:border-[#268a64]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md border overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="bg-[#f0f8f4]">
                  <TableRow>
                    <TableHead className="font-medium">Appointment ID</TableHead>
                    <TableHead className="font-medium">First Name</TableHead>
                    <TableHead className="font-medium">Surname</TableHead>
                    <TableHead className="font-medium">Status</TableHead>
                    <TableHead className="font-medium">Scheduled Date</TableHead>
                    <TableHead className="font-medium">Phone No.</TableHead>
                    <TableHead className="font-medium">Doctor Name</TableHead>
                    <TableHead className="font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data?.data?.length ? (
                    data?.data.map((appointment) => (
                      <TableRow key={appointment.appointment_id}>
                        <TableCell className="font-medium text-gray-700">
                          APD-{appointment.appointment_id}
                        </TableCell>
                        <TableCell className="capitalize font-medium">
                          {appointment.patient_first_name}
                        </TableCell>
                        <TableCell className="capitalize font-medium">
                          {appointment.patient_surname}
                        </TableCell>
                        <TableCell>
                          <Badge className={`mt-1 ${getAppointmentStatusColor(appointment.status)} capitalize`}>
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="capitalize font-medium">
                          {formatDate(appointment.appointment_date)}
                        </TableCell>
                        <TableCell className="font-medium text-gray-700">
                          {appointment.patient_phone_number}
                        </TableCell>
                        <TableCell className="font-medium text-gray-700">
                          {appointment.doctor_name}
                        </TableCell>
                        <TableCell>
                          <AppointmentDropdownOptions appointment={appointment} />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-10 text-gray-500">
                        {isLoading ? <Loader className="w-8 h-8 animate-spin mx-auto"/> : "No appointments found"}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between space-x-2 py-4 px-6 border-t">
                <div className="flex-1 text-sm text-gray-500">
                  Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, data?.totalItems || 0)} of {data?.totalItems || 0}{" "}
                  appointment(s)
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-gray-500">
                    Page {page} of {data?.totalPages || 1}
                  </div>
                  <div className="space-x-2 flex">
                    <Button
                      className="bg-[#106041] text-white hover:bg-[#0d4e34] focus:ring-[#268a6429]"
                      size="sm"
                      onClick={handlePreviousPage}
                      disabled={page <= 1 || isLoading}
                    >
                      Previous
                    </Button>
                    <Button
                      className="bg-[#106041] text-white hover:bg-[#0d4e34] focus:ring-[#268a6429]"
                      size="sm"
                      onClick={handleNextPage}
                      disabled={page >= (data?.totalPages || 1) || isLoading}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}