import { useQuery } from "@tanstack/react-query"
import { getBills } from "../../providers/ApiProviders"
import { useState, useEffect } from "react"
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
    const [term, setTerm] = useState({
        billNumberTerm: "",
        statusTerm: "",
        issuedByTerm: "",
        patientIdTerm: ""
    })
    const [debouncedTerm, setDebouncedTerm] = useState(term)

    // Debounce effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(term)
        }, 500) // 500ms debounce
        return () => clearTimeout(timer)
    }, [term])

    const handleSearchTermChange = (key, value) => {
        setTerm(prev => ({ ...prev, [key]: value }))
    }

    const { data, isLoading, error } = useQuery({
        queryKey: [
            "bills",
            page,
            pageSize,
            debouncedTerm.billNumberTerm,
            debouncedTerm.statusTerm,
            debouncedTerm.issuedByTerm,
            debouncedTerm.patientIdTerm
        ],
        queryFn: () =>
            getBills(
                page,
                pageSize,
                debouncedTerm.billNumberTerm,
                debouncedTerm.statusTerm,
                debouncedTerm.issuedByTerm,
                debouncedTerm.patientIdTerm
            ),
    })

    if (error) return <div className="flex justify-center items-center h-64 text-red-500">Error: {error.message}</div>

    console.log(data)
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
                            {/* Bill Number */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Bill Number</label>
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Filter bill number..."
                                        value={term.billNumberTerm}
                                        onChange={(e) => handleSearchTermChange("billNumberTerm", e.target.value)}
                                        className="pl-9 border-[#268a6461] rounded-md"
                                    />
                                </div>
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Status</label>
                                <Select
                                    value={term.statusTerm}
                                    onValueChange={(value) => handleSearchTermChange("statusTerm", value)}
                                >
                                    <SelectTrigger className="border-[#268a6461] rounded-md">
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Select Status</SelectLabel>
                                            <SelectItem value={undefined}>All</SelectItem>
                                            <SelectItem value="paid">Paid</SelectItem>
                                            <SelectItem value="overdue">Overdue</SelectItem>
                                            <SelectItem value="unpaid">Unpaid</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Issued By */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Issued By</label>
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Filter issued by..."
                                        value={term.issuedByTerm}
                                        onChange={(e) => handleSearchTermChange("issuedByTerm", e.target.value)}
                                        className="pl-9 border-[#268a6461] rounded-md"
                                    />
                                </div>
                            </div>

                            {/* Patient ID */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Patient ID</label>
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Filter patient ID..."
                                        value={term.patientIdTerm}
                                        onChange={(e) => handleSearchTermChange("patientIdTerm", e.target.value)}
                                        className="pl-9 border-[#268a6461] rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="rounded-md border overflow-hidden shadow-sm">
                        <Table>
                            <TableHeader className="bg-[#f0f8f4]">
                                <TableRow>
                                    <TableHead>Bill Number</TableHead>
                                    <TableHead>Patient Name</TableHead>
                                    <TableHead>Hospital Number</TableHead>
                                    <TableHead>Patient ID</TableHead>
                                    <TableHead>Bill Date</TableHead>
                                    <TableHead>Total Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Payment Method</TableHead>
                                    <TableHead>Issued By</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data?.data?.length ? (
                                    data.data.map((bill) => (
                                        <TableRow key={bill.id}>
                                            <TableCell>{bill.billNumber}</TableCell>
                                            <TableCell>{bill.patientName}</TableCell>
                                            <TableCell>{bill.hospitalNumber}</TableCell>
                                            <TableCell>{bill.patientId}</TableCell>
                                            <TableCell>{formatToShortDate(bill.billDate)}</TableCell>
                                            <TableCell>{formatToNaira(bill.totalAmount)}</TableCell>
                                            <TableCell>{getBillStatusBadge(bill.status)}</TableCell>
                                            <TableCell>{bill.paymentMethod.replace("_", " ")}</TableCell>
                                            <TableCell>{bill.issuedBy}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <ViewBillDialog bill={bill}>
                                                        <Button size="sm" variant="outline">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </ViewBillDialog>
                                                    <Button size="sm" variant="outline">
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={10} className="text-center py-10">
                                            No bills found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        <div className="flex items-center justify-between py-4 px-6 border-t">
                            <div className="text-sm text-gray-500">
                                Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, data?.totalItems)} of {data?.totalItems} bill(s)
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button onClick={() => setPage(page - 1)} disabled={page <= 1}>Previous</Button>
                                <Button onClick={() => setPage(page + 1)} disabled={page >= data?.totalPages}>Next</Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
