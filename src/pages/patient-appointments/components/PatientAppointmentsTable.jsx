import * as React from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, CalendarDays, PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getAppointmentsByPatientId } from "../../../providers/ApiProviders";
import { formatDate } from "../../../helpers/formatDate";
import { getAppointmentStatusColor } from "../../../helpers/getAppointmentStatusColor";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import PatientAppointmentDropdownOptions from "./PatientAppointmentDropdownOptions";
import EditPatientAppointmentDialog from "./EditPatientAppointmentDialog";
import { CustomTooltip } from "../../../helpers/customTooltip";
import TableSkeleton from "../../../components/patient-profile-table-skeleton";


const columns = [
    {
        accessorKey: "appointment_id",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700"
            >
                Appointment ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium text-gray-700">APD-{row.getValue("appointment_id")}</div>,
    },
    {
        accessorKey: "patient_first_name",
        header: () => <div className="font-medium text-gray-700">First Name</div>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("patient_first_name")}</div>,
    },
    {
        accessorKey: "patient_surname",
        header: () => <div className="font-medium text-gray-700">Surname</div>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("patient_surname")}</div>,
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700"
            >
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="capitalize font-medium text-gray-700">
                <Badge className={`mt-1 ${getAppointmentStatusColor(row.getValue("status"))} capitalize`}>
                    {row.getValue("status")}
                </Badge>
            </div>
        ),
    },
    {
        accessorKey: "appointment_date",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium text-gray-700"
            >
                Scheduled Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium text-gray-700">{formatDate(row.getValue("appointment_date"))}</div>,
    },
    {
        accessorKey: "patient_phone_number",
        header: () => <div className="font-medium text-gray-700">Phone No</div>,
        cell: ({ row }) => <div>{row.getValue("patient_phone_number")}</div>,
    },
    {
        accessorKey: "doctor_name",
        header: () => <div className="font-medium text-gray-700">Doctor</div>,
        cell: ({ row }) => <div className="capitalize">{row.getValue("doctor_name")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const appointment = row.original;
            return (
                <div className="flex items-center gap-2">
                    <PatientAppointmentDropdownOptions appointment={appointment} />
                    <CustomTooltip content="Edit Appointment">
                        <EditPatientAppointmentDialog appointment={appointment}>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="action-edit-btn"
                            >
                                <PenSquare className="h-4 w-4" />
                            </Button>
                        </EditPatientAppointmentDialog>
                    </CustomTooltip>
                </div>
            );
        },
    },
];

export default function PatientAppointmentsTable() {
    const { patient_id } = useParams()
    const { data: patientAppointments, isLoading } = useQuery({
        queryKey: ["appointments", patient_id],
        queryFn: () => getAppointmentsByPatientId(patient_id),
    });

    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data: patientAppointments || [],
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

    if (isLoading) return (
        <TableSkeleton
            headerCount={columns.length}
            rowCount={5}
            title="Appointments"
            icon={<CalendarDays className="h-5 w-5" />}
            showPagination
        />);

    return (
        <div>
            <Card className="shadow-sm py-0 overflow-hidden">
                <CardHeader className="pb-3 border-b bg-[#f0f8f4] pt-6 flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5" />
                        Appointments
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
                                            No Appointments Available
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <div className="flex items-center justify-end space-x-2 py-4 px-6 border-t">
                            <div className="flex-1 text-sm text-gray-500">
                                {table.getFilteredRowModel().rows.length} appointment(s)
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
        </div>
    );
}
