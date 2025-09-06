import { useQuery } from "@tanstack/react-query"
import { getPaginatedPatientVisits } from "../../../providers/ApiProviders"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, Stethoscope } from "lucide-react"
import { CustomTooltip } from "../../../helpers/customTooltip"
import TableSkeleton from "../../../components/patient-profile-table-skeleton";
import { formatToShortDate } from "../../../helpers/formatToShortDate"
import { useAuth } from "../../../providers/AuthContext"

export default function VisitsTable() {
    const { accessToken } = useAuth()
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [term, setTerm] = useState({
        firstName: "",
        surname: "",
        phoneNumber: "",
        hospitalNumber: "",
        startDate: "",
        endDate: ""
    })
    const [debouncedTerm, setDebouncedTerm] = useState(term)

    // Debounce filters
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(term)
        }, 500)
        return () => clearTimeout(timer)
    }, [term])

    const handleSearchTermChange = (key, value) => {
        setTerm(prev => ({ ...prev, [key]: value }))
    }

    const { data, isLoading, error } = useQuery({
        queryKey: [
            "visits",
            page,
            pageSize,
            debouncedTerm.firstName,
            debouncedTerm.surname,
            debouncedTerm.phoneNumber,
            debouncedTerm.hospitalNumber,
            debouncedTerm.startDate,
            debouncedTerm.endDate
        ],
        queryFn: () =>
            getPaginatedPatientVisits({
                accessToken,
                page,
                pageSize,
                firstName: debouncedTerm.firstName,
                surname: debouncedTerm.surname,
                phoneNumber: debouncedTerm.phoneNumber,
                hospitalNumber: debouncedTerm.hospitalNumber,
                startDate: debouncedTerm.startDate,
                endDate: debouncedTerm.endDate
            }),

        enabled: !!accessToken
    })

    if (isLoading) return <TableSkeleton title="Visits" icon={<Stethoscope className="h-5 w-5" />} />

    if (error) return <div className="flex justify-center items-center h-64 text-red-500">Error: {error.message}</div>

    return (
        <div className="lg:p-6">
            <Card className="shadow-sm py-0 overflow-hidden">
                <CardHeader className="pb-3 border-b bg-[#f0f8f4] pt-6">
                    <CardTitle className="flex items-center gap-2">
                        <Stethoscope className="h-5 w-5" />
                        Patient Visits
                    </CardTitle>
                </CardHeader>
                <CardContent className="md:p-6">
                    {/* Filters */}
                    <div className="mb-6 bg-white rounded-lg border p-4 shadow-sm">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            Filter Visits
                        </h3>
                        <div className="grid xl:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-4">
                            {/* First Name */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">First Name</label>
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Filter first name..."
                                        value={term.firstName}
                                        onChange={(e) => handleSearchTermChange("firstName", e.target.value)}
                                        className="pl-9 border-[#268a6461] rounded-md"
                                    />
                                </div>
                            </div>

                            {/* Surname */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Surname</label>
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Filter surname..."
                                        value={term.surname}
                                        onChange={(e) => handleSearchTermChange("surname", e.target.value)}
                                        className="pl-9 border-[#268a6461] rounded-md"
                                    />
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Phone Number</label>
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Filter phone number..."
                                        value={term.phoneNumber}
                                        onChange={(e) => handleSearchTermChange("phoneNumber", e.target.value)}
                                        className="pl-9 border-[#268a6461] rounded-md"
                                    />
                                </div>
                            </div>

                            {/* Hospital Number */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Hospital Number</label>
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Filter hospital number..."
                                        value={term.hospitalNumber}
                                        onChange={(e) => handleSearchTermChange("hospitalNumber", e.target.value)}
                                        className="pl-9 border-[#268a6461] rounded-md"
                                    />
                                </div>
                            </div>

                            {/* Start Date */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Start Date</label>
                                <Input
                                    type="date"
                                    value={term.startDate}
                                    onChange={(e) => handleSearchTermChange("startDate", e.target.value)}
                                    className="border-[#268a6461] rounded-md"
                                />
                            </div>

                            {/* End Date */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">End Date</label>
                                <Input
                                    type="date"
                                    value={term.endDate}
                                    onChange={(e) => handleSearchTermChange("endDate", e.target.value)}
                                    className="border-[#268a6461] rounded-md"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="rounded-md border overflow-hidden shadow-sm">
                        <Table>
                            <TableHeader className="bg-[#f0f8f4]">
                                <TableRow>
                                    <TableHead>Patient Name</TableHead>
                                    <TableHead>Hospital Number</TableHead>
                                    <TableHead>Phone Number</TableHead>
                                    <TableHead>Purpose</TableHead>
                                    <TableHead>Recorded By</TableHead>
                                    <TableHead>Visit Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data?.data?.length ? (
                                    data.data.map((visit) => (
                                        <TableRow key={visit.id}>
                                            <TableCell>{visit.patient_name}</TableCell>
                                            <TableCell>{visit.hospital_number}</TableCell>
                                            <TableCell>{visit.phone_number}</TableCell>
                                            <TableCell>{visit.purpose}</TableCell>
                                            <TableCell>{visit.recorded_by}</TableCell>
                                            <TableCell>{formatToShortDate(visit.created_at)}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-10">
                                            No visits found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        <div className="flex items-center justify-between py-4 px-6 border-t">
                            <div className="text-sm text-gray-500">
                                Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, data?.totalItems)} of {data?.totalItems} visit(s)
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
