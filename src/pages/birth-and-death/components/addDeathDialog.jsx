"use client"

import { useState } from "react"
import { Calendar, Upload, FilePlus, X, User, FileText, UserRound, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Mock patient data for the dropdown
const patients = [
    { id: 1, name: "John Smith", hospitalNumber: "HS-12345" },
    { id: 2, name: "Sarah Johnson", hospitalNumber: "HS-23456" },
    { id: 3, name: "Robert Davis", hospitalNumber: "HS-34567" },
    { id: 4, name: "Maria Garcia", hospitalNumber: "HS-45678" },
    { id: 5, name: "David Lee", hospitalNumber: "HS-56789" },
]

export function DeathRecordDialog() {
    const [open, setOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)

    // Function to handle file selection
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0])
        }
    }

    // Function to remove selected file
    const removeFile = () => {
        setSelectedFile(null)
    }

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you would handle the actual form submission
        // For now, just close the dialog
        setOpen(false)
        setSelectedFile(null)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#106041] hover:bg-[#0d4e34]">
                    <FilePlus className="mr-2 h-4 w-4" />
                    Add Death Record
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] border-[#e0f0e8]">
                <DialogHeader>
                    <DialogTitle className="text-[#106041] flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Add Patient Death Record
                    </DialogTitle>
                    <DialogDescription>
                        Enter the details of the patient's death record. All fields are required.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="patient" className="text-gray-700 flex items-center gap-1">
                                <UserRound className="h-3.5 w-3.5 text-[#268A64]" />
                                Patient
                            </Label>
                            <Select required>
                                <SelectTrigger
                                    id="patient"
                                    className="border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                                >
                                    <SelectValue placeholder="Select patient" />
                                </SelectTrigger>
                                <SelectContent className="border-[#e0f0e8]">
                                    {patients.map((patient) => (
                                        <SelectItem
                                            key={patient.id}
                                            value={patient.id.toString()}
                                            className="hover:bg-[#e6f2ed] hover:text-[#106041] focus:bg-[#e6f2ed] focus:text-[#106041]"
                                        >
                                            <div className="flex justify-between items-center w-full">
                                                <span>{patient.name}</span>
                                                <span className="text-xs text-gray-500">{patient.hospitalNumber}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="deathDate" className="text-gray-700 flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5 text-[#268A64]" />
                                Date and Time of Death
                            </Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                    id="deathDate"
                                    type="datetime-local"
                                    required
                                    className="pl-10 border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="guardianName" className="text-gray-700 flex items-center gap-1">
                                <User className="h-3.5 w-3.5 text-[#268A64]" />
                                Guardian/Next of Kin Name
                            </Label>
                            <Input
                                id="guardianName"
                                placeholder="Enter guardian's full name"
                                required
                                className="border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="attachment" className="text-gray-700 flex items-center gap-1">
                                <Upload className="h-3.5 w-3.5 text-[#268A64]" />
                                Attachment
                            </Label>
                            {!selectedFile ? (
                                <div className="border-2 border-dashed border-[#268a6461] rounded-md p-6 text-center hover:bg-[#f9fcfa] transition-colors">
                                    <Input id="attachment" type="file" className="hidden" onChange={handleFileChange} />
                                    <Label htmlFor="attachment" className="cursor-pointer">
                                        <Upload className="h-8 w-8 text-[#268A64] mx-auto mb-2 opacity-70" />
                                        <p className="text-sm font-medium text-[#106041]">Click to upload</p>
                                        <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG or DOCX (max. 10MB)</p>
                                    </Label>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between p-3 border border-[#e0f0e8] rounded-md bg-[#f9fcfa]">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-[#268A64]" />
                                        <div>
                                            <p className="text-sm font-medium truncate max-w-[250px]">{selectedFile.name}</p>
                                            <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={removeFile}
                                        className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="report" className="text-gray-700 flex items-center gap-1">
                                <FileText className="h-3.5 w-3.5 text-[#268A64]" />
                                Report
                            </Label>
                            <Textarea
                                id="report"
                                placeholder="Enter detailed report about the death..."
                                required
                                className="min-h-[120px] border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                            />
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="border-[#268a6461] text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-[#106041] hover:bg-[#0d4e34]">
                            Save Record
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

// Example usage
export default function DeathRecordPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-[#106041] mb-6">Patient Records</h1>
            <DeathRecordDialog />
        </div>
    )
}
