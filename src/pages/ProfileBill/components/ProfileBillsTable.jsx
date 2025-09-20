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
import { getBillByPatientId } from "../../../providers/ApiProviders";
import { formatDate } from "../../../helpers/formatDate";
import { useParams } from "react-router-dom";
import { getBillStatusBadge } from "../../../helpers/getBillStatusBadge";
import { formatToNaira } from "../../../helpers/formatToNaira";
import { ProfileViewBillDialog } from "./ProfileBillViewDialog";
import { CustomTooltip } from "../../../helpers/customTooltip"
import TableSkeleton from "../../../components/patient-profile-table-skeleton";


const columns = [
  {
    accessorKey: "bill_date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
        className="font-medium text-gray-700"
      >
        Bill Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-gray-700">{formatDate(row.original.bill_date)}</div>
    ),
  },
  {
    accessorKey: "bill_number",
    header: "Bill Number",
    cell: ({ row }) => (
      <div className="text-gray-700">{row.getValue("bill_number")}</div>
    ),
  },
  {
    accessorKey: "total_amount",
    header: "Total Amount",
    cell: ({ row }) => (
      <div className="text-gray-700">{formatToNaira(row.getValue("total_amount"))}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="text-gray-700 capitalize">{getBillStatusBadge(row.getValue("status"))}</div>
    ),
  },
  {
    accessorKey: "payment_method",
    header: "Payment Method",
    cell: ({ row }) => (
      <div className="text-gray-700">{row.getValue("payment_method")}</div>
    ),
  },
  {
    accessorKey: "amount_paid",
    header: "Amount Paid",
    cell: ({ row }) => (
      <div className="text-gray-700">{formatToNaira(row.getValue("amount_paid"))}</div>
    ),
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <div className="text-gray-700">
        <CustomTooltip content="View Bill">
          <ProfileViewBillDialog bill={row.original}>
            <Button
              variant="outline"
              size="sm"
              className="action-view-btn"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </ProfileViewBillDialog>
        </CustomTooltip>
      </div>
    ),
  }
];

export default function ProfileBillsTable() {
  const { patient_id } = useParams();

  const { data: bills, isLoading } = useQuery({
    queryKey: ["bills", patient_id],
    queryFn: () => getBillByPatientId(patient_id),
    staleTime: 5 * 60 * 1000,
  });


  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: bills || [],
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

  if (isLoading) return (
    <TableSkeleton
        headerCount={columns.length}
        rowCount={5}
        title="Bills"
        icon={<ClipboardList className="h-5 w-5 shrink-0" />}
        showPagination
    />);


  return (
    <Card className="shadow-sm py-0 overflow-hidden mt-8">
      <CardHeader className="pb-3 border-b bg-[#f0f8f4] pt-6 flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 shrink-0" />
          Bills
        </CardTitle>
      </CardHeader>
      <CardContent className="md:p-6 p-2">
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
                    No Bills Recorded
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
