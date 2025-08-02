import React from "react"
import { formatDate } from "../../helpers/formatDate"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User2, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AppointmentDropdownOptions from "./components/AppointmentDropdownOptions"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getAppointmentStatusColor } from "../../helpers/getAppointmentStatusColor"

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"






import ScheduleAppointmentDialog from "./components/ScheduleAppointmentDialog"
import { useAppointmentsData } from "../../providers/ApiContextProvider"



const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="checkbox"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="checkbox"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
  // },
  {
    accessorKey: "appointment_id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-medium text-gray-700 hover:"
      >
        Appointment ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium text-gray-700">{row.getValue("appointment_id")}</div>,
  },
  {
    accessorKey: "patient_first_name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-medium text-gray-700 hover:"
      >
        First name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize font-medium">{row.original.patient_first_name}</div>,
  },

  {
    accessorKey: "patient_surname",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-medium text-gray-700 hover:"
      >
        Last name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize font-medium">{row.getValue("patient_surname")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-medium text-gray-700 hover:"
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const statusColor = getAppointmentStatusColor(row.original.status)
      return (
        <Badge className={`mt-1 ${statusColor} capitalize`}>{row.original.status}</Badge>
      )
    }
  },

  {
    accessorKey: "appointment_date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-medium text-gray-700 hover:"
      >
        Scheduled Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize font-medium">{formatDate(row.getValue("appointment_date"))}</div>,
  },
  {
    accessorKey: "patient_phone_number",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-medium text-gray-700 hover:"
      >
        Phone no.
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium text-gray-700">{row.getValue("patient_phone_number")}</div>,
  },
  {
    accessorKey: "doctor's name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-medium text-gray-700 hover:"
      >
        Doctor Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium text-gray-700">{row.original.doctor_last_name} {row.original.doctor_first_name}</div>,
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const appointmentData = row.original
      return (
        <div>
          <AppointmentDropdownOptions appointment={appointmentData} />
        </div>
      )
    },
  },
]



export default function DoctorAppointmentsUI() {
  const { appointments } = useAppointmentsData();
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: appointments,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  })


  console.log(appointments)

  return (

    <div>
      <div className="lg:p-6">
        <Card className=" shadow-sm py-0 overflow-hidden">
          <CardHeader className="pb-3 border-b flex items-center justify-between bg-[#f0f8f4] pt-6">
            <CardTitle className="flex items-center gap-2">
              <User2 className="h-5 w-5" />
              Patients
            </CardTitle>
            <ScheduleAppointmentDialog />
          </CardHeader>
          <CardContent className="md:p-6">
            <div className="mb-6 bg-white rounded-lg border  p-4 shadow-sm">
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter Patients
              </h3>
              <div className="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500">Surname</label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Filter patient surname..."
                      value={table.getColumn("patient_surname")?.getFilterValue() || ""}
                      onChange={(event) => table.getColumn("patient_surname")?.setFilterValue(event.target.value)}
                      className="pl-9 border-[#268a6461] rounded-md focus-visible:ring-[#268a6429] focus-visible:border-[#268a64]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500">First Name</label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Filter patient first name..."
                      value={table.getColumn("patient_first_name")?.getFilterValue() || ""}
                      onChange={(event) => table.getColumn("patient_first_name")?.setFilterValue(event.target.value)}
                      className="pl-9 border-[#268a6461] rounded-md focus-visible:ring-[#268a6429] focus-visible:border-[#268a64]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500">Sex</label>
                  <Select
                    onValueChange={(value) => table.getColumn("status")?.setFilterValue(value)}
                    value={table.getColumn("status")?.getFilterValue() || ""}
                  >
                    <SelectTrigger className="border-[#268a6461] rounded-md focus:ring-[#268a6429] focus:border-[#268a64]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent className="">
                      <SelectGroup>
                        <SelectLabel>Select</SelectLabel>
                        <SelectItem className="hover:bg-[#e6f2ed] hover:">
                          All
                        </SelectItem>
                        <SelectItem value="scheduled" className="hover:bg-[#e6f2ed] hover:">
                          scheduled
                        </SelectItem>
                        <SelectItem value="confirmed" className="hover:bg-[#e6f2ed] hover:">
                          confirmed
                        </SelectItem>
                        <SelectItem value="pending" className="hover:bg-[#e6f2ed] hover:">
                          pending
                        </SelectItem>
                        <SelectItem value="completed" className="hover:bg-[#e6f2ed] hover:">
                          completed
                        </SelectItem>
                        <SelectItem value="canceled" className="hover:bg-[#e6f2ed] hover:">
                          canceled
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

              </div>
              <div className="flex justify-end mt-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-[#268a6461] hover:bg-[#e6f2ed] hover:"
                    >
                      <ChevronDown className="mr-2 h-4 w-4" />
                      Columns
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize hover:bg-[#e6f2ed]"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) => column.toggleVisibility(!!value)}
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="rounded-md border  overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="bg-[#f0f8f4]">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="">
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id} className="font-medium">
                          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        className=""
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="text-center py-10 text-gray-500">
                        No patients found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <div className="flex items-center justify-end space-x-2 py-4 px-6  border-t ">
                <div className="flex-1 text-sm text-gray-500">
                  {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length}{" "}
                  patient(s) selected
                </div>
                <div className="space-x-2 flex">
                  <Button
                    className="bg-[#106041] text-white hover:bg-[#0d4e34] focus:ring-[#268a6429]"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Previous
                  </Button>
                  <Button
                    className="bg-[#106041] text-white hover:bg-[#0d4e34] focus:ring-[#268a6429]"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}

