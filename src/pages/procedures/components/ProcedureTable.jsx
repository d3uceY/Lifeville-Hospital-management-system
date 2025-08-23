import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ClipboardList, ArrowUpDown, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getProceduresByPatientId } from "../../../providers/ApiProviders";
import { formatDate } from "../../../helpers/formatDate";
import { useParams } from "react-router-dom";
import { ViewProcedureDialog } from "./ViewProcedureDialog";
import { CustomTooltip } from "../../../helpers/customTooltip";

const columns = [
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-medium text-gray-700"
      >
        Recorded At
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-gray-700">{formatDate(row.original.created_at)}</div>
    ),
  },
  {
    accessorKey: "procedure_name",
    header: "Procedure",
    cell: ({ row }) => (
      <div className="text-gray-700">{row.getValue("procedure_name")}</div>
    ),
  },
  {
    accessorKey: "comments",
    header: "Comments",
    cell: ({ row }) => (
      <div className="text-gray-700">{row.getValue("comments")}</div>
    ),
  },
  {
    accessorKey: "performed_at",
    header: "Performed At",
    cell: ({ row }) => (
      <div className="text-gray-700">{formatDate(row.getValue("performed_at"))}</div>
    ),
  },
  {
    accessorKey: "recorded_by",
    header: "Recorded By",
    cell: ({ row }) => (
      <div className="text-gray-700">{row.getValue("recorded_by")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const procedure = row.original;
      return (
        <div className="flex items-center gap-2">
          <CustomTooltip content="View Procedure">
            <ViewProcedureDialog procedure={procedure}>
              <Button
                variant="outline"
                size="sm"
                className="action-view-btn"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </ViewProcedureDialog>
          </CustomTooltip>
        </div>
      );
    },
  },
];

export default function ProceduresTable() {
  const { patient_id } = useParams();

  const { data: procedures = [], isLoading } = useQuery({
    queryKey: ["procedures", patient_id],
    queryFn: () => getProceduresByPatientId(patient_id),
  });

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: procedures,
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
    initialState: {
      pagination: { pageSize: 5 },
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Card className="shadow-sm py-0 overflow-hidden mt-8">
      <CardHeader className="pb-3 border-b bg-[#f0f8f4] pt-6 flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          Procedures
        </CardTitle>
      </CardHeader>
      <CardContent className="md:p-6">
        <div className="rounded-md border overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-[#f0f8f4]">
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((header) => (
                    <TableHead key={header.id} className="font-medium">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className="pl-5" key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-10 text-gray-500">
                    No Procedures Recorded
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex items-center justify-end space-x-2 py-4 px-6 border-t">
            <div className="flex-1 text-sm text-gray-500">
              {table.getFilteredRowModel().rows.length} record(s)
            </div>
            <div className="space-x-2 flex">
              <Button
                size="sm"
                className="bg-[#106041] text-white"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                size="sm"
                className="bg-[#106041] text-white"
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
  );
}
