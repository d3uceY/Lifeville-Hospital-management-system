import * as React from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Pill, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getPrescriptionsByPatientId } from "../../../providers/ApiProviders";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../helpers/formatDate";
import { ViewPrescriptionDialog } from "./ViewPrescriptionDialog";
import PrescriptionStatusDropdown from "./PrescriptionStatusDropdown";
import { getPrescriptionStatusBadge } from "../../../helpers/getPrescriptionStatusBadge";
import DeletePrescriptionDialog from "./DeletePrescriptionDialog";
import { hasPermission } from "../../../helpers/hasPermission";


const columns = [
    {
        accessorKey: "prescription_id",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700"
            >
                Prescription ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium text-gray-700">RX-{row.getValue("prescription_id")}</div>,
    },
    {
        accessorKey: "prescribed_by",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700"
            >
                Prescribed By
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium text-gray-700 capitalize">{row.getValue("prescribed_by")}</div>,
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700"
            >
                Prescribed Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium text-gray-700 capitalize">{getPrescriptionStatusBadge(row.getValue("status"))}</div>,
    },
    {
        accessorKey: "prescription_date",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700"
            >
                Prescribed At
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium text-gray-700">{formatDate(row.getValue("prescription_date"))}</div>,
    },
    {
        accessorKey: "items",
        header: () => <span className="font-medium text-gray-700">Medications</span>,
        cell: ({ row }) => (
            <ul className="list-disc pl-4 text-gray-700 text-sm">
                {row.getValue("items")?.map((item, index) => (
                    <li key={index}>
                        <strong>{item.drug_name}</strong> 
                    </li>
                ))}
            </ul>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const prescription = row.original;
            return (
                <div className="flex items-center gap-2">
                    <ViewPrescriptionDialog prescription={prescription}>
                        <Button variant="outline" size="sm" className="action-view-btn">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </ViewPrescriptionDialog>
                    {
                        hasPermission(['doctor', 'superadmin']) && (
                            <DeletePrescriptionDialog deletedPrescriptionRecordInfo={prescription} />
                        )
                    }
                    <PrescriptionStatusDropdown prescriptionId={prescription.prescription_id} />
                </div>
            );
        },
    },
];

export default function PrescriptionTable() {
    const { patient_id } = useParams();
    const { data: prescriptions, isLoading } = useQuery({
        queryKey: ["patientPrescriptions", patient_id],
        queryFn: () => getPrescriptionsByPatientId(patient_id),
    });

    console.log(prescriptions)

    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data: prescriptions || [],
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
            pagination: {
                pageSize: 5,
            },
        },
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <Card className="shadow-sm py-0 overflow-hidden">
            <CardHeader className="pb-3 border-b bg-[#f0f8f4] pt-6 flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <Pill className="h-5 w-5" />
                    Prescriptions
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
                                        No prescriptions available
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <div className="flex items-center justify-end space-x-2 py-4 px-6 border-t">
                        <div className="flex-1 text-sm text-gray-500">
                            {table.getFilteredRowModel().rows.length} prescription(s)
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
    );
}
