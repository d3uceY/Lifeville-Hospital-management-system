import { Users, Bell, Shield, HelpCircle, } from "lucide-react"
//update doctor api 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getDoctors, deleteDoctor } from "../../providers/ApiProviders"
import { useEffect, useState } from "react"
import { toast, Toaster } from 'sonner';
import DoctorSettings from "./components/doctorSettings"
import Notifications from "./components/notifications"


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
            setDoctors(response)
        } catch (error) {
            console.error(error)
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

                console.error(error)
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
            <div className="mb-8 border-l-4  pl-4">
                <h1 className="text-2xl font-bold ">Settings</h1>
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
                    <DoctorSettings props={{ handleDelete, doctors, loading, refresh: fetchDoctors }} />
                </TabsContent>

                <TabsContent value="notifications" className="mt-0">
                    <Card className=" shadow-sm">
                        <CardHeader className="bg-[#f0f8f4] border-b ">
                            <CardTitle className="">Notification Settings</CardTitle>
                            <CardDescription>Configure how you receive notifications</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <Notifications />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security" className="mt-0">
                    <Card className=" shadow-sm">
                        <CardHeader className="bg-[#f0f8f4] border-b ">
                            <CardTitle className="">Security Settings</CardTitle>
                            <CardDescription>Manage your security preferences</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <p className="text-center py-12 text-gray-500">Security settings will be available soon.</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="help" className="mt-0">
                    <Card className=" shadow-sm">
                        <CardHeader className="bg-[#f0f8f4] border-b ">
                            <CardTitle className="">Help & Support</CardTitle>
                            <CardDescription>Get help with using the system</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <p className="text-center py-12 text-gray-500">Help documentation will be available soon.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            {/* <Toaster richColors /> */}
        </div>
    )
}

