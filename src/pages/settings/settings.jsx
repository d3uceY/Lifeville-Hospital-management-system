import { Users, Bell, Shield, HelpCircle, Search, Trash2, Edit, ChevronRight } from "lucide-react"
//update doctor api 
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import AddDoctorDialog from "./components/addDoctorDialog"
import { getDoctors, deleteDoctor } from "../../providers/ApiProviders"
import { useEffect, useState } from "react"
import { toast, Toaster } from 'sonner';


// List of medical specialties

export default function Settings() {
    const [loading, setLoading] = useState(false)
    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        fetchDoctors()
    }, [])

    const fetchDoctors = async () => {
        setLoading(true)
        try {
            const response = await getDoctors()
            console.log(response)
            setDoctors(response)
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        const promise = async () => {
            try {

                const deletedDoctor = await deleteDoctor(id)
                fetchDoctors()
                return deletedDoctor

            } catch (error) {

                console.log(error)
                throw error;

            } finally {
                setLoading(false)
            }
        }

        toast.promise(promise(), {
            loading: 'Deleting doctor...',
            success: (data) => `${data.message}`, // Display success message from response
            error: (err) => err.response?.data?.message || 'An error occurred', // Display error message
        });
    }

    return (
        <div className="container mx-auto p-6 max-w-7xl">
            <div className="mb-8 border-l-4 border-[#106041] pl-4">
                <h1 className="text-2xl font-bold text-[#106041]">Settings</h1>
                <p className="text-muted-foreground mt-1">Manage your hospital system settings</p>
            </div>

            <Tabs defaultValue="doctors" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                    <TabsTrigger
                        value="doctors"
                        className="data-[state=active]:bg-[#106041] data-[state=active]:text-white flex items-center gap-2"
                    >
                        <Users className="h-4 w-4" />
                        <span className="hidden sm:inline">Doctors</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="notifications"
                        className="data-[state=active]:bg-[#106041] data-[state=active]:text-white flex items-center gap-2"
                    >
                        <Bell className="h-4 w-4" />
                        <span className="hidden sm:inline">Notifications</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="security"
                        className="data-[state=active]:bg-[#106041] data-[state=active]:text-white flex items-center gap-2"
                    >
                        <Shield className="h-4 w-4" />
                        <span className="hidden sm:inline">Security</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="help"
                        className="data-[state=active]:bg-[#106041] data-[state=active]:text-white flex items-center gap-2"
                    >
                        <HelpCircle className="h-4 w-4" />
                        <span className="hidden sm:inline">Help</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="doctors" className="mt-0">
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
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-gray-500 hover:text-[#106041] hover:bg-[#e6f2ed]"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
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
                </TabsContent>

                <TabsContent value="notifications" className="mt-0">
                    <Card className="border-[#e0f0e8] shadow-sm">
                        <CardHeader className="bg-[#f0f8f4] border-b border-[#e0f0e8]">
                            <CardTitle className="text-[#106041]">Notification Settings</CardTitle>
                            <CardDescription>Configure how you receive notifications</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <p className="text-center py-12 text-gray-500">Notification settings will be available soon.</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security" className="mt-0">
                    <Card className="border-[#e0f0e8] shadow-sm">
                        <CardHeader className="bg-[#f0f8f4] border-b border-[#e0f0e8]">
                            <CardTitle className="text-[#106041]">Security Settings</CardTitle>
                            <CardDescription>Manage your security preferences</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <p className="text-center py-12 text-gray-500">Security settings will be available soon.</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="help" className="mt-0">
                    <Card className="border-[#e0f0e8] shadow-sm">
                        <CardHeader className="bg-[#f0f8f4] border-b border-[#e0f0e8]">
                            <CardTitle className="text-[#106041]">Help & Support</CardTitle>
                            <CardDescription>Get help with using the system</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <p className="text-center py-12 text-gray-500">Help documentation will be available soon.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            <Toaster richColors />
        </div>
    )
}

