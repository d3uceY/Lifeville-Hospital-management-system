import * as React from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Eye, Filter, TestTube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getLabTestStatusBadge } from "../../../helpers/getLabTestStatusBadge";
import { getInpatientByPatientId } from "../../../providers/ApiProviders";
import { formatDate } from "../../../helpers/formatDate";
import { useParams } from "react-router-dom";
// import { LabTestResultDialog } from "./LabTestResultDialog";




const columns = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700"
            >
                Admission ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium text-gray-700">ADM-{row.getValue("id")}</div>,
    },
    {
        accessorKey: "hospital_number",
        header: "Hospital No.",
        cell: ({ row }) => <div>{row.getValue("hospital_number")}</div>,
    },
    {
        accessorFn: (row) =>
            `${row.surname} ${row.first_name} ${row.other_names || ""}`.trim(),
        id: "patient_name",
        header: "Patient Name",
        cell: ({ row }) => <div className="capitalize">{row.getValue("patient_name")}</div>,
    },
    {
        accessorKey: "sex",
        header: "Sex",
        cell: ({ row }) => <div className="capitalize">{row.getValue("sex")}</div>,
    },
    {
        accessorKey: "date_of_birth",
        header: "Date of Birth",
        cell: ({ row }) => <div>{formatDate(row.getValue("date_of_birth"))}</div>,
    },
    {
        accessorKey: "admission_date",
        header: "Admission Date",
        cell: ({ row }) => <div>{formatDate(row.getValue("admission_date"))}</div>,
    },
    {
        accessorKey: "consultant_doctor_name",
        header: "Consultant Doctor",
        cell: ({ row }) => <div className="capitalize">{row.getValue("consultant_doctor_name")}</div>,
    },
    {
        id: "bed_info",
        header: "Bed",
        cell: ({ row }) => (
            <div>
                {row.original.bed_group} - {row.original.bed_number}
            </div>
        ),
    },
    {
        accessorKey: "symptom_types",
        header: "Symptoms",
        cell: ({ row }) => <div className="truncate max-w-[150px]">{row.getValue("symptom_types")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const admission = row.original;
            return (
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="action-edit-btn"
                        onClick={() => console.log("View admission details", admission)}
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                </div>
            );
        },
    },
];

export default function AdmissionTable() {
    const { patient_id } = useParams();


    const { data: admissions, isLoading: loadingAdmissions } = useQuery(
        {
            queryKey: ['admissions', patient_id],
            queryFn: () => getInpatientByPatientId(patient_id)
        }
    );

    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data: admissions ?? [],
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

    if (loadingAdmissions) return <div>Loading...</div>;

    return (
        <div className="">
            <Card className=" shadow-sm py-0 overflow-hidden">
                <CardHeader className="pb-3 border-b  bg-[#f0f8f4] pt-6 flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <TestTube className="h-5 w-5" />
                        Lab Test Analysis
                    </CardTitle>
                </CardHeader>
                <CardContent className="md:p-6">
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
                                            No Lab Tests Available
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <div className="flex items-center justify-end space-x-2 py-4 px-6  border-t ">
                            <div className="flex-1 text-sm text-gray-500">
                                {table.getFilteredRowModel().rows.length} lab test(s)
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
