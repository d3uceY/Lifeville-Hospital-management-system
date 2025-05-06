
import * as React from "react"
import { CreateSymptomHeadDialog } from "./components/createSymptomHeadDialog"
//patients api context
import { useSymptomHeads } from "../../providers/ApiContextProvider"
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
import { ArrowUpDown, ChevronDown, MoreHorizontal, User2, Search, Filter, } from "lucide-react"

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
    accessorKey: "symptom_head",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-medium text-gray-700 hover:text-[#106041]"
      >
        Symptom Head
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium text-gray-700">{row.getValue("symptom_head")}</div>,
  },
  {
    accessorKey: "symptom_type",
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
    cell: ({ row }) => <div className="font-medium text-gray-700">{row.getValue("symptom_type")}</div>,
  },
  {
    accessorKey: "symptom_description",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-medium text-gray-700 hover:text-[#106041]"
      >
        Symptom description
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium text-gray-700 line-clamp-2 text-wrap">{row.getValue("symptom_description")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const symptomHeadData = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-[#e6f2ed]">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-5 w-5 text-[#106041]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 border-[#e0f0e8]">
            <DropdownMenuLabel className="text-[#106041]">Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <EditSymptomTypeDialog symptom={symptomHeadData}>
              Edit Symptom Head
            </EditSymptomTypeDialog>
            <DropdownMenuSeparator />
            <DeleteSymptomTypeDialog deletedSymptomTypeRecordInfo={symptomHeadData}>
              Delete Symptom Head
            </DeleteSymptomTypeDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function SymptomHeads() {
  const { symptomHeads, loadingSymptomHeads } = useSymptomHeads()
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: symptomHeads,
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
  if (loadingSymptomHeads)
    return (
      <SymptomTypeSkeletonLoader />
    )

  return (
    <div className="lg:p-6">
      <Card className="border-[#e0f0e8] shadow-sm py-0 overflow-hidden">
        <CardHeader className="pb-3 border-b border-[#e0f0e8] bg-[#f0f8f4] pt-6 flex items-center justify-between">
          <CardTitle className="text-[#106041] flex items-center gap-2">
            <User2 className="h-5 w-5" />
            Symptom Heads
          </CardTitle>
          <CreateSymptomHeadDialog />
        </CardHeader>
        <CardContent className="md:p-6">
          <div className="mb-6 bg-white rounded-lg border border-[#e0f0e8] p-4 shadow-sm">
            <h3 className="text-sm font-medium text-[#106041] mb-3 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </h3>
            <div className="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500">Symptom Head</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Filter symptom head..."
                    value={table.getColumn("symptom_head")?.getFilterValue() || ""}
                    onChange={(event) => table.getColumn("symptom_head")?.setFilterValue(event.target.value)}
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
            <Table className="">
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
            <div className="flex items-center justify-end space-x-2 py-4 px-6 bg-[#f9fcfa] border-t border-[#e0f0e8]">
              <div className="flex-1 text-sm text-gray-500">
                {table.getFilteredRowModel().rows.length}{" "}
                symptom head(s)
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

