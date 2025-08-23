import * as React from "react";
import { CreateBedDialog } from "./components/createBedDialog";
import { useBeds } from "../../providers/ApiContextProvider";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Search, Filter, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditBedDialog } from "./components/editBedDialog";
import DeleteBedDialog from "./components/deleteBedDialog";
import { CustomTooltip } from "../../helpers/customTooltip";
// import { BedSkeletonLoader } from "./components/bedSkeletonLoader";

const columns = [
  {
    accessorKey: "bed_name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-medium text-gray-700 hover:"
      >
        Bed Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium text-gray-700">{row.getValue("bed_name")}</div>,
  },
  {
    accessorKey: "bed_group",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-medium text-gray-700 hover:"
      >
        Bed Group
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium text-gray-700 capitalize">{row.getValue("bed_group")}</div>,
  },
  {
    accessorKey: "bed_type",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-medium text-gray-700 hover:"
      >
        Bed Type
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium text-gray-700 capitalize">{row.getValue("bed_type")}</div>,
  },
  {
    accessorKey: "used",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-medium text-gray-700 hover:"
      >
        In Use
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium text-gray-700">
        <Badge
          variant="outline"
          className={`capitalize font-medium ${row.getValue("used") ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}
        >
          {row.getValue("used") ? "Available" : "Alloted"}
        </Badge>
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const bedData = row.original;
      return (
        <div className="flex items-center gap-2">
          <CustomTooltip content="Edit Bed">
            <EditBedDialog bed={bedData}></EditBedDialog>
          </CustomTooltip>
          <CustomTooltip content="Delete Bed">
            <DeleteBedDialog deletedBedRecordInfo={bedData}></DeleteBedDialog>
          </CustomTooltip>
        </div>
      );
    },
  },
];

export default function Beds() {
  const { beds, loadingBeds } = useBeds();
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: beds,
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
  });

  if (loadingBeds) return <div>Loading...</div>;

  return (
    <div className="lg:p-6">
      <Card className=" shadow-sm py-0 overflow-hidden">
        <CardHeader className="pb-3 border-b  bg-[#f0f8f4] pt-6 flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User2 className="h-5 w-5" />
            Beds
          </CardTitle>
          <CreateBedDialog />
        </CardHeader>
        <CardContent className="md:p-6">
          <div className="mb-6 bg-white rounded-lg border  p-4 shadow-sm">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter Beds
            </h3>
            <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500">Bed Name</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Filter bed name..."
                    value={table.getColumn("bed_name")?.getFilterValue() || ""}
                    onChange={(e) => table.getColumn("bed_name")?.setFilterValue(e.target.value)}
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
                        onCheckedChange={(val) => column.toggleVisibility(!!val)}
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
                {table.getHeaderGroups().map((hg) => (
                  <TableRow key={hg.id} className="">
                    {hg.headers.map((header) => (
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
                    <TableRow key={row.id} className="" data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell className="pl-5" key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center py-10 text-gray-500">
                      No Beds Available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 py-4 px-6  border-t ">
              <div className="flex-1 text-sm text-gray-500">
                {table.getFilteredRowModel().rows.length} bed(s)
              </div>
              <div className="space-x-2 flex">
                <Button size="sm" className="bg-[#106041] text-white" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                  Previous
                </Button>
                <Button size="sm" className="bg-[#106041] text-white" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
