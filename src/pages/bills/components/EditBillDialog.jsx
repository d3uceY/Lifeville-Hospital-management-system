import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"
import { Save, X } from "lucide-react"
import { updateBill } from "../../../providers/ApiProviders"
import { formatDateForDateTimeLocal } from "../../../helpers/formatDateForDateTimeLocal"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "../../../providers/AuthContext"

export function EditBillDialog({ bill, children }) {

    const { user } = useAuth()

    const [open, setOpen] = useState(false)

    const billEditSchema = z.object({
        status: z.enum(["paid", "overdue", "unpaid", "cancelled"], {
            required_error: "Please select a status",
        }),
        updatedBy: z.string().optional(),
        amountPaid: z
            .string()
            .min(1, "Amount paid is required")
            .refine((val) => {
                const num = Number.parseFloat(val)
                return !isNaN(num) && num >= 0
            }, "Amount paid must be a valid positive number"),
        paymentMethod: z.enum(["bank_transfer", "cash", "card", "insurance"], {
            required_error: "Please select a payment method",
        }),
        paymentDate: z.string().optional(),
        notes: z.string().optional(),
    }).optional()

    const form = useForm({
        resolver: zodResolver(billEditSchema),
        defaultValues: {
            status: bill.status,
            updatedBy: user?.name,
            amountPaid: bill.amountPaid,
            paymentMethod: bill.paymentMethod,
            paymentDate: bill.paymentDate ? formatDateForDateTimeLocal(bill.paymentDate) : undefined,
            notes: bill.notes || "",
        },
    })

    const { register, formState: { errors } } = form


    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: ({ billId, data }) => updateBill(billId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bills"] })
            setOpen(false)
        },
    })

    const onSubmit = async (data) => {
        const payload = {
            ...data,
            paymentDate: data.paymentDate ? new Date(data.paymentDate).toISOString() : undefined,
        }
        toast.promise(mutateAsync({ billId: bill.id, data: payload }), {
            loading: 'Updating bill...',
            success: (data) => `Bill updated successfully!`,
            error: (err) => `Failed to update bill: ${err.message}`,
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Save className="h-5 w-5 shrink-0" />
                        Edit Bill - {bill.billNumber}
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
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
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <p className="text-red-500">{errors.status?.message}</p>
                        <FormField
                            control={form.control}
                            name="amountPaid"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount Paid</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="0.00"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            className="border-[#268a6461] focus-visible:ring-[#268a6429] focus-visible:border-[#268a64]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <p className="text-red-500">{errors.amountPaid?.message}</p>
                        <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Payment Method</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]">
                                                <SelectValue placeholder="Select payment method" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="bank_transfer" className="hover:bg-[#e6f2ed]">
                                                Bank Transfer
                                            </SelectItem>
                                            <SelectItem value="cash" className="hover:bg-[#e6f2ed]">
                                                Cash
                                            </SelectItem>
                                            <SelectItem value="card" className="hover:bg-[#e6f2ed]">
                                                Card
                                            </SelectItem>
                                            <SelectItem value="insurance" className="hover:bg-[#e6f2ed]">
                                                Insurance
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <p className="text-red-500">{errors.paymentMethod?.message}</p>
                        <Input type="datetime-local" name="paymentDate" {...register("paymentDate")} />
                        <p className="text-red-500">{errors.paymentDate?.message}</p>

                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Notes</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Add any additional notes..."
                                            className="border-[#268a6461] focus-visible:ring-[#268a6429] focus-visible:border-[#268a64] resize-none"
                                            rows={3}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <p className="text-red-500">{errors.notes?.message}</p>
                        <div className="flex justify-end space-x-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                className="border-[#268a6461] hover:bg-[#e6f2ed]"
                            >
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="bg-[#106041] text-white hover:bg-[#0d4e34] focus:ring-[#268a6429]"
                            >
                                <Save className="h-4 w-4 mr-2" />
                               {isPending ? "Updating..." : "Update"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
