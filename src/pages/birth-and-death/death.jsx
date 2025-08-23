
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
import { CustomTooltip } from "../../helpers/customTooltip"
import { hasPermission } from "../../helpers/hasPermission"

const columns = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700 hover:"
            >
                Reference Id
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium text-gray-700 ml-3">DREF-{row.getValue("id")}</div>,
    },
    {
        accessorKey: "hospital_number",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700 hover:"
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
                className="font-medium text-gray-700 hover:"
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
                className="font-medium text-gray-700 hover:"
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
                className="font-medium text-gray-700 hover:"
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
                className="font-medium text-gray-700 hover:"
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
                className="font-medium text-gray-700 hover:"
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
                className="font-medium text-gray-700 hover:"
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
                    {
                        hasPermission(['superadmin']) && (
                            <CustomTooltip content="Edit Death Record">
                                <EditDeathDialog deathRecord={currentpatientData} />
                            </CustomTooltip>
                        )
                    }
                    <CustomTooltip content="View Death Record">
                        <ViewDeathRecordDialog deathRecord={currentpatientData} />
                    </CustomTooltip>

                    {
                        hasPermission(['superadmin']) && (
                            <CustomTooltip content="Delete Death Record">
                                <DeleteDeathRecordDialog deletedDeathRecordInfo={currentpatientData} />
                            </CustomTooltip>
                        )
                    }
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
            <Card className=" shadow-sm py-0 overflow-hidden">
                <CardHeader className="pb-3 border-b  bg-[#f0f8f4] pt-6 flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <User2 className="h-5 w-5" />
                        Death Records
                    </CardTitle>
                    <DeathRecordDialog />
                </CardHeader>
                <CardContent className="md:p-6">
                    <div className="mb-6 bg-white rounded-lg border  p-4 shadow-sm">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
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
                                    <SelectContent className="">
                                        <SelectGroup>
                                            <SelectLabel>Select</SelectLabel>
                                            <SelectItem className="hover:bg-[#e6f2ed] hover:">
                                                All
                                            </SelectItem>
                                            <SelectItem value="Male" className="hover:bg-[#e6f2ed] hover:">
                                                Male
                                            </SelectItem>
                                            <SelectItem value="Female" className="hover:bg-[#e6f2ed] hover:">
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
                        <Table className="block max-w-[600px]">
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
                                            No Available Death record
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
    )
}

