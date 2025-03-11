"use client"

import * as React from "react"
import { useEffect } from "react"
//api function to get patients
import { getRegisteredPatients } from "../providers/ApiProviders"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
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
    accessorKey: "hospital_number",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Hospital number
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("hospital_number")}</div>,
  },
  {
    accessorKey: "surname",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Surname
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("surname")}</div>,
  },
  {
    accessorKey: "first_name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        First name
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("first_name")}</div>,
  },
  {
    accessorKey: "sex",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Sex
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("sex")}</div>,
  },
  {
    accessorKey: "date_of_birth",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Age
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      // Retrieve the date_of_birth value (e.g., "1990-05-14T23:00:00.000Z") because that is how the date is returned from the db
      const dob = new Date(row.getValue("date_of_birth"));

      // Calculate the difference in milliseconds between now and the date of birth.
      // Date.now() returns the current time in milliseconds.
      const diffMs = Date.now() - dob.getTime();

      // Create a new Date object from the time difference.
      // The Date object is based on Unix time, which starts at January 1, 1970.
      // This means that when we create a Date from diffMs, its year represents (1970 + number of years passed).
      const ageDate = new Date(diffMs); // miliseconds from epoch

      // Get the year portion from the ageDate.
      // Since the Date object counts years starting at 1970, subtracting 1970 gives the number of years elapsed,
      // which is the person's age.
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      return <div>{age}</div>;
    },
  },
  {
    accessorKey: "phone_number",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        phone number
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("phone_number")}</div>,
  },
  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"))
  //     const formatted = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
  //     return <div className="text-right font-medium">{formatted}</div>
  //   },
  // },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const hospitalNumber = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(hospitalNumber.hospital_number)}>
              Copy Hospital Number
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Patient Details</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function Patients() {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [patients, setPatients] = React.useState([])
  const [tableLoading, setTableLoading] = React.useState(true)

  const table = useReactTable({
    data: patients,
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

  //runs api on every render to get patients data
  useEffect(() => {
    const getPatients = async () => {
      try {
        setTableLoading(true)
        const response = await getRegisteredPatients();
        setPatients(response)
        console.log(response)
      } catch (err) {
        console.error(response, err)
      } finally {
        setTableLoading(false)
      }
    }
    getPatients()
  }, [])


  if (tableLoading) return (
    <div className="p-4">
      {/* The outer container uses animate-pulse to create the loading shimmer effect */}
      <div className="animate-pulse">
        {/* Optional heading placeholder */}
        <div className="mb-4 h-6 w-1/3 bg-gray-300 rounded"></div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {/* Render four header placeholders */}
                {["", "", "", ""].map((_, idx) => (
                  <th key={idx} className="px-6 py-3 bg-gray-50">
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Render five rows of cells as placeholders */}
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: 4 }).map((_, cellIndex) => (
                    <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-3">
        <Input
          placeholder="Filter surname..."
          value={table.getColumn("surname")?.getFilterValue() || ""}
          onChange={(event) => table.getColumn("surname")?.setFilterValue(event.target.value)}
          className="max-w-sm border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
        />
        <Input
          placeholder="Filter first_name..."
          value={table.getColumn("first_name")?.getFilterValue() || ""}
          onChange={(event) => table.getColumn("first_name")?.setFilterValue(event.target.value)}
          className="max-w-sm border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
        />
        <Select
          onValueChange={(value) => table.getColumn("sex")?.setFilterValue(value)}
          value={table.getColumn("sex")?.getFilterValue() || ""}
        >
          <SelectTrigger className="w-full border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]">
            <SelectValue placeholder="filter by sex" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select</SelectLabel>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          placeholder="Filter phone number.."
          value={table.getColumn("phone_number")?.getFilterValue() || ""}
          onChange={(event) => table.getColumn("phone_number")?.setFilterValue(event.target.value)}
          className="max-w-sm "
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns().filter(column => column.getCanHide()).map(column => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
