
import * as React from "react"
import { CreateSymptomTypeDialog } from "./components/createSymptomTypeDialog"
//patients api context
import { useSymptomTypes } from "../../providers/ApiContextProvider"
//skeleton loader


import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

//lucide react icons
import { ArrowUpDown, ChevronDown, MoreHorizontal, User2, Search, Filter, AlertTriangle, } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EditSymptomTypeDialog } from "./components/editSymptomTypeDialog"
import DeleteSymptomTypeDialog from "./components/deleteSymptomTypeDialog"

import { SymptomTypeSkeletonLoader } from "./components/symptomTypeSkeletonLoader"

const columns = [

    {
        accessorKey: "symptom_text",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700 hover:text-[#106041]"
            >
                Symptom Type
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium text-gray-700">{row.getValue("symptom_text")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const symptomTypeData = row.original
            return (
                <div className="flex items-center gap-2">
                    <EditSymptomTypeDialog symptom={symptomTypeData} />
                    <DeleteSymptomTypeDialog deletedSymptomTypeRecordInfo={symptomTypeData} />
                </div>
            )
        },
    },
]

export default function SymptomTypes() {
    const { symptomTypes, loadingSymptomTypes } = useSymptomTypes()
    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState([])
    const [columnVisibility, setColumnVisibility] = React.useState({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data: symptomTypes,
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
    if (loadingSymptomTypes)
        return (
            <SymptomTypeSkeletonLoader />
        )

    return (
        <div className="lg:p-6">
            <Card className=" shadow-sm py-0 overflow-hidden">
                <CardHeader className="pb-3 border-b  bg-[#f0f8f4] pt-6 flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Symptom Types
                    </CardTitle>
                    <CreateSymptomTypeDialog />
                </CardHeader>
                <CardContent className="md:p-6">
                    <div className="mb-6 bg-white rounded-lg border  p-4 shadow-sm">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            Filter
                        </h3>
                        <div className="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Symptom Type</label>
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Filter symptom type..."
                                        value={table.getColumn("symptom_text")?.getFilterValue() || ""}
                                        onChange={(event) => table.getColumn("symptom_text")?.setFilterValue(event.target.value)}
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
                                        className="border-[#268a6461] hover:bg-[#e6f2ed] hover:text-[#106041]"
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
                        <Table className="">
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
                                                <TableCell key={cell.id} className="pl-5">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="text-center py-10 text-gray-500">
                                            No Available Symptom Type
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <div className="flex items-center justify-end space-x-2 py-4 px-6  border-t ">
                            <div className="flex-1 text-sm text-gray-500">
                                {table.getFilteredRowModel().rows.length}{" "}
                                symptom type(s)
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

