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
import { getLabTestsByPatientId } from "../../../providers/ApiProviders";
import { formatDate } from "../../../helpers/formatDate";
import {LabTestResultDialog} from "./LabTestResultDialog";




const columns = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700 hover:"
            >
                Test ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium text-gray-700">TST-{row.getValue("id")}</div>,
    },
    {
        accessorKey: "test_type",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700 hover:"
            >
                Test Type
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium text-gray-700 capitalize">{row.getValue("test_type")}</div>,
    },
    {
        accessorKey: "prescribed_by",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700 hover:"
            >
                Prescribed By
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium text-gray-700 capitalize">{row.getValue("prescribed_by")}</div>,
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700 hover:"
            >
                Prescribed at
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium text-gray-700 capitalize">{formatDate(row.getValue("created_at"))}</div>,
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700 hover:"
            >
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="font-medium text-gray-700">
                {getLabTestStatusBadge(row.getValue("status"))}
            </div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const labTest = row.original;
            return (
                <div className="flex items-center gap-2">
                    <LabTestResultDialog testResult={labTest}>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 border-[#268a6461] hover:bg-[#e6f2ed] bg-transparent"
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                    </LabTestResultDialog>
                </div>
            );
        },
    },
];

export default function LabTestAnalysisTable({ patientId }) {

    const { data: patientLabTests, isLoading: loadingPatientLabTests } = useQuery(
        {
            queryKey: ['patientLabTests', patientId],
            queryFn: () => getLabTestsByPatientId(patientId)
        }
    );


    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data: patientLabTests,
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

    if (loadingPatientLabTests) return <div>Loading...</div>;

    return (
        <div className="lg:p-6">
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
