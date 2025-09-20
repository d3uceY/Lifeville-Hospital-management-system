import * as React from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getVitalSignsByPatientId } from "../../../providers/ApiProviders";
import { formatDate } from "../../../helpers/formatDate";
import { hasPermission } from "../../../helpers/hasPermission";
import EditProfileVitalSignsDialog from "./EditProfileVitalSignsDialog";
import { calculateBMI } from "../../../helpers/calculateBMI";
import { CustomTooltip } from "../../../helpers/customTooltip";
import { formatTemperature, formatBloodPressure, formatPulse, formatSpO2 } from "../../../helpers/vitalSignFormatters";
import TableSkeleton from "../../../components/patient-profile-table-skeleton";

const columns = [
    {
        accessorKey: "recorded_at",
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
        cell: ({ row }) => <div className="text-gray-700">{formatDate(row.original.created_at)}</div>,
    },
    {
        accessorKey: "temperature",
        header: "Temp (°C)",
        cell: ({ row }) => {
            const { value, color } = formatTemperature(row.getValue("temperature"));
            return <div className={color}>{value}</div>;
        },
    },
    {
        accessorKey: "blood_pressure_systolic",
        header: "BP (Systolic/Diastolic)",
        cell: ({ row }) => {
            const { value, color } = formatBloodPressure(
                row.getValue("blood_pressure_systolic"),
                row.original.blood_pressure_diastolic
            );
            return <div className={color}>{value}</div>;
        },
    },
    {
        accessorKey: "pulse_rate",
        header: "Pulse (bpm)",
        cell: ({ row }) => {
            const { value, color } = formatPulse(row.getValue("pulse_rate"));
            return <div className={color}>{value}</div>;
        },
    },
    {
        accessorKey: "spo2",
        header: "SpO₂ (%)",
        cell: ({ row }) => {
            const { value, color } = formatSpO2(row.getValue("spo2"));
            return <div className={color}>{value}</div>;
        },
    },
    {
        accessorKey: "weight",
        header: "Weight (kg)",
        cell: ({ row }) => <div className="text-gray-700">{row.getValue("weight")} kg</div>,
    },
    {
        accessorKey: "height",
        header: "Height (m)",
        cell: ({ row }) => <div className="text-gray-700">{row.getValue("height")} m</div>,
    },
    {
        header: "BMI",
        cell: ({ row }) => <div className="text-gray-700">{calculateBMI(row.getValue("weight"), row.getValue("height"))}</div>,
    },
    {
        accessorKey: "recorded_by",
        header: "Recorded By",
        cell: ({ row }) => <div className="capitalize">{row.getValue("recorded_by")}</div>,
    },
    // {
    //     accessorKey: "updated_by",
    //     header: "Updated By",
    //     cell: ({ row }) => <div className="text-gray-700">{row.getValue("updated_by") || "—"}</div>,
    // },
    // { 
    //     accessorKey: "updated_at",
    //     header: "Updated At",
    //     cell: ({ row }) => <div className="text-gray-700">{formatDate(row.getValue("updated_at")) || "—"}</div>,
    // },
    {
        header: "Actions",
        cell: ({ row }) => {
            const currentVitalSign = row.original
            return (
                <div className="flex gap-2 items-center">
                    {
                        hasPermission(["superadmin"]) && (
                            <CustomTooltip content="Edit Vital Sign">
                                <EditProfileVitalSignsDialog vitalSign={currentVitalSign}>
                                    <Button className="action-edit-btn">
                                        <Activity className=" h-4 w-4" />
                                    </Button>
                                </EditProfileVitalSignsDialog>
                            </CustomTooltip>
                        )
                    }
                </div>
            )
        }
    }
];

export default function ProfileVitalSignsTable({ patientId }) {
    const { data: vitalSigns, isLoading } = useQuery({
        queryKey: ["vitalSigns", patientId],
        queryFn: () => getVitalSignsByPatientId(patientId),
        staleTime: 5 * 60 * 1000,
    });


    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data: vitalSigns?.vitalSigns || [],
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
            title="Vital Signs"
            icon={<Activity className="h-5 w-5 shrink-0" />}
            showPagination
        />);

    return (
        <Card className="shadow-sm py-0 overflow-hidden mt-8">
            <CardHeader className="pb-3 border-b bg-[#f0f8f4] pt-6 flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 shrink-0" />
                    Vital Signs
                </CardTitle>
            </CardHeader>
            <CardContent className="md:p-6 p-2">
                <div className="rounded-md border overflow-hidden shadow-sm">
                    <Table className="">
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
                                        No Vital Signs Recorded
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
