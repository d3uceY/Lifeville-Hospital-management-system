import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ClipboardList, ArrowUpDown, Eye, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getDiagnosesByPatientId } from "../../../providers/ApiProviders";
import { formatDate } from "../../../helpers/formatDate";
import { useParams } from "react-router-dom";
import { ViewDiagnosisDialog } from "./ViewDiagnosisDialog";
import DeleteDiagnosisDialog from "./DeleteDiagnosisDialog";
import { hasPermission } from "../../../helpers/hasPermission";
import { useAuth } from "../../../providers/AuthContext";
import EditDiagnosisDialog from "./EditDiagnosisDialog";

const columns = [
  {
    accessorKey: "diagnosis_date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
        className="font-medium text-gray-700"
      >
        Diagnosis Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-gray-700">
        {formatDate(row.original.diagnosis_date)}
      </div>
    ),
  },
  {
    accessorKey: "condition",
    header: "Condition",
    cell: ({ row }) => (
      <div className="text-gray-700">{row.getValue("condition")}</div>
    ),
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => (
      <div className="text-gray-700">{row.getValue("notes") || "—"}</div>
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
      const diagnosis = row.original;
      return (
        <div className="flex items-center gap-2">
          {/* Uncomment if you create a view dialog */}
          <ViewDiagnosisDialog diagnosis={diagnosis}>
            <Button variant="outline" size="sm" className="action-edit-btn">
              <Eye className="h-4 w-4" />
            </Button>
          </ViewDiagnosisDialog>
          {(hasPermission(["superadmin"]) || (useAuth().user?.name == row.getValue("recorded_by"))) && (
            <DeleteDiagnosisDialog deletedDiagnosisRecordInfo={diagnosis} />
          )}

          {(hasPermission(["superadmin"]) || (useAuth().user?.name == row.getValue("recorded_by"))) && (
            <EditDiagnosisDialog diagnosis={diagnosis}>
              <Button variant="outline" size="sm" className="action-edit-btn">
                <Edit className="h-4 w-4" />
              </Button>
            </EditDiagnosisDialog>
          )}
        </div>
      );
    },
  },
];

export default function DiagnosesTable() {
  const { patient_id } = useParams();

  const { data: diagnoses, isLoading } = useQuery({
    queryKey: ["diagnoses", patient_id],
    queryFn: () => getDiagnosesByPatientId(patient_id),
  });

  console.log(diagnoses)

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: diagnoses || [],
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
          Diagnoses
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
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className="pl-5" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center py-10 text-gray-500"
                  >
                    No Diagnoses Recorded
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
