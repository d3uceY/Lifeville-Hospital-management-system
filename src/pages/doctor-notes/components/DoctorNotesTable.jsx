import * as React from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Edit, Eye, NotebookPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "../../../helpers/formatDate";
import { useParams } from "react-router-dom";
import { getDoctorsNotesByPatientId } from "../../../providers/ApiProviders";
import { ViewDoctorNoteDialog } from "./ViewDoctorNotesDialog";
import EditDoctorNoteDialog from "./EditDoctorNoteDialog";
import { hasPermission } from "../../../helpers/hasPermission";
import { CustomTooltip } from "../../../helpers/customTooltip";
import TableSkeleton from "../../../components/patient-profile-table-skeleton";

const columns = [
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700"
            >
                Created At
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium text-gray-700">{formatDate(row.getValue("created_at"))}</div>,
    },
    {
        accessorKey: "note",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700"
            >
                Note
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="text-gray-700">{row.getValue("note")}</div>,
    },
    {
        accessorKey: "recorded_by",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700"
            >
                Recorded By
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="capitalize">{row.getValue("recorded_by")}</div>,
    },
    {
        accessorKey: "updated_by",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700"
            >
                Updated By
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="capitalize">{row.getValue("updated_by") || "—"}</div>,
    },

    {
        accessorKey: "updated_at",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700"
            >
                Updated At
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="capitalize">{formatDate(row.getValue("updated_at")) || "—"}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const note = row.original;
            return (
                <div className="flex items-center gap-2">
                    <CustomTooltip content="View Note">
                        <ViewDoctorNoteDialog note={note}>
                            <Button variant="outline" size="sm" className="action-view-btn">
                                <Eye className="h-4 w-4" />
                            </Button>
                        </ViewDoctorNoteDialog>
                    </CustomTooltip>
                    {hasPermission(["superadmin"]) && (
                        <CustomTooltip content="Edit Note">
                            <EditDoctorNoteDialog note={note}>
                                <Button variant="outline" size="sm" className="action-edit-btn">
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </EditDoctorNoteDialog>
                        </CustomTooltip>
                    )}
                </div>
            );
        },
    },
];

export default function DoctorNotesTable() {
    const { patient_id } = useParams();

    const { data: doctorNotes, isLoading } = useQuery({
        queryKey: ["doctorNotes", patient_id],
        queryFn: () => getDoctorsNotesByPatientId(patient_id),
    });

    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data: doctorNotes?.data || [],
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
            title="Doctor Notes"
            icon={<NotebookPen className="h-5 w-5 shrink-0" />}
            showPagination
        />);

    return (
        <div>
            <Card className="shadow-sm py-0 overflow-hidden">
                <CardHeader className="pb-3 border-b bg-[#f0f8f4] pt-6 flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <NotebookPen className="h-5 w-5 shrink-0" />
                        Doctor Notes
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
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
                                            No Doctor Notes Available
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <div className="flex items-center justify-end space-x-2 py-4 px-6 border-t">
                            <div className="flex-1 text-sm text-gray-500">
                                {table.getFilteredRowModel().rows.length} note(s)
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
