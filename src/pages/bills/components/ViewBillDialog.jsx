" "

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EditBillDialog } from "./EditBillDialog"
import { Button } from "@/components/ui/button"
import { Edit, Calendar, CreditCard, User, FileText, Receipt } from "lucide-react"
import { getBillStatusBadge } from "../../../helpers/getBillStatusBadge"
import { formatToNaira } from "../../../helpers/formatToNaira"
import BillPrint from "../../../components/print/prints/bill-print"
import PrintWrapper from "../../../components/print/print-wrapper"

export function ViewBillDialog({ bill, children }) {

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    const formatDateTime = (dateString) => {
        return new Date(dateString).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="!w-[100vw] !max-w-[80vw] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <Receipt className="h-5 w-5" />
                        Bill Details - {bill.billNumber}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Patient & Bill Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="border-[#268a6461] pt-0 overflow-hidden">
                            <CardHeader className="pb-3 pt-3 bg-[#f0f8f4]">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <User className="h-4 w-4" />
                                    Patient Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Patient Name</label>
                                    <p className="text-sm font-medium">{bill.patientName || "N/A"}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Patient ID</label>
                                    <p className="text-sm font-medium">{bill.patientId}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Hospital Number</label>
                                    <p className="text-sm font-medium">{bill.hospitalNumber || "N/A"}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-[#268a6461] pt-0 overflow-hidden">
                            <CardHeader className="pb-3 pt-3 bg-[#f0f8f4]">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <FileText className="h-4 w-4" />
                                    Bill Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Bill Number</label>
                                    <p className="text-sm font-medium">{bill.billNumber}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Bill Date</label>
                                    <p className="text-sm font-medium">{formatDate(bill.billDate)}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Issued By</label>
                                    <p className="text-sm font-medium">{bill.issuedBy}</p>
                                </div>
                                {
                                    bill.updatedBy && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Updated By</label>
                                            <p className="text-sm font-medium">{bill.updatedBy} at <span className="text-xs text-gray-500">{formatDateTime(bill.updatedAt)}</span></p>
                                        </div>
                                    )
                                }
                            </CardContent>
                        </Card>
                    </div>

                    {/* Financial Summary */}
                    <Card className="border-[#268a6461] pt-0 overflow-hidden">
                        <CardHeader className="pb-3 pt-3 bg-[#f0f8f4]">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <CreditCard className="h-4 w-4" />
                                Financial Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="grid md:grid-cols-4 gap-4">
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                    <label className="text-xs font-medium text-gray-500">Subtotal</label>
                                    <p className="text-lg font-semibold">{formatToNaira(bill.subtotal)}</p>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                    <label className="text-xs font-medium text-gray-500">Discount</label>
                                    <p className="text-lg font-semibold text-red-600">-{formatToNaira(bill.discount)}</p>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                    <label className="text-xs font-medium text-gray-500">Tax</label>
                                    <p className="text-lg font-semibold">{formatToNaira(bill.tax)}</p>
                                </div>
                                <div className="text-center p-3 bg-[#f0f8f4] rounded-lg border-2 border-[#268a64]">
                                    <label className="text-xs font-medium text-gray-500">Total Amount</label>
                                    <p className="text-xl font-bold text-[#106041]">{formatToNaira(bill.totalAmount)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Information */}
                    <Card className="border-[#268a6461] pt-0 overflow-hidden">
                        <CardHeader className="pb-3 pt-3 bg-[#f0f8f4] flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Calendar className="h-4 w-4" />
                                Payment Information
                            </CardTitle>
                            {
                                !(bill.status == "paid" || bill.status == "cancelled") && (
                                    <EditBillDialog bill={bill}>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-[#268a6461] hover:bg-[#e6f2ed] text-[#106041] bg-transparent"
                                        >
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit
                                        </Button>
                                    </EditBillDialog>

                                )
                            }
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Status</label>
                                        <div className="mt-1">{getBillStatusBadge(bill.status)}</div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Payment Method</label>
                                        <p className="text-sm font-medium capitalize">{bill.paymentMethod?.replace("_", " ")}</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Amount Paid</label>
                                        <p className="text-sm font-medium">{formatToNaira(bill.amountPaid)}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Payment Date</label>
                                        <p className="text-sm font-medium">{bill.paymentDate ? formatDateTime(bill.paymentDate) : "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                            {bill.notes && (
                                <>
                                    <Separator className="my-4" />
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Notes</label>
                                        <p className="text-sm mt-1 p-3 bg-gray-50 rounded-lg">{bill.notes}</p>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Bill Items */}
                    <Card className="border-[#268a6461] pt-0 overflow-hidden">
                        <CardHeader className="pb-3 pt-3 bg-[#f0f8f4]">
                            <CardTitle className="text-lg">Bill Items</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="rounded-md border overflow-hidden">
                                <Table>
                                    <TableHeader className="bg-gray-50">
                                        <TableRow>
                                            <TableHead className="font-medium">Description</TableHead>
                                            <TableHead className="font-medium">Unit Price</TableHead>
                                            <TableHead className="font-medium">Quantity</TableHead>
                                            <TableHead className="font-medium text-right">Total</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {bill.items?.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="font-medium">{item.description}</TableCell>
                                                <TableCell>{formatToNaira(item.unitPrice)}</TableCell>
                                                <TableCell>{item.quantity}</TableCell>
                                                <TableCell className="text-right font-medium">
                                                    {formatToNaira((Number.parseFloat(item.unitPrice) * item.quantity).toString())}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                    <PrintWrapper triggerLabel="Print Bill">
                        <BillPrint bill={bill} />
                    </PrintWrapper>

                </div>
            </DialogContent>
        </Dialog>
    )
}
