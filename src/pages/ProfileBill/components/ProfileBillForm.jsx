import { useState } from "react"
import { useForm, Controller, useFieldArray } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Receipt, CreditCard, FileText, Plus, Trash2, Calculator, Save, X } from 'lucide-react'
import { generateBillNumber } from "../../../helpers/generateBillNumber"
import { useAuth } from "../../../providers/AuthContext"
import { createBill } from "../../../providers/ApiProviders"
import { formatToNaira } from "../../../helpers/formatToNaira"
import { useParams } from "react-router-dom"

export default function ProfileBillForm() {
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { patient_id } = useParams();

    // Form validation schema for hospital bills
    const schema = z.object({
        // Bill Information
        billNumber: z.string().optional(),
        patientId: z.string().nonempty({ message: "Patient selection is required" }),
        issuedBy: z.string().nonempty({ message: "Issued by is required" }),
        billDate: z.string().nonempty({ message: "Bill date is required" }),

        // Financial Information
        subtotal: z.number().min(0, { message: "Subtotal must be positive" }),
        discount: z.number().min(0, { message: "Discount must be positive" }).default(0),
        tax: z.number().min(0, { message: "Tax must be positive" }).default(0),
        totalAmount: z.number().min(0, { message: "Total amount must be positive" }),

        // Payment Information
        status: z.string().nonempty({ message: "Status is required" }),
        paymentMethod: z.string().optional(),
        amountPaid: z.number().min(0, { message: "Amount paid must be positive" }).default(0),
        paymentDate: z.string().optional(),

        // Bill Items
        billItems: z.array(z.object({
            description: z.string().nonempty({ message: "Description is required" }),
            unitPrice: z.number().min(0, { message: "Unit price must be positive" }),
            quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
        })).min(1, { message: "At least one bill item is required" }),

        // Notes
        notes: z.string().optional(),
    })

    const methods = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            billNumber: generateBillNumber(),
            patientId: patient_id,
            issuedBy: user?.name,
            billDate: new Date().toISOString().split('T')[0],
            subtotal: 0,
            discount: 0,
            tax: 0,
            totalAmount: 0,
            status: "unpaid",
            paymentMethod: "",
            amountPaid: 0,
            paymentDate: "",
            billItems: [
                { description: "", unitPrice: 0, quantity: 1 }
            ],
            notes: "",
        },
    })

    const {
        handleSubmit,
        formState: { isValid, errors },
        register,
        control,
        watch,
        setValue,
    } = methods

    const { fields, append, remove } = useFieldArray({
        control,
        name: "billItems"
    })

    const watchedItems = watch("billItems")
    const watchedDiscount = watch("discount")
    const watchedTax = watch("tax")

    // Calculate totals automatically
    const calculateTotals = () => {
        const subtotal = watchedItems.reduce((sum, item) => {
            return sum + (item.unitPrice * item.quantity)
        }, 0)

        const totalAfterDiscount = subtotal - watchedDiscount
        const totalAmount = totalAfterDiscount + watchedTax

        setValue("subtotal", subtotal)
        setValue("totalAmount", Math.max(0, totalAmount))
    }

    // Recalculate when items, discount, or tax change
    useState(() => {
        calculateTotals()
    }, [watchedItems, watchedDiscount, watchedTax])

    const addBillItem = () => {
        append({ description: "", unitPrice: 0, quantity: 1 })
    }

    const removeBillItem = (index) => {
        if (fields.length > 1) {
            remove(index)
        }
    }

    const onSubmit = async (values) => {

        const payload = {
            ...values,
            patientId: Number(values.patientId),
            billItems: values.billItems.map((item) => ({
                ...item,
                unitPrice: Number(item.unitPrice),
                quantity: Number(item.quantity),
            })),
            billDate: new Date().toISOString().split('T')[0]
        }

        const promise = async () => {
            try {
                setIsSubmitting(true)
                const response = await createBill(payload)
                return response.data
            } catch (err) {
                console.error(err)
                throw err
            } finally {
                setIsSubmitting(false)
            }
        }

        toast.promise(promise(), {
            loading: 'Creating hospital bill...',
            success: (data) => `Bill created successfully!`,
            error: (err) => `Failed to create bill: ${err.message}`
        })
    }

    return (
        <div className="container mx-auto py-8  max-w-5xl">
            <form onSubmit={handleSubmit(onSubmit)} className="relative">
                {/* Bill Information */}
                <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
                    <CardHeader className="bg-[#f0f8f4] border-b">
                        <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
                            <Receipt size={20} />
                            Bill Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="billNumber">
                                    Bill Number
                                </Label>
                                <Input
                                    disabled
                                    className="text-black border-[#268a6477] bg-gray-50"
                                    id="billNumber"
                                    placeholder="e.g., HOSP-2025-0001"
                                    {...register("billNumber")}
                                />
                                {errors.billNumber && <p className="text-red-500 text-sm mt-1">{errors.billNumber.message}</p>}
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                            <div>
                                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="issuedBy">
                                    Issued By
                                </Label>
                                <Input
                                    className="text-black border-[#268a6477] bg-gray-50"
                                    id="issuedBy"
                                    placeholder="Staff name or department"
                                    {...register("issuedBy")}
                                    disabled
                                />
                                {errors.issuedBy && <p className="text-red-500 text-sm mt-1">{errors.issuedBy.message}</p>}
                            </div>
                            <div>
                                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="billDate">
                                    Bill Date
                                </Label>
                                <Input
                                    className="text-black border-[#268a6477] bg-gray-50"
                                    id="billDate"
                                    type="date"
                                    {...register("billDate")}
                                />
                                {errors.billDate && <p className="text-red-500 text-sm mt-1">{errors.billDate.message}</p>}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Bill Items */}
                <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
                    <CardHeader className="bg-[#f0f8f4] border-b">
                        <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
                            <FileText size={20} />
                            Bill Items
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {fields.map((field, index) => (
                            <div key={field.id} className="border rounded-lg p-4 mb-4 bg-gray-50">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="font-medium text-gray-700">Item {index + 1}</h4>
                                    {fields.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeBillItem(index)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    )}
                                </div>
                                <div className="grid md:grid-cols-4 gap-4">
                                    <div className="md:col-span-2">
                                        <Label className="text-sm font-medium mb-2 block text-gray-700">
                                            Description
                                        </Label>
                                        <Input
                                            className="text-black border-[#268a6477]"
                                            placeholder="Service or item description"
                                            {...register(`billItems.${index}.description`)}
                                        />
                                        {errors.billItems?.[index]?.description && (
                                            <p className="text-red-500 text-sm mt-1">{errors.billItems[index].description.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium mb-2 block text-gray-700">
                                            Unit Price
                                        </Label>
                                        <Input
                                            className="text-black border-[#268a6477]"
                                            type="number"
                                            step="0.01"
                                            placeholder="0.00"
                                            {...register(`billItems.${index}.unitPrice`, { valueAsNumber: true })}
                                            onChange={(e) => {
                                                register(`billItems.${index}.unitPrice`).onChange(e)
                                                setTimeout(calculateTotals, 0)
                                            }}
                                        />
                                        {errors.billItems?.[index]?.unitPrice && (
                                            <p className="text-red-500 text-sm mt-1">{errors.billItems[index].unitPrice.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium mb-2 block text-gray-700">
                                            Quantity
                                        </Label>
                                        <Input
                                            className="text-black border-[#268a6477]"
                                            type="number"
                                            min="1"
                                            {...register(`billItems.${index}.quantity`, { valueAsNumber: true })}
                                            onChange={(e) => {
                                                register(`billItems.${index}.quantity`).onChange(e)
                                                setTimeout(calculateTotals, 0)
                                            }}
                                        />
                                        {errors.billItems?.[index]?.quantity && (
                                            <p className="text-red-500 text-sm mt-1">{errors.billItems[index].quantity.message}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-2 text-right">
                                    <span className="text-sm text-gray-600">
                                        Line Total: {formatToNaira((watchedItems[index]?.unitPrice || 0) * (watchedItems[index]?.quantity || 1))}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addBillItem}
                            className="w-full border-dashed border-2 border-[#106041] text-[#106041] hover:bg-[#106041] hover:text-white"
                        >
                            <Plus size={16} className="mr-2" />
                            Add Another Item
                        </Button>
                    </CardContent>
                </Card>

                {/* Financial Summary */}
                <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
                    <CardHeader className="bg-[#f0f8f4] border-b">
                        <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
                            <Calculator size={20} />
                            Financial Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="subtotal">
                                    Subtotal
                                </Label>
                                <Input
                                    className="text-black border-[#268a6477] bg-gray-100"
                                    id="subtotal"
                                    type="number"
                                    step="0.01"
                                    readOnly
                                    {...register("subtotal", { valueAsNumber: true })}
                                />
                            </div>
                            <div>
                                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="discount">
                                    Discount
                                </Label>
                                <Input
                                    className="text-black border-[#268a6477] bg-gray-50"
                                    id="discount"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    {...register("discount", { valueAsNumber: true })}
                                    onChange={(e) => {
                                        register("discount").onChange(e)
                                        setTimeout(calculateTotals, 0)
                                    }}
                                />
                                {errors.discount && <p className="text-red-500 text-sm mt-1">{errors.discount.message}</p>}
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                            <div>
                                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="tax">
                                    Tax
                                </Label>
                                <Input
                                    className="text-black border-[#268a6477] bg-gray-50"
                                    id="tax"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    {...register("tax", { valueAsNumber: true })}
                                    onChange={(e) => {
                                        register("tax").onChange(e)
                                        setTimeout(calculateTotals, 0)
                                    }}
                                />
                                {errors.tax && <p className="text-red-500 text-sm mt-1">{errors.tax.message}</p>}
                            </div>
                            <div>
                                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="totalAmount">
                                    Total Amount
                                </Label>
                                <Input
                                    className="text-black border-[#268a6477] bg-gray-100 font-bold text-lg"
                                    id="totalAmount"
                                    type="number"
                                    step="0.01"
                                    readOnly
                                    {...register("totalAmount", { valueAsNumber: true })}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Payment Information */}
                <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
                    <CardHeader className="bg-[#f0f8f4] border-b">
                        <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
                            <CreditCard size={20} />
                            Payment Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="status">
                                    Status
                                </Label>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Payment Status</SelectLabel>
                                                    <SelectItem value="unpaid">Unpaid</SelectItem>
                                                    <SelectItem value="overdue">Overdue</SelectItem>
                                                    <SelectItem value="paid">Paid</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                            </div>
                            <div>
                                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="paymentMethod">
                                    Payment Method
                                </Label>
                                <Controller
                                    name="paymentMethod"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select method" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Payment Method</SelectLabel>
                                                    <SelectItem value="cash">Cash</SelectItem>
                                                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                                                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                                    <SelectItem value="insurance">Insurance</SelectItem>
                                                    <SelectItem value="check">Check</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            <div>
                                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="amountPaid">
                                    Amount Paid
                                </Label>
                                <Input
                                    className="text-black border-[#268a6477] bg-gray-50"
                                    id="amountPaid"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    {...register("amountPaid", { valueAsNumber: true })}
                                />
                                {errors.amountPaid && <p className="text-red-500 text-sm mt-1">{errors.amountPaid.message}</p>}
                            </div>
                        </div>
                        <div className="mt-6">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="paymentDate">
                                Payment Date
                            </Label>
                            <Input
                                className="text-black border-[#268a6477] bg-gray-50"
                                id="paymentDate"
                                type="datetime-local"
                                {...register("paymentDate")}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Notes */}
                <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
                    <CardHeader className="bg-[#f0f8f4] border-b">
                        <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
                            <FileText size={20} />
                            Additional Notes
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="notes">
                                Notes
                            </Label>
                            <Textarea
                                className="text-black border-[#268a6477] bg-gray-50 min-h-[100px]"
                                id="notes"
                                placeholder="Any additional notes or comments about this bill..."
                                {...register("notes")}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Form Actions */}
                <div className="text-right mt-8 flex items-center justify-end gap-4">
                    <Button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className="px-6 py-2 bg-[#106041] text-white hover:bg-[#106041]/80"
                    >
                        <Save size={16} className="mr-2" />
                        {isSubmitting ? "Creating Bill..." : "Create Bill"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
