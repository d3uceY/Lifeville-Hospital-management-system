import * as React from "react";
import { CreateBedGroupDialog } from "./components/createBedGroupDialog";
import { useBeds } from "../../providers/ApiContextProvider";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Search, Filter, User2, BedDouble } from "lucide-react";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditBedGroupDialog } from "./components/editBedGroupDialog";
import DeleteBedGroupDialog from "./components/deleteBedGroupDialog";
import { CustomTooltip } from "../../helpers/customTooltip";
import TableSkeleton from "../../components/table-skeleton";
import { hasPermission } from "../../helpers/hasPermission";
// import { BedSkeletonLoader } from "./components/bedSkeletonLoader";

const columns = [

  {
    accessorKey: "group_name",
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
    cell: ({ row }) => <div className="font-medium text-gray-700 capitalize">{row.getValue("group_name")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const bedGroupData = row.original;
      return (
        <div className="flex gap-2 items-center">
          <CustomTooltip content="Edit Bed Group">
            <EditBedGroupDialog bedGroup={bedGroupData} />
          </CustomTooltip>
          <CustomTooltip content="Delete Bed Group">
            {hasPermission(["superadmin"]) && (
              <DeleteBedGroupDialog deletedBedGroupRecordInfo={bedGroupData} />
            )}
          </CustomTooltip>
        </div>

      );
    },
  },
];

export default function BedGroup() {
  const { bedGroups, loadingBedGroups } = useBeds();
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: bedGroups,
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

  if (loadingBedGroups) return <TableSkeleton title="Bed Groups" icon={<BedDouble className="h-5 w-5" />} />;

  return (
    <div className="lg:p-6">
      <Card className=" shadow-sm py-0 overflow-hidden">
        <CardHeader className="pb-3 border-b  pt-6 flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BedDouble className="h-5 w-5" />
            Bed Groups
          </CardTitle>
          <CreateBedGroupDialog />
        </CardHeader>
        <CardContent className="md:p-6">
          <div className="mb-6 bg-white rounded-lg border  p-4 shadow-sm">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter Bed Groups
            </h3>
            <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500">Bed Group Name</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Filter bed group name..."
                    value={table.getColumn("group_name")?.getFilterValue() || ""}
                    onChange={(e) => table.getColumn("group_name")?.setFilterValue(e.target.value)}
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
                    className=""
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
                        className="capitalize"
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
              <TableHeader>
                {table.getHeaderGroups().map((hg) => (
                  <TableRow key={hg.id} className=" border-b ">
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
                      No Bed Group Available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 py-4 px-6 border-t ">
              <div className="flex-1 text-sm text-gray-500">
                {table.getFilteredRowModel().rows.length} bed group(s)
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
