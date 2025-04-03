import React from 'react'
import { Search, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import AddDoctorDialog from './addDoctorDialog'
import EditDoctorDialog from './editDoctorDialog'

export default function DoctorSettings(data) {

    const { handleDelete, doctors, loading } = data.props

    return (
        <Card className="border-[#e0f0e8] shadow-sm">
            <CardHeader className="bg-[#f0f8f4] border-b border-[#e0f0e8]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <CardTitle className="text-[#106041]">Doctor Management</CardTitle>
                        <CardDescription>Add, edit, or remove doctors from the system</CardDescription>
                    </div>
                    <AddDoctorDialog />
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search doctors by name or specialty..."
                            className="pl-10 border-[#268a6461] focus-visible:ring-[#268a6429]"
                        />
                    </div>
                </div>

                <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-4">
                        {doctors.map((doctor) => (
                            <Card key={doctor.doctor_id} className="border-[#e0f0e8] hover:shadow-md transition-shadow">
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-12 w-12 border-2 border-[#e0f0e8]">
                                            <AvatarImage src={doctor?.image} alt={`${doctor.first_name} ${doctor.last_name}`} />
                                            <AvatarFallback className="bg-[#f0f8f4] text-[#106041]">
                                                {doctor?.first_name.charAt(0)}
                                                {doctor?.last_name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-medium text-gray-900">
                                                Dr. {doctor?.first_name} {doctor?.last_name}
                                            </h3>
                                            <Badge variant="outline" className="bg-[#f0f8f4] text-[#106041] border-[#e0f0e8] mt-1">
                                                {doctor?.specialty}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <EditDoctorDialog doctor={doctor}>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-gray-500 hover:text-[#106041] hover:bg-[#e6f2ed]"
                                            >
                                                <Edit className="h-4 w-4" />
                                                <span className="sr-only">Edit</span>
                                            </Button>
                                        </EditDoctorDialog>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-gray-500 hover:text-red-600 hover:bg-red-50"
                                            onClick={() => handleDelete(doctor.doctor_id)}
                                            disabled={loading}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Delete</span>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="bg-[#f9fcfa] border-t border-[#e0f0e8] py-3 px-6">
                <p className="text-sm text-gray-500">Showing {doctors.length} doctors</p>
            </CardFooter>
        </Card>

    )
}
