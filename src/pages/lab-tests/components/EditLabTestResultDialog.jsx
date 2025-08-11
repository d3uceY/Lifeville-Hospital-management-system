import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { TestTube, User, Stethoscope, ClipboardList, Save, X } from "lucide-react"
import { getStatusColor } from "../../../helpers/getLabStatusColor"
import { updateLabTest } from "../../../providers/ApiProviders"
import { useQueryClient } from "@tanstack/react-query"

export function EditLabTestResultDialog({ testResult, children }) {

    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const queryClient = useQueryClient()

    const schema = z.object({
        // Display-only fields (for context - not submitted)
        patientName: z.string().nonempty({ message: "Patient name is required" }),
        prescribedBy: z.string().nonempty({ message: "Prescribed by is required" }),
        testType: z.string().nonempty({ message: "Test type is required" }),

        // Editable fields
        status: z.enum(["to do", "in progress", "done", "failed"], {
            required_error: "Please select a status",
        }),
        results: z.string().optional(),
    })

    const methods = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            patientName: `${testResult.first_name} ${testResult.surname}`,
            prescribedBy: testResult.prescribed_by,
            testType: testResult.test_type,
            status: testResult.status,
            results: testResult.results || "",
        },
    })

    const {
        handleSubmit,
        formState: { isValid, errors },
        register,
        control,
    } = methods

    const onSubmit = async (values) => {
        const payload = {
            status: values.status,
            results: values.results,
        }

        const promise = async () => {
            try {
                setIsSubmitting(true)
                const response = await updateLabTest(testResult.lab_test_id, payload)
                setOpen(false)
                queryClient.invalidateQueries({ queryKey: ["lab-tests"] })
                return response
            } catch (err) {
                console.error(err)
                throw err
            } finally {
                setIsSubmitting(false)
            }
        }

        toast.promise(promise(), {
            loading: "Updating test result...",
            success: "Test result updated successfully!",
            error: (err) => `Failed to update test result: ${err.message}`,
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <TestTube className="h-5 w-5" />
                        Edit Test Result - #{testResult.lab_test_id}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Test Context Information (Display Only) */}
                    <Card className="border-[#268a6461] pt-0">
                        <CardHeader className="pb-3 pt-6 bg-[#f0f8f4]">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Test Information
                                <span className="text-sm font-normal text-gray-500 ml-2">(For Reference Only)</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="patientName">
                                        Patient Name
                                    </Label>
                                    <Input
                                        disabled
                                        className="text-black border-[#268a6477] bg-gray-100"
                                        id="patientName"
                                        {...register("patientName")}
                                    />
                                    {errors.patientName && <p className="text-red-500 text-sm mt-1">{errors.patientName.message}</p>}
                                </div>
                                <div>
                                    <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="prescribedBy">
                                        Prescribed By
                                    </Label>
                                    <Input
                                        disabled
                                        className="text-black border-[#268a6477] bg-gray-100"
                                        id="prescribedBy"
                                        {...register("prescribedBy")}
                                    />
                                    {errors.prescribedBy && <p className="text-red-500 text-sm mt-1">{errors.prescribedBy.message}</p>}
                                </div>
                            </div>
                            <div className="mt-6">
                                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="testType">
                                    Test Type
                                </Label>
                                <Input
                                    disabled
                                    className="text-black border-[#268a6477] bg-gray-100"
                                    id="testType"
                                    {...register("testType")}
                                />
                                {errors.testType && <p className="text-red-500 text-sm mt-1">{errors.testType.message}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Editable Fields */}
                    <Card className="border-[#268a6461] pt-0">
                        <CardHeader className="pb-3 pt-6 bg-[#f0f8f4]">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Stethoscope className="h-4 w-4" />
                                Update Test Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div>
                                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="status">
                                    Test Status
                                </Label>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Test Status</SelectLabel>
                                                    <SelectItem value="to do" className="hover:bg-[#e6f2ed]">
                                                        <span className="flex items-center gap-2">
                                                            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                                                            To Do
                                                        </span>
                                                    </SelectItem>
                                                    <SelectItem value="in progress" className="hover:bg-[#e6f2ed]">
                                                        <span className="flex items-center gap-2">
                                                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                            In Progress
                                                        </span>
                                                    </SelectItem>
                                                    <SelectItem value="done" className="hover:bg-[#e6f2ed]">
                                                        <span className="flex items-center gap-2">
                                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                            Done
                                                        </span>
                                                    </SelectItem>
                                                    <SelectItem value="failed" className="hover:bg-[#e6f2ed]">
                                                        <span className="flex items-center gap-2">
                                                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                                            Failed
                                                        </span>
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Test Results */}
                    <Card className="border-[#268a6461] pt-0">
                        <CardHeader className="pb-3 pt-6 bg-[#f0f8f4]">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <ClipboardList className="h-4 w-4" />
                                Test Results
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div>
                                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="results">
                                    Results
                                </Label>
                                <Textarea
                                    className="text-black border-[#268a6461] focus-visible:ring-[#268a6429] focus-visible:border-[#268a64] min-h-[120px] resize-none"
                                    id="results"
                                    placeholder="Enter test results, observations, measurements, or findings..."
                                    {...register("results")}
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    Provide detailed test results, measurements, observations, or any relevant findings.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Current Status Display */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-700">Current Status:</p>
                                <p className={`text-lg font-semibold capitalize ${getStatusColor(testResult.status)}`}>
                                    {testResult.status.replace("_", " ")}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Last Updated:</p>
                                <p className="text-sm font-medium">{new Date(testResult.updated_at).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
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
                            disabled={!isValid || isSubmitting}
                            className="bg-[#106041] text-white hover:bg-[#0d4e34] focus:ring-[#268a6429]"
                        >
                            <Save className="h-4 w-4 mr-2" />
                            {isSubmitting ? "Updating..." : "Update Test Result"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
