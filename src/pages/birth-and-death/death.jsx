
import * as React from "react"
import { DeathRecordDialog } from "./components/deathRecordDialog"
//patients api context
import { usePatientData, useBirthAndDeaths } from "../../providers/ApiContextProvider"
//skeleton loader
import { formatDate } from "../../helpers/formatDate"


import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

//lucide react icons
import { ArrowUpDown, ChevronDown, MoreHorizontal, User2, Search, Filter, FilePenLine, History, Eye } from "lucide-react"

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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DeathSkeleton from "./components/deathSkeleton"
import DeleteDeathRecordDialog from "./components/deleteDeathRecordDialog"
import ViewDeathRecordDialog from "./components/viewDeathRecord"
import EditDeathDialog from "./components/editDeathDialog"

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
        accessorKey: "id",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700 hover:text-[#106041]"
            >
                Reference Id
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium text-gray-700">DREF-{row.getValue("id")}</div>,
    },
    {
        accessorKey: "hospital_number",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700 hover:text-[#106041]"
            >
                Hospital Number
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium text-gray-700">HS-{row.getValue("hospital_number")}</div>,
    },
    {
        accessorKey: "patient_surname",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700 hover:text-[#106041]"
            >
                Surname
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="capitalize font-medium">{row.getValue("patient_surname")}</div>,
    },
    {
        accessorKey: "patient_first_name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700 hover:text-[#106041]"
            >
                First name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="capitalize font-medium">{row.getValue("patient_first_name")}</div>,
    },
    ,
    {
        accessorKey: "guardian",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700 hover:text-[#106041]"
            >
                Guardian
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="capitalize font-medium">{row.getValue("guardian")}</div>,
    },
    {
        accessorKey: "sex",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700 hover:text-[#106041]"
            >
                Sex
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const sex = row.getValue("sex")
            return (
                <Badge
                    variant="outline"
                    className={`capitalize font-medium ${sex.toLowerCase() === "male" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-pink-50 text-pink-700 border-pink-200"}`}
                >
                    {sex}
                </Badge>
            )
        },

        // Custom filter function that uses strict equality
        filterFn: (row, columnId, filterValue) => {
            if (!filterValue) return true // If no filter is set, show all rows
            return row.getValue(columnId) === filterValue
        },
    },
    {
        accessorKey: "death_date",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700 hover:text-[#106041]"
            >
                Date & Time of Death
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium text-gray-700">{formatDate(row?.getValue("death_date"))}</div>,
    },
    {
        accessorKey: "report",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700 hover:text-[#106041]"
            >
                Report
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium text-gray-700 truncate">{row.getValue("report")}</div>,
    },

    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const currentpatientData = row.original
            return (
                <div className="flex items-center gap-2">
                    <EditDeathDialog deathRecord={currentpatientData} />
                    <ViewDeathRecordDialog deathRecord={currentpatientData} />
                    <DeleteDeathRecordDialog deletedDeathRecordInfo={currentpatientData} />
                </div>
            )
        },
    },
]

export default function Deaths() {
    const { patientData, loading } = usePatientData()
    const { deaths, loadingDeaths } = useBirthAndDeaths()
    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState([])
    const [columnVisibility, setColumnVisibility] = React.useState({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data: deaths,
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

    //looader
    if (loading || loadingDeaths)
        return (
            <DeathSkeleton />
        )

    return (
        <div className="lg:p-6">
            <Card className="border-[#e0f0e8] shadow-sm py-0 overflow-hidden">
                <CardHeader className="pb-3 border-b border-[#e0f0e8] bg-[#f0f8f4] pt-6 flex items-center justify-between">
                    <CardTitle className="text-[#106041] flex items-center gap-2">
                        <User2 className="h-5 w-5" />
                        Death Records
                    </CardTitle>
                    <DeathRecordDialog />
                </CardHeader>
                <CardContent className="md:p-6">
                    <div className="mb-6 bg-white rounded-lg border border-[#e0f0e8] p-4 shadow-sm">
                        <h3 className="text-sm font-medium text-[#106041] mb-3 flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            Filter Records
                        </h3>
                        <div className="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Surname</label>
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Filter surname..."
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
                                        placeholder="Filter first name..."
                                        value={table.getColumn("patient_first_name")?.getFilterValue() || ""}
                                        onChange={(event) => table.getColumn("patient_first_name")?.setFilterValue(event.target.value)}
                                        className="pl-9 border-[#268a6461] rounded-md focus-visible:ring-[#268a6429] focus-visible:border-[#268a64]"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Sex</label>
                                <Select
                                    onValueChange={(value) => table.getColumn("sex")?.setFilterValue(value)}
                                    value={table.getColumn("sex")?.getFilterValue() || ""}
                                >
                                    <SelectTrigger className="border-[#268a6461] rounded-md focus:ring-[#268a6429] focus:border-[#268a64]">
                                        <SelectValue placeholder="Filter by sex" />
                                    </SelectTrigger>
                                    <SelectContent className="border-[#e0f0e8]">
                                        <SelectGroup>
                                            <SelectLabel>Select</SelectLabel>
                                            <SelectItem className="hover:bg-[#e6f2ed] hover:text-[#106041]">
                                                All
                                            </SelectItem>
                                            <SelectItem value="Male" className="hover:bg-[#e6f2ed] hover:text-[#106041]">
                                                Male
                                            </SelectItem>
                                            <SelectItem value="Female" className="hover:bg-[#e6f2ed] hover:text-[#106041]">
                                                Female
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Hospital Number</label>
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Filter hospital no..."
                                        value={table.getColumn("hospital_number")?.getFilterValue() || ""}
                                        onChange={(event) => table.getColumn("hospital_number")?.setFilterValue(event.target.value)}
                                        className="pl-9 border-[#268a6461] rounded-md focus-visible:ring-[#268a6429] focus-visible:border-[#268a64]"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="border-[#268a6461] text-[#106041] hover:bg-[#e6f2ed] hover:text-[#106041]"
                                    >
                                        <ChevronDown className="mr-2 h-4 w-4" />
                                        Columns
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="border-[#e0f0e8]">
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

                    <div className="rounded-md border border-[#e0f0e8] overflow-hidden shadow-sm">
                        <Table className="block max-w-[600px]">
                            <TableHeader className="bg-[#f0f8f4]">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id} className="hover:bg-[#e6f2ed] border-b border-[#e0f0e8]">
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id} className="text-[#106041] font-medium">
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
                                            className="hover:bg-[#e6f2ed] border-b border-[#e0f0e8]"
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
                                            No Available Death record
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <div className="flex items-center justify-end space-x-2 py-4 px-6 bg-[#f9fcfa] border-t border-[#e0f0e8]">
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
    )
}

