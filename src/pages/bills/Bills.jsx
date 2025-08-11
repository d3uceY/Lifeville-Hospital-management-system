"use client"

import { useQuery } from "@tanstack/react-query"
import { getBills } from "../../providers/ApiProviders"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
} from "@/components/ui/select"
import { Search, Filter, Receipt, Eye, Download } from "lucide-react"
import { getBillStatusBadge } from "../../helpers/getBillStatusBadge"
import { formatToShortDate } from "../../helpers/formatToShortDate"
import { formatToNaira } from "../../helpers/formatToNaira"
import { ViewBillDialog } from "./components/ViewBillDialog"

export default function Bills() {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    // Filter states
    const [billNumberFilter, setBillNumberFilter] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [issuedByFilter, setIssuedByFilter] = useState("")
    const [patientIdFilter, setPatientIdFilter] = useState("")

    const { data, isLoading, error } = useQuery({
        queryKey: ["bills", page, pageSize, billNumberFilter, statusFilter, issuedByFilter, patientIdFilter],
        queryFn: () => getBills(page, pageSize, billNumberFilter, statusFilter, issuedByFilter, patientIdFilter),
    })


    if (error) return <div className="flex justify-center items-center h-64 text-red-500">Error: {error.message}</div>



    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const handleNextPage = () => {
        if (page < data?.totalPages) {
            setPage(page + 1)
        }
    }

    // Filter the data based on current filters

    return (
        <div className="lg:p-6">
            <Card className="shadow-sm py-0 overflow-hidden">
                <CardHeader className="pb-3 border-b bg-[#f0f8f4] pt-6">
                    <CardTitle className="flex items-center gap-2">
                        <Receipt className="h-5 w-5" />
                        Bills
                    </CardTitle>
                </CardHeader>
                <CardContent className="md:p-6">
                    <div className="mb-6 bg-white rounded-lg border p-4 shadow-sm">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            Filter Bills
                        </h3>
                        <div className="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Bill Number</label>
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Filter bill number..."
                                        value={billNumberFilter}
                                        onChange={(event) => setBillNumberFilter(event.target.value)}
                                        className="pl-9 border-[#268a6461] rounded-md focus-visible:ring-[#268a6429] focus-visible:border-[#268a64]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Status</label>
                                <Select onValueChange={setStatusFilter} value={statusFilter}>
                                    <SelectTrigger className="border-[#268a6461] rounded-md focus:ring-[#268a6429] focus:border-[#268a64]">
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Select Status</SelectLabel>
                                            <SelectItem className="hover:bg-[#e6f2ed]">
                                                All
                                            </SelectItem>
                                            <SelectItem value="paid" className="hover:bg-[#e6f2ed]">
                                                Paid
                                            </SelectItem>
                                            <SelectItem value="overdue" className="hover:bg-[#e6f2ed]">
                                                Overdue
                                            </SelectItem>
                                            <SelectItem value="unpaid" className="hover:bg-[#e6f2ed]">
                                                Unpaid
                                            </SelectItem>
                                            <SelectItem value="cancelled" className="hover:bg-[#e6f2ed]">
                                                Cancelled
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>


                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Issued By</label>
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Filter issued by..."
                                        value={issuedByFilter}
                                        onChange={(event) => setIssuedByFilter(event.target.value)}
                                        className="pl-9 border-[#268a6461] rounded-md focus-visible:ring-[#268a6429] focus-visible:border-[#268a64]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Patient ID</label>
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Filter patient ID..."
                                        value={patientIdFilter}
                                        onChange={(event) => setPatientIdFilter(event.target.value)}
                                        className="pl-9 border-[#268a6461] rounded-md focus-visible:ring-[#268a6429] focus-visible:border-[#268a64]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-md border overflow-hidden shadow-sm">
                        <Table>
                            <TableHeader className="bg-[#f0f8f4]">
                                <TableRow>
                                    <TableHead className="font-medium">Bill Number</TableHead>
                                    <TableHead className="font-medium">Patient Name</TableHead>
                                    <TableHead className="font-medium">Hospital Number</TableHead>
                                    <TableHead className="font-medium">Patient ID</TableHead>
                                    <TableHead className="font-medium">Bill Date</TableHead>
                                    <TableHead className="font-medium">Total Amount</TableHead>
                                    <TableHead className="font-medium">Status</TableHead>
                                    <TableHead className="font-medium">Payment Method</TableHead>
                                    <TableHead className="font-medium">Issued By</TableHead>
                                    <TableHead className="font-medium">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data?.data?.length ? (
                                    data?.data?.map((bill) => (
                                        <TableRow key={bill.id}>
                                            <TableCell className="font-medium">{bill.billNumber}</TableCell>
                                            <TableCell>{bill.patientName}</TableCell>
                                            <TableCell>{bill.hospitalNumber}</TableCell>
                                            <TableCell>{bill.patientId}</TableCell>
                                            <TableCell>{formatToShortDate(bill.billDate)}</TableCell>
                                            <TableCell className="font-semibold">{formatToNaira(bill.totalAmount)}</TableCell>
                                            <TableCell>{getBillStatusBadge(bill.status)}</TableCell>
                                            <TableCell className="capitalize">{bill.paymentMethod.replace("_", " ")}</TableCell>
                                            <TableCell>{bill.issuedBy}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <ViewBillDialog bill={bill}>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 border-[#268a6461] hover:bg-[#e6f2ed] bg-transparent"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </ViewBillDialog>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 border-[#268a6461] hover:bg-[#e6f2ed] bg-transparent"
                                                    >
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-10 text-gray-500">
                                            No bills found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <div className="flex items-center justify-between space-x-2 py-4 px-6 border-t">
                            <div className="flex-1 text-sm text-gray-500">
                                Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, data?.totalItems)} of {data?.totalItems}{" "}
                                bill(s)
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="text-sm text-gray-500">
                                    Page {page} of {data?.totalPages}
                                </div>
                                <div className="space-x-2 flex">
                                    <Button
                                        className="bg-[#106041] text-white hover:bg-[#0d4e34] focus:ring-[#268a6429]"
                                        size="sm"
                                        onClick={handlePreviousPage}
                                        disabled={page <= 1}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        className="bg-[#106041] text-white hover:bg-[#0d4e34] focus:ring-[#268a6429]"
                                        size="sm"
                                        onClick={handleNextPage}
                                        disabled={page >= data?.totalPages}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
